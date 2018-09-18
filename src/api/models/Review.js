module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define(
    'review',
    {
      reviewID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      text: DataTypes.STRING,
    },
    {
      timestamps: false,
      schema: 'production',
      freezeTableName: true,
    },
  );

  review.associate = (models) => {
    models.review.belongsTo(models.product, {foreignKey: 'productid'});
  };

  return review;
};
