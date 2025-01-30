export default function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg text-green-500 font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-700 mb-4">${product.price}</p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    );
  }