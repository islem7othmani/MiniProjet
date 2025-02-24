const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase"); 

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
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  niveau: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "etudiants",
  timestamps: true, // Enables createdAt & updatedAt
  createdAt: "created_at",  
  updatedAt: "updated_at" 
});

module.exports = Etudiant;

/* zid hadhi fel base de données
ALTER TABLE students 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


ALTER TABLE professors 
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;


ALTER TABLE students ADD COLUMN password VARCHAR(255) NOT NULL;
ALTER TABLE professors ADD COLUMN password VARCHAR(255) NOT NULL;


ALTER TABLE students ADD COLUMN telephone VARCHAR(255) NOT NULL;
ALTER TABLE professors ADD COLUMN telephone VARCHAR(255) NOT NULL;

w tansech: npm install bcrypt
*/ 