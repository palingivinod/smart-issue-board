import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
  };

  return (
    <div className="container">
      <h2>📝 Create Account</h2>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <button className="primary-btn" onClick={handleSignup}>Sign Up</button>

      <Link className="link-btn" to="/login">Already have an account? Login</Link>
    </div>
  );
}
