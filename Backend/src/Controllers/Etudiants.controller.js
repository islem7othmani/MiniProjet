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
  
//create a student
exports.createEtudiant = (req, res) => {
    const { nom, prenom, email, date_naissance, niveau } = req.body;
    const sql = "INSERT INTO etudiants (nom, prenom, email, date_naissance, niveau) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nom, prenom, email, date_naissance, niveau], (err, result) => {
      if (err) {
        console.error("Error adding student:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, email, date_naissance, niveau });
    });
  };