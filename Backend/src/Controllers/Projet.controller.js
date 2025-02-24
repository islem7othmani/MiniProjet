const db = require("../DataBase");

exports.getAllProjets = (req, res) => {
    const sql = "SELECT * FROM projet";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching projects:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json(results);
    });
  };

  
  exports.getProjetById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM projet WHERE id = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching project:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      res.status(200).json(result[0]);
    });
  };

  
  exports.createProjet = (req, res) => {
    const { title, description, status, depot } = req.body;
    const sql = "INSERT INTO projet (title, description, status, depot) VALUES (?, ?, ?, ?)";
  
    db.query(sql, [title, description, status, depot], (err, result) => {
      if (err) {
        console.error("Error adding project:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.status(201).json({ id: result.insertId, title, description, status, depot });
    });
  };

  
  exports.updateProjet = (req, res) => {
    const { id } = req.params;
    const { title, description, status, depot } = req.body;
    
    const sql = "UPDATE projet SET title = ?, description = ?, status = ?, depot = ? WHERE id = ?";
  
    db.query(sql, [title, description, status, depot, id], (err, result) => {
      if (err) {
        console.error("Error updating project:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      res.status(200).json({ message: "Project updated successfully" });
    });
  };

  
  exports.deleteProjet = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM projet WHERE id = ?";
  
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting project:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Project not found" });
      }
  
      res.status(200).json({ message: "Project deleted successfully" });
    });
  };
  