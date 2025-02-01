// app/admin/dashboard/page.jsx
'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DataTable } from '@/components/admin/products-table';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(true);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    images: [],
    stock: 0
  });
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error('Error fetching products');
        console.error('Error fetching products:', error);
      }
    };

    if (isAdmin) fetchProducts();
  }, [isAdmin]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editMode ? 'PUT' : 'POST';
      const endpoint = editMode ? `/api/products/${currentProductId}` : '/api/products';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        toast.success(editMode ? 'Product updated successfully' : 'Product created successfully');
        setFormData({ name: '', description: '', price: '', category: '', images: [], stock: 0 });
        setEditMode(false);
        fetchProducts();
      }
    } catch (error) {
      toast.error('Error saving product');
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = confirm('Are you sure you want to delete this product?');
      if (!confirmed) return;

      const response = await fetch(`/api/products/${id}`, { method: 'DELETE' });

      if (response.ok) {
        toast.success('Product deleted successfully');
        setProducts(products.filter(product => product._id !== id));
      }
    } catch (error) {
      toast.error('Error deleting product');
      console.error('Error:', error);
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setCurrentProductId(product._id);
    setFormData(product);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData({ ...formData, images: imageUrls });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add or Update Product Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Product' : 'Add New Product'}</h2>
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

              <div>
                <label className="block text-sm font-medium mb-1">Product Images</label>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                />
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {formData.images.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" className="w-full h-24 object-cover rounded" />
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full">
                {editMode ? 'Update Product' : 'Add Product'}
              </Button>
            </form>
          </div>

          {/* Products List */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
            <ul className="space-y-4">
              {products.map(product => (
                <li key={product._id} className="border p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <p className="text-sm">Price: {product.price} | Stock: {product.stock}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => handleEdit(product)}>Edit</Button>
                    <Button variant="destructive" onClick={() => handleDelete(product._id)}>Delete</Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
