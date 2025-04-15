const db = require("../DataBase");





const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Specify where to store uploaded files
        cb(null, 'uploads/');  // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        // Set the file name (you can modify this as needed)
        cb(null, Date.now() + '-' + file.originalname);  // Prefix with timestamp to avoid name conflicts
    }
});

// File filter for restricting file types
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);  // Allow only PDF files
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

// Initialize multer with the storage configuration and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });



// Get all projects with student details
exports.getAllProjets = (req, res) => {
    const sql = `
        SELECT projets.*, students.nom, students.prenom, students.email
        FROM projets 
        INNER JOIN students ON projets.etudiantId = students.id
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
        SELECT projets.*, students.nom, students.prenom, students.email
        FROM projets 
        INNER JOIN students ON projets.etudiantId = students.id
        WHERE projets.id = ?
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
// Create a project with a file upload
exports.createProjet = (req, res) => {
    // Make sure the file is uploaded before proceeding
    upload.single('pdf')(req, res, (err) => {
        if (err) {
            // Handle any file upload errors
            return res.status(400).json({ error: err.message });
        }

        const { title, description, status, depot, etudiantId } = req.body;

        // Get the file path (Multer automatically attaches the file to req.file)
        const pdfPath = req.file ? req.file.path : null;  // Check if a file was uploaded

        const sql = `
            INSERT INTO projets (title, description, status, depot, etudiantId, pdf)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        db.query(sql, [title, description, status, depot, etudiantId, pdfPath], (err, result) => {
            if (err) {
                console.error("Error adding project:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json({ id: result.insertId, title, description, status, depot, etudiantId, pdf: pdfPath });
        });
    });
};


// Update a project (including changing the assigned student)
exports.updateProjet = (req, res) => {
    const { id } = req.params;
    const { title, description, status, depot, etudiantId } = req.body;
    
    const sql = `
        UPDATE projets 
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
    const sql = "DELETE FROM projets WHERE id = ?";

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