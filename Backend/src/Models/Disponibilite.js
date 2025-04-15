const { DataTypes } = require("sequelize");
const sequelize = require("../DataBase");
const Enseignant = require("./Enseignant"); 

const Disponibilite = sequelize.define("Disponibilite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  heure: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  dateD: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  profId: { // Foreign key for the student
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "professors", // Table name of Etudiant model
      key: "id",
    },
    onDelete: "CASCADE", // If a student is deleted, their projects will be deleted
  },
}, {
  tableName: "disponibilites",  
  timestamps: true, 
  createdAt: "created_at",  
  updatedAt: "updated_at"
});

// Define the relationship
Enseignant.hasMany(Disponibilite, { foreignKey: "profId", as: "professors" }); 

module.exports = Projet;
