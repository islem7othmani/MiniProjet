const db = require("../DataBase");

exports.getAllDisp = (req, res) => {
    const sql = `
        SELECT disponibilities.*
        FROM disponibilities 
        INNER JOIN professors ON disponibilities.profId = professors.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching disp:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};


exports.getDispByProf = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT disponibilities.*
        FROM disponibilities 
        INNER JOIN professors ON disponibilities.profId = professors.id
        WHERE professors.id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching disp:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "disp not found" });
        }

        res.status(200).json(result[0]);
    });
};

// Add a new Disponibilite
exports.createDisponibilite = (req, res) => {
    const { heure, dateD, profId } = req.body;
    const sql = `
        INSERT INTO disponibilites (heure, dateD, profId)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [heure, dateD, profId], (err, result) => {
        if (err) {
            console.error("Error adding disponibilite:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ id: result.insertId, heure, dateD, profId });
    });
};

  
  // Update an existing Disponibilite
  exports.updateDisponibilite = (req, res) => {
    const { id } = req.params;
    const { heure, dateD, profId } = req.body;

    const sql = `
        UPDATE disponibilites
        SET heure = ?, dateD = ?, profId = ?
        WHERE id = ?
    `;

    db.query(sql, [heure, dateD, profId, id], (err, result) => {
        if (err) {
            console.error("Error updating disponibilite:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Disponibilité not found" });
        }

        res.status(200).json({ message: "Disponibilité updated successfully" });
    });
};

  
  // Delete a Disponibilite
  exports.deleteDisponibilite = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM disponibilites WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting disponibilite:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Disponibilité not found" });
        }

        res.status(200).json({ message: "Disponibilité deleted successfully" });
    });
};
