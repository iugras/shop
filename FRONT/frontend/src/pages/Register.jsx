import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    register(form.email, form.password, form.fullName);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Inscription</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Nom complet" className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"/>
        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"/>
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mot de passe" className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"/>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">S'inscrire</button>
      </form>
    </div>
  );
}

