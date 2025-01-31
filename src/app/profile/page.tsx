// app/profile/page.jsx
'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have UI components
import { Input } from '@/components/ui/input'; // Assuming you have UI components
export default function ProfilePage() {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    address: '',
    preferences: {}
  });

  // Fetch user data from MongoDB
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await fetch(`/api/users/${user.id}`);
          const data = await response.json();
          setUserData(data);
          setFormData({
            phoneNumber: data.phoneNumber || '',
            address: data.address || '',
            preferences: data.preferences || {}
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchUserData();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setUserData(updatedData);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please sign in to view your profile</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-6 mb-8">
        <img
          src={user.imageUrl}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
        />
        <div>
          <h1 className="text-3xl font-bold">
            {user.fullName}
          </h1>
          <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">Email</label>
              <p className="mt-1">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">Joined</label>
              <p className="mt-1">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Custom User Data */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Address
              </label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter your address"
              />
            </div>

            <div className="mt-6">
              <Button type="submit" className="w-full">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Security Section */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Security</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">Password</h3>
              <p className="text-sm text-gray-600">Last updated 3 months ago</p>
            </div>
            <Button variant="outline" onClick={() => user.update({ password: true })}>
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}