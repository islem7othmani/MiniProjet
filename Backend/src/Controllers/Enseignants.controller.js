const db = require("../DataBase");
const bcrypt = require("bcrypt");


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
exports.createProf = async (req, res) => {
  const { nom, prenom, email,telephone,password, date_naissance, nombre_fois,specialite } = req.body;
    const sql = "INSERT INTO professors (nom, prenom, email,telephone,password, date_naissance,nombre_fois,specialite) VALUES (?,?, ?, ?, ?, ?,?,?)";
    db.query(sql, [nom, prenom, email,telephone,await bcrypt.hash(password, 10), date_naissance, nombre_fois,specialite], (err, result) => {
      if (err) {
        console.error("Error adding prof:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: result.insertId, nom, prenom, email,telephone, date_naissance, nombre_fois,specialite });
    });
  };

//update prof
exports.updateProf = async(req, res) => {
  const { id } = req.params;
  const { nom, prenom, email,telephone,password, date_naissance, nombre_fois,specialite } = req.body;
  const sql = "UPDATE professors SET nom = ?, prenom = ?, email = ?,telephone=?,password=?, date_naissance = ?, nombre_fois = ? , specialite=? WHERE id = ?";

  db.query(sql, [nom, prenom, email,telephone,await bcrypt.hash(password, 10), date_naissance, nombre_fois,specialite, id], (err, result) => {
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

exports.createMultipleProfessors = async (req, res) => {
  const professors = req.body;  

  if (!Array.isArray(professors) || professors.length === 0) {
      return res.status(400).json({ error: "Invalid data format" });
  }

  try {
      // Hash passwords before inserting
      const professorsWithHashedPasswords = await Promise.all(
          professors.map(async (prof) => ({
              ...prof,
              password: await bcrypt.hash(prof.password, 10) // rounds = 10
          }))
      );

      const values = professorsWithHashedPasswords.map(prof => [
          prof.id, prof.nom, prof.prenom,prof.email,
          prof.date_naissance, prof.nombre_fois,prof.specialite, 
          prof.telephone, prof.password
             
      ]);

      const sql = `INSERT INTO professors 
                  (id, nom, prenom, email,date_naissance, nombre_fois, specialite, telephone, password) 
                  VALUES ?`;

      db.query(sql, [values], (err, result) => {
          if (err) {
              console.error("Error inserting professors:", err);
              return res.status(500).json({ error: "Internal Server Error" });
          }
          res.status(201).json({ message: "Professors added successfully", inserted: result.affectedRows });
      });
  } catch (error) {
      console.error("Error processing professors:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};
/*structure of req.body: 
exemple ntab3ou 3lih
[
  {
    "nom": "Doe",
    "prenom": "John",
    "email": "johndoe@example.com",
    "telephone": "123456789",
    "password": "0000",
    "date_naissance": "1980-05-20",
    "nombre_fois": 16,
    "specialite": "Mathematics"
  },
  {
    "nom": "Smith",
    "prenom": "Jane",
    "email": "janesmith@example.com",
    "telephone": "987654321",
    "password": "1234",
    "date_naissance": "1985-09-15",
    "nombre_fois": 12,
    "specialite": "Physics"
  }
]

*/ 