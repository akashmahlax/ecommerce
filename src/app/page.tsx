

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', price: 199.99, image: '/headphones.webp' },
    { id: 2, name: 'Smart Watch', price: 149.99, image: '/smartwatch.webp' },
    { id: 3, name: 'Running Shoes', price: 89.99, image: 'shoes.webp' },
    { id: 4, name: 'Sunglasses', price: 129.99, image: '/sunglasses.webp' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to NextShop</h1>
          <p className="text-xl mb-8">Discover amazing products at great prices</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition duration-300">
            Shop Now
          </button>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}