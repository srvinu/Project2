module.exports = function(sequelize, DataTypes) {
  var Order = sequelize.define("Order", {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    username: { type: DataTypes.STRING, allowNull: false},
    order_name: DataTypes.STRING,
    order_unique: DataTypes.STRING,
    order_price: DataTypes.DECIMAL(10,2),
    order_status: { type: DataTypes.BOOLEAN, defaultValue: true },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    feedback: DataTypes.TEXT,
    survey: { type: DataTypes.BOOLEAN, defaultValue: false },
    catogery: DataTypes.STRING
  },{
    timestamps: false
  });
  return Order;
};
