// server.js - simple Express server with dynamic MongoDB configuration
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(bodyParser.json());

let UseDB = false;
let NoteModel = null;
let inMemoryNotes = [];

// define mongoose schema function
function defineModel() {
  const noteSchema = new mongoose.Schema({
    title: String,
    content: String
  }, { timestamps: true });
  NoteModel = mongoose.model("Note", noteSchema);
}

// try to connect if MONGO_URI present
async function tryConnect(uri) {
  if (!uri) return false;
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    defineModel();
    UseDB = true;
    console.log("Connected to MongoDB");
    // migrate in-memory notes to DB if any
    if (inMemoryNotes.length > 0) {
      const docs = inMemoryNotes.map(n => ({ title: n.title, content: n.content }));
      await NoteModel.insertMany(docs);
      inMemoryNotes = [];
      console.log("Migrated in-memory notes to MongoDB");
    }
    return true;
  } catch (e) {
    console.error("MongoDB connection failed:", e.message || e);
    UseDB = false;
    NoteModel = null;
    return false;
  }
}

(async () => {
  const uri = process.env.MONGO_URI;
  if (uri) {
    await tryConnect(uri);
  }
})();

// config endpoints
app.get("/config", (req, res) => {
  res.json({ configured: UseDB });
});

app.post("/config", async (req, res) => {
  const { mongoUri } = req.body;
  if (!mongoUri) return res.status(400).json({ ok: false, error: "mongoUri required" });
  const ok = await tryConnect(mongoUri);
  if (ok) {
    // persist to .env
    const envPath = path.join(__dirname, ".env");
    try {
      fs.writeFileSync(envPath, "MONGO_URI=" + mongoUri + "\n", { encoding: "utf8" });
      return res.json({ ok: true });
    } catch (e) {
      console.error("Failed to write .env:", e);
      return res.json({ ok: true, warning: "connected but failed to write .env" });
    }
  } else {
    return res.status(500).json({ ok: false, error: "Could not connect to provided URI" });
  }
});

// notes endpoints
app.get("/notes", async (req, res) => {
  if (UseDB && NoteModel) {
    const docs = await NoteModel.find({}).sort({ createdAt: 1 }).lean();
    res.json(docs);
  } else {
    res.json(inMemoryNotes);
  }
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  if (UseDB && NoteModel) {
    const doc = await NoteModel.create({ title, content });
    res.json(doc);
  } else {
    const note = { title, content };
    inMemoryNotes.push(note);
    res.json(note);
  }
});

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  if (UseDB && NoteModel) {
    try {
      await NoteModel.deleteOne({ _id: id });
      return res.json({ ok: true });
    } catch (e) {
      return res.status(500).json({ ok: false, error: e.message });
    }
  } else {
    // id is index in inMemory case
    const idx = parseInt(id, 10);
    if (!isNaN(idx) && idx >= 0 && idx < inMemoryNotes.length) {
      inMemoryNotes.splice(idx, 1);
      return res.json({ ok: true });
    } else {
      return res.status(404).json({ ok: false, error: "not found" });
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
