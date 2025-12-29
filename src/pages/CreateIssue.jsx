import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export default function CreateIssue() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("Low");
  const [assignedTo, setAssignedTo] = useState("");
  const [similarIssues, setSimilarIssues] = useState([]);
  const navigate = useNavigate();
  const issuesRef = collection(db, "issues");

  // -------- SIMILAR ISSUE DETECTION --------
  useEffect(() => {
    const checkSimilar = async () => {
      if (!title) return;

      const q = query(
        issuesRef,
        where("title", ">=", title.slice(0, 3)),
        where("title", "<=", title + "\uf8ff")
      );

      const snap = await getDocs(q);

      const results = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setSimilarIssues(results);
    };

    checkSimilar();
  }, [title]);

  // -------- CREATE ISSUE --------
  const handleCreate = async () => {
  console.log("Create button clicked");

  try {
    if (!auth.currentUser) {
      console.log(" No user logged in");
      alert("Please login first");
      return;
    }

    await addDoc(issuesRef, {
      title,
      description: desc,
      priority,
      status: "Open",
      assignedTo,
      createdBy: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    alert("Issue created successfully");

    navigate("/issues");

  } catch (err) {
    
    alert("Error creating issue: " + err.message);
  }
};



  return (
    <div className="container">
      <h2>Create Issue</h2>

      <input
        placeholder="Issue title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        placeholder="Assign to (email or name)"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />

      <button onClick={handleCreate}>Create Issue</button>

      {/* SIMILAR ISSUE SECTION */}
      {similarIssues.length > 0 && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h4>Similar issues found:</h4>
          {similarIssues.map((issue) => (
            <p key={issue.id}>
              • {issue.title} ({issue.status})
            </p>
          ))}
          <p>You may be creating a duplicate issue.</p>
        </div>
      )}
    </div>
  );
}
