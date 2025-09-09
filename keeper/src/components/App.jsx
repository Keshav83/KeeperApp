import React, { useEffect, useState } from "react";
import Header from "./Header";

const API_BASE = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) ? "http://localhost:5000" : "";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);
  const [usePersistent, setUsePersistent] = useState(null); // null = undecided, false = local, true = mongo
  const [showConfig, setShowConfig] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // helper: localStorage key
  const STORAGE_KEY = "keepers_notes_v1";

  useEffect(() => {
    // Ask backend whether persistent storage is configured
    fetch(API_BASE + "/config")
      .then(res => res.json())
      .then(data => {
        if (data && data.configured) {
          setUsePersistent(true);
          fetchNotesFromServer();
        } else {
          // Ask the user whether they want persistent storage
          setUsePersistent(null);
          setShowConfig(true);
          // load local notes for now
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) setNotes(JSON.parse(raw));
        }
      })
      .catch(err => {
        // Backend not available -- fallback to localStorage and ask user locally
        console.warn("Could not reach server /config:", err);
        setUsePersistent(null);
        setShowConfig(true);
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setNotes(JSON.parse(raw));
      });
  }, []);

  function fetchNotesFromServer() {
    fetch(API_BASE + "/notes")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setNotes(data);
      })
      .catch(err => {
        console.error("Failed to fetch notes from server:", err);
        setStatusMsg("Failed to fetch notes from server; using local notes.");
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setNotes(JSON.parse(raw));
        setUsePersistent(false);
      });
  }

  function saveLocal(notesArr) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notesArr));
    setNotes(notesArr);
  }

  async function addNote(newNote) {
    if (usePersistent) {
      // POST to server
      try {
        const res = await fetch(API_BASE + "/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newNote)
        });
        const created = await res.json();
        // server returns created note with _id
        setNotes(prev => [...prev, created]);
      } catch (e) {
        console.error(e);
        setStatusMsg("Failed to save to server. Saving locally.");
        saveLocal([...notes, newNote]);
      }
    } else {
      // local
      const next = [...notes, newNote];
      saveLocal(next);
    }
  }

  async function deleteNote(id) {
    if (usePersistent) {
      try {
        const res = await fetch(API_BASE + `/notes/${id}`, { method: "DELETE" });
        if (res.ok) {
          setNotes(prev => prev.filter(n => (n._id ? n._id !== id : n.id !== id)));
        } else {
          throw new Error("Delete failed");
        }
      } catch (e) {
        console.error(e);
        setStatusMsg("Failed to delete on server.");
      }
    } else {
      const next = notes.filter((note, idx) => idx !== id);
      saveLocal(next);
    }
  }

  // Called when user chooses persistence option in modal
  function handlePersistenceChoice(choice) {
    if (choice === "no") {
      setUsePersistent(false);
      setShowConfig(false);
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setNotes(JSON.parse(raw));
    } else {
      // show modal to input Mongo URI
      setShowConfig(true);
      setUsePersistent(null); // still undecided until config saved
    }
  }

  // Called when user submits mongo uri via CreateArea's config form (we'll use a custom event)
  async function handleSaveMongoUri(mongoUri) {
    setStatusMsg("Trying to configure persistent storage...");
    try {
      const res = await fetch(API_BASE + "/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mongoUri })
      });
      const data = await res.json();
      if (data && data.ok) {
        setStatusMsg("Connected to MongoDB. Switching to persistent storage.");
        setUsePersistent(true);
        setShowConfig(false);
        fetchNotesFromServer();
      } else {
        setStatusMsg("Could not connect with that URI: " + (data && data.error ? data.error : ""));
      }
    } catch (e) {
      console.error(e);
      setStatusMsg("Failed to send configuration to server.");
    }
  }

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
        {showConfig && usePersistent !== true && (
          <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12, borderRadius: 8 }}>
            <h3>Persistent storage</h3>
            <p>Do you want to store notes permanently (MongoDB)?</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => handlePersistenceChoice("no")}>No — store locally</button>
              <button onClick={() => handlePersistenceChoice("yes")}>Yes — configure MongoDB</button>
            </div>
            <div style={{ marginTop: 12, color: "#777" }}>{statusMsg}</div>
            {usePersistent === null && (
              // show form to input mongo uri
              <div style={{ marginTop: 12 }}>
                <p>If you chose Yes, paste your MongoDB connection string here (mongodb+srv://...):</p>
                <ConfigForm onSave={handleSaveMongoUri} />
              </div>
            )}
          </div>
        )}

        <CreateArea onAdd={addNote} onConfigure={handleSaveMongoUri} />
        {statusMsg && <div style={{ color: "darkred", marginTop: 8 }}>{statusMsg}</div>}

        {notes.map((noteItem, index) => {
          // noteItem might be coming from server (has _id) or local (no _id)
          const id = noteItem._id ? noteItem._id : index;
          return (
            <Note
              key={id}
              id={id}
              title={noteItem.title}
              content={noteItem.content}
              onDelete={deleteNote}
            />
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

// Small config form component used in modal
function ConfigForm({ onSave }) {
  const [uri, setUri] = useState("");
  return (
    <div style={{ marginTop: 8 }}>
      <input
        style={{ width: "100%", padding: 8 }}
        placeholder="MongoDB URI (mongodb+srv:// or mongodb://)"
        value={uri}
        onChange={e => setUri(e.target.value)}
      />
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onSave(uri)}>Save & Connect</button>
      </div>
    </div>
  );
}

export default App;
