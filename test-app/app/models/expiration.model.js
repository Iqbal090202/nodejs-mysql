module.exports = (sequelize, Sequelize) => {
  const Expiration = sequelize.define("expiration", {
    expired: {
      type: Sequelize.DATE
    }
  });

  return Expiration;
};
