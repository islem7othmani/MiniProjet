const db = require("../DataBase");

//get all students
exports.getAllEtudiants = (req, res) => {
    const sql = "SELECT * FROM students";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching students:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  };

//get student by id
exports.getStudentById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM students WHERE id = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching student:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    
    if (result.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(result[0]);
  });
}; 
   
//create a student
exports.createEtudiant = (req, res) => {
    const { nom, prenom, email, date_naissance, niveau } = req.body;
    const sql = "INSERT INTO students (nom, prenom, email, date_naissance, niveau) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nom, prenom, email, date_naissance, niveau], (err, result) => {
      if (err) {
        console.error("Error adding student:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, email, date_naissance, niveau });
    });
  };

//update
exports.updateStudent = (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, date_naissance, niveau } = req.body;
  const sql = "UPDATE students SET nom = ?, prenom = ?, email = ?, date_naissance = ?, niveau = ? WHERE id = ?";

  db.query(sql, [nom, prenom, email, date_naissance, niveau, id], (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  });
};


// Delete a student by ID
exports.deleteStudent = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting student:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  });
};