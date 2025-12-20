export default function Home() {
  const products = [
    { id: 1, title: "Produit A", price: 29.99, image: "https://placehold.co/200x150" },
    { id: 2, title: "Produit B", price: 49.99, image: "https://placehold.co/200x150" },
    { id: 3, title: "Produit C", price: 19.99, image: "https://placehold.co/200x150" },
    { id: 4, title: "Produit D", price: 99.99, image: "https://placehold.co/200x150" },
    { id: 5, title: "Produit E", price: 59.99, image: "https://placehold.co/200x150" },
    { id: 6, title: "Produit F", price: 39.99, image: "https://placehold.co/200x150" },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome to MyShop</h2>
      <p className="text-gray-600 text-center mb-10">
        Discover our popular products and add them to your cart
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition"
          >
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-600 mb-2">{p.price.toFixed(2)} €</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
               Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
