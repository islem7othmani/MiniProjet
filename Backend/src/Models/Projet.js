const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase");
const Etudiant = require("./Etudiant"); // Import the Etudiant model

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
  etudiantId: { // Foreign key for the student
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "students", // Table name of Etudiant model
      key: "id",
    },
    onDelete: "CASCADE", // If a student is deleted, their projects will be deleted
  },
}, {
  tableName: "projets",  
  timestamps: true, 
  createdAt: "created_at",  
  updatedAt: "updated_at"
});

// Define the relationship
Etudiant.hasMany(Projet, { foreignKey: "etudiantId", as: "projets" }); 
Projet.belongsTo(Etudiant, { foreignKey: "etudiantId", as: "etudiant" });

module.exports = Projet;
