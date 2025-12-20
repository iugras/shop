import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function AdminDashboard() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios.get("/articles").then((res) => setArticles(res.data.items));
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Admin - Manage of articles</h2>
      <p className="text-gray-600 mb-4">
        Manage your products: add, modify or delete.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((a) => (
          <div
            key={a.id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{a.title}</h3>
            <p className="text-gray-600 mb-2">{a.price} €</p>
            <div className="flex gap-2">
              <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
                Edit
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

