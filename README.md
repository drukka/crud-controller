Node.js - CRUD Controller
=========
This is a useful CLI tool for RESTFUL CRUD controller generation. **C.R.U.D.** stands for **C**reate **R**ead **U**pdate **D**elete.  
This package assumes that you are using [ExpressJS](https://expressjs.com/) framework for routing and  [Sequelize](http://docs.sequelizejs.com/) as ORM.

## Installation
Install package globally using npm:  
```cli
npm i -g @drukka/crud-controller
```
## Usage
Run CLI command with _**--name {Name}**_ argument:
```cli
generate-controller --name {Name} [--overwrite [--config config.json]]
```
The above command will generate a file like _{Name}Controller.js_   
Replace the **{Name}** with your model name. If the file already exists, then you have to use *--overwrite* argument. **WARNING!** This will overwrite your file content!  
By default it will generate the controller in _**app/controllers/v1**_ directory. You can specify your app path structure in a JSON file (see example 2).

## Controller methods  
- index (listing every model item)
- show (show only one model item)
- create (create new model item)
- update (update an existing model item)
- delete (delete model item)

## Examples
#### Example 1
```cli
generate-controller --name User
```
This command will result the **app/controller/v1/UserController.js** file, with following content:  
```js
const models = require('../../models');

exports.index = (req, res) => {
  models.User.findAll({
    order: [
      ['id', 'DESC'],
    ],
  }).then((results) => {
    return res.json(results);
  });
};

exports.show = (req, res) => {
  models.User.findOne({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    return res.json(result);
  });
};

exports.create = (req, res) => {
  models.User.create(req.body).then((result) => {
    return res.json(result);
  });
};
exports.update = (req, res) => {
  models.User.update(req.body, {
    where: {
      id: req.params.id
    },
  }).then((result) => {
    return res.json(result);
  });
};

exports.delete = (req, res) => {
  models.User.destroy({
    where: {
      id: req.params.id
    },
  }).then(() => {
    res.send(204);
  });
};
```
It assumes that your app structure looks like:
- app
    - controllers
        - v1
        - v2
        - etc.
    - models
    - etc.
    
#### Example 2
Use **--config myconfig.json** if your Node.js project's structure is something like:  
- controllers
- models
- etc.  

Create **myconfig.json** file in the project's root directory, with the following content:
```json
{
  "paths": {
    "controllers": "controllers",
    "models": "models"
  }
}
```
Then just run the command:
```js
generate-controller --name User --config myconfig.json
```
This command will create the **controller/UserController.js** file, with almost the same content as above, except this line:  
```js
const models = require('../models');
```

## License
This project is licensed under the MIT License  - see the [LICENSE.md](https://github.com/drukka/crud-controller/blob/master/LICENSE.md) file for details.   
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)