// app/admin/dashboard/page.jsx
'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/admin/products-table';
import { columns } from './columns';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    stock: 0
  });
  const [isAdmin, setIsAdmin] = useState(true);

  // Check admin status
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const response = await fetch(`/api/users/${user.id}`);
        const userData = await response.json();
        setIsAdmin(userData.role === 'admin');
      }
    };
    
    if (isLoaded) checkAdminStatus();
  }, [user, isLoaded]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getToken()}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        toast.success('Product created successfully');
        setFormData({
          name: '',
          description: '',
          price: '',
          category: '',
          images: [],
          stock: 0
        });
      }
    } catch (error) {
      toast.error('Error creating product');
      console.error('Error:', error);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;
  if (!isAdmin) return <div>Unauthorized access</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Add Product
              </Button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            <DataTable columns={columns} data={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
