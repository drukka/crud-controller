'use strict';

['%requireModel%'];

exports.index = (req, res) => {
  ['%modelName%'].findAll({
    order: [
      ['id', 'DESC'],
    ],
  }).then((results) => {
    return res.json(results);
  });
};

exports.show = (req, res) => {
  ['%modelName%'].findOne({
    where: {
      id: req.params.id
    }
  }).then((result) => {
    return res.json(result);
  });
};

exports.create = (req, res) => {
  ['%modelName%'].create(req.body).then((result) => {
    return res.json(result);
  });
};
exports.update = (req, res) => {
  ['%modelName%'].update(req.body, {
    where: {
      id: req.params.id
    },
  }).then((result) => {
    return res.json(result);
  });
};

exports.delete = (req, res) => {
  ['%modelName%'].destroy({
    where: {
      id: req.params.id
    },
  }).then(() => {
    res.send(204);
  });
};