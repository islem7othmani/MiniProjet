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
  projetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "projets",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  presidentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "professors",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  rapporteurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "professors",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  encadrantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "professors",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "students",
      key: "id",
    },
    onDelete: "CASCADE",
  }
}, {
  tableName: "soutenances",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at"
});
