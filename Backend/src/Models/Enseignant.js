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
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
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
  timestamps: true, // Enables createdAt & updatedAt
  createdAt: "created_at",  
  updatedAt: "updated_at"
});

module.exports = Enseignant;


