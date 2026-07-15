"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface ExperienceFormData {
  country: string;
  catagory: string;
  image: string;
  rating: number;
  title: string;
  subTitle: string;
  experience: string;
  price: number;
  email: string;
}

interface FormErrors {
  country?: string;
  catagory?: string;
  image?: string;
  rating?: string;
  title?: string;
  subTitle?: string;
  experience?: string;
  price?: string;
  email?: string;
}

const PublishExperience: React.FC = () => {
  const router = useRouter();

  // Better Auth session
const { data: session } = authClient.useSession();

const [token, setToken] = useState<string>("");

useEffect(() => {
    async function getToken() {
      const { data, error } = await authClient.token();

      if (error) {
        console.error("Failed to get token:", error);
        return;
      }

      if (data) {
        const jwtToken = data.token;
        setToken(jwtToken);
      }
    }
    getToken();
  }, []);

  const [formData, setFormData] = useState<ExperienceFormData>({
    country: "Indonesia",
    catagory: "Culture",
    image: "",
    rating: 0,
    title: "",
    subTitle: "",
    experience: "",
    price: 0,
    email: "",
  });


  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });


  // Set user email from session
  useEffect(() => {
    if (session?.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: session.user.email,
      }));
    }
  }, [session]);


  const categories = [
    "Culture",
    "Adventure",
    "Foods",
    "wildlife",
    "City Break",
    "Wellness",
  ];



  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    const { name, value, type } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : value,
    }));


    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };



  const validateForm = (): boolean => {

    const newErrors: FormErrors = {};


    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }


    if (!formData.subTitle.trim()) {
      newErrors.subTitle = "Subtitle is required";
    }


    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }


    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }


    if (!formData.catagory.trim()) {
      newErrors.catagory = "Category is required";
    }


    if (!formData.image.trim()) {
      newErrors.image = "Image URL is required";
    }


    if (
      formData.rating < 1 ||
      formData.rating > 5
    ) {
      newErrors.rating =
        "Rating must be between 1 and 5";
    }


    if (formData.price <= 0) {
      newErrors.price =
        "Price must be greater than 0";
    }


    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };



const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (!session) {
    setSubmitStatus({
      type: "error",
      message: "Please login first",
    });
    return;
  }

  if (!token) {
    setSubmitStatus({
      type: "error",
      message: "Authentication token missing",
    });
    return;
  }

  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/experience`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
          price: Number(formData.price),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to publish experience"
      );
    }

    setSubmitStatus({
      type: "success",
      message: "Experience published successfully!",
    });

    setFormData({
      country: "Indonesia",
      catagory: "Culture",
      image: "",
      rating: 0,
      title: "",
      subTitle: "",
      experience: "",
      price: 0,
      email: session.user.email,
    });

  } catch (error) {
    setSubmitStatus({
      type: "error",
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className='p-6 pt-40 bg-amber-50'>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Publish an experience</h1>
        <p className="text-gray-600 mb-6">
          Tell travelers what makes yours unforgettable. All fields are reviewed by our editors before going live.
        </p>

        {submitStatus.type && (
          <div
            className={`mb-4 p-4 rounded-md ${submitStatus.type === 'success'
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border rounded-md"
              placeholder="Enter experience title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>


          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle *
            </label>
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border rounded-md"
              placeholder="Short subtitle"
            />
            {errors.subTitle && (
              <p className="text-red-500 text-sm mt-1">{errors.subTitle}</p>
            )}
          </div>


          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Description *
            </label>

            <textarea
              name="experience"
              rows={5}
              value={formData.experience}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border rounded-md"
              placeholder="Describe the experience"
            />

            {errors.experience && (
              <p className="text-red-500 text-sm mt-1">
                {errors.experience}
              </p>
            )}
          </div>


          {/* Country and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>

              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
                placeholder="Country"
              />

              {errors.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.country}
                </p>
              )}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>

              <select
                name="catagory"
                value={formData.catagory}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {errors.catagory && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.catagory}
                </p>
              )}
            </div>

          </div>



          {/* Image and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>

              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
                placeholder="https://example.com/image.jpg"
              />

              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image}
                </p>
              )}
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>

              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
              />

              {errors.rating && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.rating}
                </p>
              )}
            </div>

          </div>



          {/* Price and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>

              <input
                type="number"
                name="price"
                min="1"
                value={formData.price}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price}
                </p>
              )}
            </div>



            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full text-gray-700 px-4 py-2 border rounded-md"
                placeholder="admin@example.com"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

          </div>



          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-3 bg-[#154b4e] text-white font-semibold rounded-md hover:bg-orange-500 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : "Publish experience"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default PublishExperience;