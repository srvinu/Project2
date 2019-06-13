module.exports = function(sequelize, DataTypes) {
  var Ocms = sequelize.define("Ocms", {
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      },
    menu_title: DataTypes.STRING,
    unique_title: DataTypes.STRING,
    menu_des: DataTypes.STRING,
    menu_text: DataTypes.TEXT,
    catogery: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    img_loc: DataTypes.STRING,
  },{
    timestamps: false
  });
  return Ocms;
};
