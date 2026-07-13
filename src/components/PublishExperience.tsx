"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ExperienceFormData {
  title: string;
  shortDescription: string;
  fullDescription: string;
  city: string;
  country: string;
  category: string;
  duration: number;
  pricePerPerson: number;
  coverImageUrl?: string;
}

interface FormErrors {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  city?: string;
  country?: string;
  category?: string;
  duration?: string;
  pricePerPerson?: string;
}

const PublishExperience: React.FC = () => {
  const router = useRouter();
  
  const [formData, setFormData] = useState<ExperienceFormData>({
    title: '',
    shortDescription: '',
    fullDescription: '',
    city: '',
    country: 'Indonesia',
    category: 'Cultural',
    duration: 4,
    pricePerPerson: 120,
    coverImageUrl: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const categories = [
    'Cultural',
    'Adventure',
    'Food',
    'Nature',
    'Historical',
    'Urban',
    'Relaxation',
    'Educational',
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length < 20) {
      newErrors.shortDescription = 'Short description must be at least 20 characters';
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Full description is required';
    } else if (formData.fullDescription.length < 50) {
      newErrors.fullDescription = 'Full description must be at least 50 characters';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.duration || formData.duration < 1) {
      newErrors.duration = 'Duration must be at least 1 hour';
    }

    if (!formData.pricePerPerson || formData.pricePerPerson < 0) {
      newErrors.pricePerPerson = 'Price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/experience', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish experience');
      }

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: 'Experience published successfully!',
        });
        
        // Reset form after successful submission
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          city: '',
          country: 'Indonesia',
          category: 'Cultural',
          duration: 4,
          pricePerPerson: 120,
          coverImageUrl: '',
        });

        // Optional: Redirect after successful submission
        // router.push('/experiences');
        // router.refresh(); // Refresh server components
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to publish experience. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='p-6 pt-40 bg-amber-100'>
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Publish an experience</h1>
      <p className="text-gray-600 mb-6">
        Tell travelers what makes yours unforgettable. All fields are reviewed by our editors before going live.
      </p>

      {submitStatus.type && (
        <div
          className={`mb-4 p-4 rounded-md ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter experience title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
        </div>

        {/* Short Description */}
        <div>
          <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Short description (shown on cards) *
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.shortDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Brief description for card display"
          />
          {errors.shortDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.shortDescription}</p>
          )}
        </div>

        {/* Full Description */}
        <div>
          <label htmlFor="fullDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Full description *
          </label>
          <textarea
            id="fullDescription"
            name="fullDescription"
            rows={5}
            value={formData.fullDescription}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.fullDescription ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Detailed description of the experience"
          />
          {errors.fullDescription && (
            <p className="mt-1 text-sm text-red-500">{errors.fullDescription}</p>
          )}
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City / location *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.city ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter city"
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
              Country *
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.country ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter country"
            />
            {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
          </div>
        </div>

        {/* Category and Duration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
              Duration (hours) *
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              min="1"
              step="0.5"
              value={formData.duration}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.duration ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.duration && <p className="mt-1 text-sm text-red-500">{errors.duration}</p>}
          </div>
        </div>

        {/* Price and Cover Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="pricePerPerson" className="block text-sm font-medium text-gray-700 mb-1">
              Price per person (USD) *
            </label>
            <input
              type="number"
              id="pricePerPerson"
              name="pricePerPerson"
              min="0"
              step="1"
              value={formData.pricePerPerson}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.pricePerPerson ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.pricePerPerson && (
              <p className="mt-1 text-sm text-red-500">{errors.pricePerPerson}</p>
            )}
          </div>

          <div>
            <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
              Cover image URL (optional)
            </label>
            <input
              type="url"
              id="coverImageUrl"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Publishing...' : 'Publish experience'}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default PublishExperience;