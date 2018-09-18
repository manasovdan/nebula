module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      productid: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      timestamps: false,
      schema: 'production',
      freezeTableName: true,
    },
  );

  Product.associate = (models) => {
    models.product.hasMany(models.review);
  };

  return Product;
};
