const db = require("../DataBase");

//get all profs
exports.getAllProfessors = (req, res) => {
    const sql = "SELECT * FROM professors";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching profs:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  };

//get prof by id
exports.getProfById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM professors WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching prof:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Prof not found" });
    }

    res.status(200).json(result[0]);
  });
}; 
   
//create a Prof
exports.createProf = (req, res) => {
    const { nom, prenom, email, date_naissance, nombre_fois,specialite } = req.body;
    const sql = "INSERT INTO professors (nom, prenom, email, date_naissance,nombre_fois,specialite) VALUES (?,?, ?, ?, ?, ?)";
    db.query(sql, [nom, prenom, email, date_naissance, nombre_fois,specialite], (err, result) => {
      if (err) {
        console.error("Error adding prof:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, email, date_naissance, nombre_fois,specialite });
    });
  };

//update prof
exports.updateProf = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, date_naissance, nombre_fois,specialite } = req.body;
  const sql = "UPDATE professors SET nom = ?, prenom = ?, email = ?, date_naissance = ?, nombre_fois = ? , specialite=? WHERE id = ?";

  db.query(sql, [nom, prenom, email, date_naissance, nombre_fois,specialite, id], (err, result) => {
    if (err) {
      console.error("Error updating prof:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prof not found" });
    }

    res.status(200).json({ message: "Prof updated successfully" });
  });
};


// Delete a prof by ID
exports.deleteProf = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM professors WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting prof:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prof not found" });
    }

    res.status(200).json({ message: "Prof deleted successfully" });
  });
};