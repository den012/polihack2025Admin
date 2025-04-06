import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const API_URL = import.meta.env.VITE_API_URL; // Ensure this is set in your environment variables

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

  const handleCheckboxChange = (value: boolean) => {
    setFormData({
      ...formData,
      isChecked: value,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send form data to the backend API
      const response = await axios.post(`${API_URL}/api/events`, formData);

      // Show a success toast notification
      toast.success(response.data.message);

      // Reset all form fields
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin Panel</h1>
        <h2 className="text-xl font-semibold text-gray-600 mb-6">Add an Event</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="organizerName"
            placeholder="Organizer Name"
            value={formData.organizerName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="categoryId"
            placeholder="Category ID"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;