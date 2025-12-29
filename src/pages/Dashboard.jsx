import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);     // logged in
      } else {
        setUserEmail(null);           // logged out
      }
    });

    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");     // go back to login automatically
  };

  return (
    <div className="container">

      <h2>Smart Issue Board</h2>


      {!userEmail && (
        <>
          <div className="card">
            <h3>You are not logged in</h3>
            <p>Please login to continue.</p>
          </div>

          <Link className="link-btn" to="/login">🔐 Go to Login</Link>
          <Link className="link-btn" to="/signup">📝 Create Account</Link>
        </>
      )}

      {/* LOGGED IN  */}
      {userEmail && (
        <>
          <div className="card">
            <p><strong>Logged in as:</strong></p>
            <p>{userEmail}</p>
          </div>

          <div className="card">
            <h3> Quick Actions</h3>

            <Link className="link-btn" to="/create">Create New Issue</Link>
            <Link className="link-btn" to="/issues"> View All Issues</Link>
          </div>

          <button className="danger-btn" onClick={handleLogout}>
             Logout
          </button>
        </>
      )}

    </div>
  );
}
