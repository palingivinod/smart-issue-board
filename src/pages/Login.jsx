import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  await signInWithEmailAndPassword(auth, email, password);
  alert("Welcome back!");
  navigate("/dashboard");   
   };


  return (
    <div className="container">
      <h2>🔐 Smart Issue Board – Login</h2>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />

      <button className="primary-btn" onClick={handleLogin}>Login</button>

      <Link className="link-btn" to="/signup">Create account</Link>
    </div>
  );
}
