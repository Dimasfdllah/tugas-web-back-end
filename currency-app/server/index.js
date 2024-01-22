import cors from "cors";
import mysql2 from "mysql2";
import bodyParser from "body-parser";
import express from "express";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Konfigurasi koneksi MySQL
const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "money",
});

// Cek koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Mendapatkan semua tabungan
app.get("/api/savings", (req, res) => {
  db.query("SELECT * FROM savings", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Mendapatkan semua pengguna
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (error, results) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// Menambah tabungan baru
app.post("/api/savings", (req, res) => {
  const newSaving = req.body;
  db.query("INSERT INTO savings SET ?", newSaving, (error, result) => {
    try {
      if (error) {
        console.error("Database error:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        newSaving.id = result.insertId;
        res.json(newSaving);
      }
    } catch (error) {
      console.error("Error in try-catch block:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Menambah pengguna baru
app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  // Periksa apakah email sudah terdaftar
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Jika email belum terdaftar, tambahkan pengguna baru
    const newUser = { email, password };
    db.query("INSERT INTO users SET ?", newUser, (error, result) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      newUser.id = result.insertId;
      res.json(newUser);
    });
  });
});

// API endpoint untuk login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Terjadi kesalahan pada server" });
    }

    if (results.length > 0) {
      res.status(200).json({ message: "Login berhasil", user: results[0] });
    } else {
      res.status(401).json({ message: "Email atau password salah" });
    }
  });
});

app.put("/api/savings/:id", (req, res) => {
  const savingId = req.params.id;
  const updatedSaving = req.body;

  db.query(
    "UPDATE savings SET name = ?, amount = ?, description = ? WHERE id = ?",
    [
      updatedSaving.name,
      updatedSaving.amount,
      updatedSaving.description,
      savingId,
    ],
    (error) => {
      if (error) {
        console.error("Error updating saving:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(updatedSaving);
      }
    }
  );
});

// Menghapus tabungan berdasarkan ID
app.delete("/api/savings/:id", (req, res) => {
  const savingId = parseInt(req.params.id);
  db.query("DELETE FROM savings WHERE id = ?", savingId, (error) => {
    if (error) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "Saving deleted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
