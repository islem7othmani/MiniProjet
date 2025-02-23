const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase"); // Import DB connection

const Etudiant = sequelize.define("Students", {
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
  niveau: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "etudiants",
  timestamps: false, 
});

module.exports = Etudiant;
