const db = require("../DataBase");

exports.getAllSoutenances = (req, res) => {
    const sql = `
        SELECT soutenances.*, 
               projets.title, projets.depot, projets.description, projets.status,
               students.nom AS students_nom, students.prenom AS students_prenom,
               president.nom AS president_nom, president.prenom AS president_prenom,
               rapporteur.nom AS rapporteur_nom, rapporteur.prenom AS rapporteur_prenom,
               encadrant.nom AS encadrant_nom, encadrant.prenom AS encadrant_prenom
        FROM soutenances
        INNER JOIN projets ON soutenances.projetId = projets.id
        INNER JOIN students ON projets.etudiantId = students.id  -- Corrected the reference to students table and the correct column
        LEFT JOIN enseignants AS president ON soutenances.presidentId = president.id
        LEFT JOIN enseignants AS rapporteur ON soutenances.rapporteurId = rapporteur.id
        LEFT JOIN enseignants AS encadrant ON soutenances.encadrantId = encadrant.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching soutenances:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
};

exports.createSoutenance = (req, res) => {
    const { result_soutenance, time_soutenance, studentId, date_soutenance, note, projetId, presidentId, rapporteurId, encadrantId } = req.body;

    const sql = `
        INSERT INTO soutenances (result_soutenance, time_soutenance, studentId, date_soutenance, note, projetId, presidentId, rapporteurId, encadrantId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [result_soutenance, time_soutenance, studentId, date_soutenance, note, projetId, presidentId, rapporteurId, encadrantId], (err, result) => {
        if (err) {
            console.error("Error adding soutenance:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Fetch the soutenance and student details
        const getSoutenanceSql = `
            SELECT soutenances.*, 
                   projets.title, projets.depot, projets.description, projets.status,
                   students.nom AS students_nom, students.prenom AS students_prenom,
                   president.nom AS president_nom, president.prenom AS president_prenom,
                   rapporteur.nom AS rapporteur_nom, rapporteur.prenom AS rapporteur_prenom,
                   encadrant.nom AS encadrant_nom, encadrant.prenom AS encadrant_prenom
            FROM soutenances
            INNER JOIN projets ON soutenances.projetId = projets.id
            INNER JOIN students ON projets.etudiantId = students.id  -- Corrected column name for students
            LEFT JOIN enseignants AS president ON soutenances.presidentId = president.id
            LEFT JOIN enseignants AS rapporteur ON soutenances.rapporteurId = rapporteur.id
            LEFT JOIN enseignants AS encadrant ON soutenances.encadrantId = encadrant.id
            WHERE soutenances.id_s = ?
        `;

        db.query(getSoutenanceSql, [result.insertId], (err, resultSoutenance) => {
            if (err) {
                console.error("Error fetching soutenance details:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }

            if (resultSoutenance.length === 0) {
                return res.status(404).json({ error: "Soutenance not found" });
            }

            res.status(201).json(resultSoutenance[0]);
        });
    });
};

exports.updateSoutenance = (req, res) => {
    const { id_s } = req.params; // Get soutenance ID from request params
    const { presidentId, rapporteurId, encadrantId } = req.body; // Get updated professor IDs from the request body

    console.log(`Updating soutenance with id_s: ${id_s}`);  // Log the soutenance ID to ensure it's being passed correctly

    // Validate that at least one professor ID is provided
    if (!presidentId && !rapporteurId && !encadrantId) {
        return res.status(400).json({ error: "At least one professor ID must be provided." });
    }

    // Build the SET part of the SQL query dynamically
    const updates = [];
    const values = [];

    if (presidentId) {
        updates.push("presidentId = ?");
        values.push(presidentId);
    }
    if (rapporteurId) {
        updates.push("rapporteurId = ?");
        values.push(rapporteurId);
    }
    if (encadrantId) {
        updates.push("encadrantId = ?");
        values.push(encadrantId);
    }

    // Add the soutenance ID at the end of the query
    values.push(id_s);

    // Construct the SQL query to update the soutenance
    const sql = `
        UPDATE soutenances
        SET ${updates.join(", ")}
        WHERE id_s = ?
    `;

    console.log(`SQL Query: ${sql}`);  // Log the final SQL query to ensure it's correct

    // Execute the query to update the soutenance
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating soutenance:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        // Check if any rows were affected
        if (result.affectedRows === 0) {
            console.log(`No soutenance found with id_s: ${id_s}`);  // Log if no rows are affected
            return res.status(404).json({ error: "Soutenance not found" });
        }

        // Respond with a success message indicating the update was successful
        res.status(200).json({ message: "Soutenance updated successfully" });
    });
};

exports.getSoutenanceByStudentId = (req, res) => {
    const { id } = req.params; 

    const sql = `
        SELECT * from soutenances, students, projets,professors p1, professors p2, professors p3
        where soutenances.studentId = students.id and projets.id = soutenances.projetId and p1.id = soutenances.presidentId and p2.id = soutenances.rapporteurId and p3.id = soutenances.encadrantId  and students.id = ?
    `;

    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error fetching soutenance by student ID:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }


        res.json(results); // or res.json(results) if multiple soutenances per student
    });
};
