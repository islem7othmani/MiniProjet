const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase");

const Projet = sequelize.define("Projet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {  
    type: DataTypes.STRING,
    allowNull: false,
  },
  depot: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: "projets",  
  timestamps: true, 
  createdAt: "created_at",  
  updatedAt: "updated_at"
});

module.exports = Projet;
