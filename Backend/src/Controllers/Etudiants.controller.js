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
   
exports.createEtudiant = async (req, res) => {
  const { nom, prenom, email, date_naissance, telephone, password, niveau } = req.body;

  try {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const sql = "INSERT INTO students (nom, prenom, email, date_naissance, telephone, password, niveau) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(sql, [nom, prenom, email, date_naissance, telephone, hashedPassword, niveau], (err, result) => {
        if (err) {
          console.error("Error adding student:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ id: result.insertId, nom, prenom, email, date_naissance, telephone, niveau });
      });

  } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update student information, including password (if provided)
exports.updateStudent = async (req, res) => {
const { id } = req.params;
const { nom, prenom, email, date_naissance, telephone, password, niveau } = req.body;

try {
  let sql, params;
  
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash new password
    sql = "UPDATE students SET nom = ?, prenom = ?, email = ?, date_naissance = ?, telephone = ?, password = ?, niveau = ? WHERE id = ?";
    params = [nom, prenom, email, date_naissance, telephone, hashedPassword, niveau, id];
  } else {
    sql = "UPDATE students SET nom = ?, prenom = ?, email = ?, date_naissance = ?, telephone = ?, niveau = ? WHERE id = ?";
    params = [nom, prenom, email, date_naissance, telephone, niveau, id];
  }

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error updating student:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully" });
  });

} catch (error) {
  console.error("Error hashing password:", error);
  res.status(500).json({ error: "Internal Server Error" });
}
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