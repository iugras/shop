export default function UserDashboard() {
  const orders = [
    { id: 1, product: "Produit A", status: "Livré", date: "12/12/2025" },
    { id: 2, product: "Produit B", status: "En cours", date: "15/12/2025" },
    { id: 3, product: "Produit C", status: "Préparation", date: "17/12/2025" },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Tableau de bord utilisateur</h2>
      <p className="text-gray-600 mb-4">
        Voici vos dernières commandes et leur statut :
      </p>
      <ul className="divide-y">
        {orders.map((o) => (
          <li key={o.id} className="flex justify-between py-3">
            <div>
              <span className="font-semibold">{o.product}</span>
              <p className="text-sm text-gray-500">Date : {o.date}</p>
            </div>
            <span
              className={`px-3 py-1 rounded text-sm ${
                o.status === "Livré"
                  ? "bg-green-100 text-green-700"
                  : o.status === "En cours"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {o.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

