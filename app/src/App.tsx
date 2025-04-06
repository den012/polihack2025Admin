import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const PASSOWORD = import.meta.env.VITE_PASSWORD;

  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    imageUrl: '',
    isChecked: false,
    date: '',
    price: '',
    location: '',
    organizerName: '',
    categoryId: '',
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories`, {
          headers: {
            "ngrok-skip-browser-warning": "true"
        }
        });
        setCategories(response.data.data);
      } catch (error: any) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to fetch categories');
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (value: boolean) => {
    setFormData({
      ...formData,
      isChecked: value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePasswordSubmit = async () => {
    if (password !== PASSOWORD.toString()) {
      toast.error('Incorrect password!');
      return;
    }

    setShowPasswordModal(false); // Close the modal

    try {
      const response = await axios.post(`${API_URL}/api/events`, formData, {
        headers: {
          "ngrok-skip-browser-warning": "true"
      }
      });

      toast.success(response.data.message);

      setFormData({
        eventName: '',
        description: '',
        imageUrl: '',
        isChecked: false,
        date: '',
        price: '',
        location: '',
        organizerName: '',
        categoryId: '',
      });
    } catch (error: any) {
      console.error('Error submitting event:', error);
      toast.error(error.response?.data?.message || 'Failed to submit event');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPasswordModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col lg:flex-row lg:space-x-6 w-full max-w-6xl">
        {/* Categories Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2 mb-6 lg:mb-0">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Categories</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
              >
                <span className="text-gray-700 font-medium">ID: {category.id}</span>
                <span className="text-gray-900 font-semibold">{category.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-6">Add an Event</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <p className="text-gray-700 mb-2">Do you want to promote?</p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isChecked === true}
                    onChange={() => handleCheckboxChange(true)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>Yes</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isChecked === false}
                    onChange={() => handleCheckboxChange(false)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="organizerName"
              placeholder="Organizer Name"
              value={formData.organizerName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Enter Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;