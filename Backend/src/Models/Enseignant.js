const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase"); 

const Enseignant = sequelize.define("Professors", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  nombre_fois: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  specialite: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: "enseignants",
  timestamps: false, 
});

module.exports = Enseignant;
