import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";

export default function IssueList() {
  const [issues, setIssues] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const fetchIssues = async () => {
    let q = query(
      collection(db, "issues"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    let data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

    if (statusFilter !== "All") {
      data = data.filter((i) => i.status === statusFilter);
    }

    if (priorityFilter !== "All") {
      data = data.filter((i) => i.priority === priorityFilter);
    }

    setIssues(data);
  };

  useEffect(() => {
    fetchIssues();
  }, [statusFilter, priorityFilter]);

  // STATUS RULE
  const updateStatus = async (issue, newStatus) => {
    if (issue.status === "Open" && newStatus === "Done") {
      alert("Sorry can't move from open to done. First move to in progress.");
      return;
    }

    await updateDoc(doc(db, "issues", issue.id), {
      status: newStatus,
    });

    fetchIssues();
  };

  return (
    
    <div className="card">
      <h2>Issue List</h2>

      <p>Filter by Status:</p>
      <select onChange={(e) => setStatusFilter(e.target.value)}>
        <option>All</option>
        <option>Open</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>

      <p>Filter by Priority:</p>
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <hr />

      {issues.map((issue) => (
        <div key={issue.id} style={{ border: "1px solid black", margin: 10 }}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p>Priority: {issue.priority}</p>
          <p>Status: {issue.status}</p>
          <p>Assigned: {issue.assignedTo}</p>
          <p>Created By: {issue.createdBy}</p>

          <select
            onChange={(e) => updateStatus(issue, e.target.value)}
            defaultValue={issue.status}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
      ))}
    </div>
  );
}
