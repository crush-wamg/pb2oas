const test = require('ava');
const pb2oas = require('..');

test('path is empty', (t) => {
  const error = t.throws(pb2oas.bind(null, ''));
  t.is(error.message, 'pb2oas Error: "path" is required.');
});

test('title is empty', (t) => {
  const error = t.throws(pb2oas.bind(null, __dirname + '/protos/pet.proto'));
  t.is(error.message, 'pb2oas Error: "options.title" is required.');
});

test('servers is empty', (t) => {
  const error = t.throws(pb2oas.bind(null, __dirname + '/protos/pet.proto', { title: 'Demo Server', servers: [] }));
  t.is(error.message, 'pb2oas Error: "options.servers" must be a non-empty array');
});

test('servers does not includes url', (t) => {
  const options = {
    title: 'Demo Server',
    servers: [
      {
        url: 'http://localhost:8080/api-explorer',
      },
      {},
    ],
  };

  const error = t.throws(pb2oas.bind(null, __dirname + '/protos/pet.proto', options));
  t.is(error.message, 'pb2oas Error: "servers[].url" is required.');
});

test('basic', (t) => {
  const options = {
    useFilenameAsTagPrefix: false,
    title: 'PetStore Service APIS',
    servers: [
      {
        url: 'http://localhost:8080/api-explorer',
        "description": "Local Server",
      },
    ],
  };

  t.deepEqual(pb2oas(__dirname + '/protos/petstore.proto', options), require('./apis/basic.json'));
});

test('set options', (t) => {
  const options = {
    keepCase: true,
    useFilenameAsTagPrefix: true,
    title: 'WebSite Service APIS',
    description: 'Some description of server.',
    routes:  {
      'Website.getUsers': 'get /users',
      'Website.getUserType': 'get /user/type',
    },
    servers: [
      {
        url: 'http://localhost:8080/api-explorer',
        "description": "Local Server",
      },
    ],
    email: 'support@example.com',
  };

  t.deepEqual(pb2oas(__dirname + '/protos/website.proto', options), require('./apis/options.json'));
});

test('compose multiple files', (t) => {
  const options = {
    title: 'Service APIS',
    servers: [
      {
        url: 'http://localhost:8080/api-explorer',
        "description": "Local Server",
      },
    ],
  };

  t.deepEqual(pb2oas(__dirname + '/protos', options), require('./apis/compose.json'));
});