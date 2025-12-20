export default function Cart() {
  const items = [
    { id: 1, title: "Produit A", price: 29.99 },
    { id: 2, title: "Produit B", price: 49.99 },
    { id: 3, title: "Produit C", price: 19.99 },
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">🛒 Votre panier</h2>
      <ul className="divide-y">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between py-3">
            <span>{item.title}</span>
            <span className="font-semibold">{item.price.toFixed(2)} €</span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-lg font-bold">Total :</span>
        <span className="text-xl font-semibold text-blue-600">
          {total.toFixed(2)} €
        </span>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Order
        </button>
      </div>
    </div>
  );
}
