[![CircleCI](https://circleci.com/gh/w2k-lab/pb2oas/tree/main.svg?style=svg)](https://circleci.com/gh/w2k-lab/pb2oas/tree/main) [![Software License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/CircleCI-Public/cimg-node/master/LICENSE)

# pb2oas

The simply tool to convert .proto to openapi specification.

## Example

```javascript
const pb2oas = require('pb2oas')

pb2oas('user.proto', {
  title: 'Open API Specification',
  servers: [
    {
      url: "http://localhost:8080/v1",
    },
  ],
})
```

## Installation

`npm install pb2oas`

## Usage

### pb2oas(protos, options)

* **protos**: *REQUIRED*. The *.proto* file paths. If path is a directory, all *.proto* files in the directory are loaded.
* **options**: Options for generating openapi. Following options are supported:
    * **keepCase**: Keeps field casing instead of converting to camel case.
    * **useFilenameAsTagPrefix**: Use "filename.Service" format as tag.
    * **title**: *REQUIRED*. The title of the API.
    * **description**: A short description of the API.
    * **servers**: *REQUIRED*. An Array representing Servers.
    * **email**: The email address of the contact person/organization.
    * **routes**: The http route for the gRPC method. Example: { 'getUserInfo': 'get /users/:id' }

Full example:
```javascript
const pb2oas = require('pb2oas')

pb2oas('user.proto', {
  keepCase: true,
  useFilenameAsTagPrefix: true,
  routes: {
    newPet: 'post /pet',
    listPets: 'get /pets',
    getPet: 'get /pets/:id',
    updatePet: 'patch /pets/:id',
    deletePet: 'delete /pets/id',
  },
  title: 'Open API Specification',
  servers: [
    {
      url: "http://localhost:8080/v1",
      description: 'Development server',
    },
  ],
  email: 'support@example.com',
})
```

## License

This repository is licensed under the MIT license.
The license can be found [here](./LICENSE).