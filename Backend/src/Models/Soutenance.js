const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase");
const projet = require("./Projet"); // Import the project model
const Projet = require("./Projet");

const Soutenance = sequelize.define("Soutenance", {
  id_s: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  result_soutenance: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time_soutenance: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  date_soutenance: {  
    type: DataTypes.DATE,
    allowNull: false,
  },
  note: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  projetId: { // Foreign key for the student
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "projects", // Table name of Etudiant model
      key: "id",
    },
    onDelete: "CASCADE", // If a student is deleted, their projects will be deleted
  },
}, {
  tableName: "soutenances",  
  timestamps: true, 
  createdAt: "created_at",  
  updatedAt: "updated_at"
});

// Define the relationship
Projet.hasMany(Soutenance, { foreignKey: "soutenanceId", as: "soutenances" }); 

//Projet.belongsTo(Etudiant, { foreignKey: "etudiantId", as: "etudiant" });

module.exports = Soutenance;
