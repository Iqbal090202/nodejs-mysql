const db = require("../models");
const User = db.users;
const Expiration = db.expirations;

const findOneUser = (id, res) => {
  User.findByPk(id)
    .then((data) => {
      res.send({
        data,
        status: "success",
        expired: false,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with code=" + id,
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.code;

  Expiration.findByPk(id)
    .then((data) => {
      if (new Date() >= new Date(data.expired)) {
        res.send({
          status: "success",
          expired: true,
        });
      } else findOneUser(data.userId, res);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving expiration with code=" + id,
      });
    });
};
