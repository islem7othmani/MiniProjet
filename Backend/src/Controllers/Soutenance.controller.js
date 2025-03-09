const db = require("../DataBase");

exports.getAllSoutenances = (req, res) => {
    const sql = `
        SELECT soutenance.*, projets.title, projets.depot, projets.description, projets.status
        FROM soutenance 
        INNER JOIN projets ON soutenance.projetId= projet.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching soutenances:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};

// Get a single project by ID with student details
exports.getSoutenanceById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT soutenance.*, projets.title, projets.depot, projets.description, projets.status
        FROM soutenance 
        INNER JOIN projets ON soutenance.projetId= projet.id
        WHERE soutenance.id_s = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error fetching soutenance:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "soutenance not found" });
        }

        res.status(200).json(result[0]);
    });
};

// Create a project linked to a student
exports.createSoutenance = (req, res) => {
    const { result_soutenance, time_soutenance, date_soutenance, note, projetId } = req.body;
    const sql = `
        INSERT INTO projet (result_soutenance, time_soutenance, date_soutenance, note, projetId)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, description, status, depot, etudiantId], (err, result) => {
        if (err) {
            console.error("Error adding soutenance:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ id: result.insertId, result_soutenance, time_soutenance, date_soutenance, note, projetId });
    });
};

exports.updateSoutenance = (req, res) => {
    const { id } = req.params;
    const { result_soutenance, time_soutenance, date_soutenance, note, projetId } = req.body;
    
    const sql = `
        UPDATE soutenance 
        SET result_soutenance=?, time_soutenance=?, date_soutenance=?, note=?, projetId=?
        WHERE id_s = ?
    `;

    db.query(sql, [result_soutenance, time_soutenance, date_soutenance, note, projetId, id], (err, result) => {
        if (err) {
            console.error("Error updating soutenances:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "soutenance not found" });
        }

        res.status(200).json({ message: "soutenance updated successfully" });
    });
};

exports.deleteSoutenance = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM soutenance WHERE id_s = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting soutenance:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "soutenance not found" });
        }

        res.status(200).json({ message: "soutenance deleted successfully" });
    });
};
