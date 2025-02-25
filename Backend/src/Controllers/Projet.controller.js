const db = require("../DataBase");

// Get all projects with student details
exports.getAllProjets = (req, res) => {
    const sql = `
        SELECT projet.*, students.nom, students.prenom, students.email
        FROM projet 
        INNER JOIN students ON projet.etudiantId = students.id
    `;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching projects:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};

// Get a single project by ID with student details
exports.getProjetById = (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT projet.*, students.nom, students.prenom, students.email
        FROM projet 
        INNER JOIN students ON projet.etudiantId = students.id
        WHERE projet.id = ?
    `;

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

// Create a project linked to a student
exports.createProjet = (req, res) => {
    const { title, description, status, depot, etudiantId } = req.body;
    const sql = `
        INSERT INTO projet (title, description, status, depot, etudiantId)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [title, description, status, depot, etudiantId], (err, result) => {
        if (err) {
            console.error("Error adding project:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.status(201).json({ id: result.insertId, title, description, status, depot, etudiantId });
    });
};

// Update a project (including changing the assigned student)
exports.updateProjet = (req, res) => {
    const { id } = req.params;
    const { title, description, status, depot, etudiantId } = req.body;
    
    const sql = `
        UPDATE projet 
        SET title = ?, description = ?, status = ?, depot = ?, etudiantId = ?
        WHERE id = ?
    `;

    db.query(sql, [title, description, status, depot, etudiantId, id], (err, result) => {
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

// Delete a project
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
