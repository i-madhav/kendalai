import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

interface PropertyFormData {
  name: string;
  price: number;
  description: string;
  propertyType: "APARTMENT" | "VILLA" | "HOUSE" | "COMMERCIAL" | "LAND";
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images: string;
}

export default function PropertyForm({
  setShowPropertyForm,
}: {
  setShowPropertyForm: (show: boolean) => void;
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<PropertyFormData>({
    name: "",
    price: 0,
    description: "",
    propertyType: "APARTMENT",
    bedrooms: 0,
    bathrooms: 0,
    squareFeet: 0,
    images: "",
  });
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<
    Partial<Record<keyof PropertyFormData, string>>
  >({});
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "" ? 0 : parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (name === "images") {
        setImagePreview(value);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof PropertyFormData, string>> = {};
    if (!formData.name) newErrors.name = "Property name is required";
    if (formData.price <= 0) newErrors.price = "Price must be positive";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (formData.bedrooms < 0) newErrors.bedrooms = "Must be 0 or more";
    if (formData.bathrooms < 0) newErrors.bathrooms = "Must be 0 or more";
    if (formData.squareFeet <= 0)
      newErrors.squareFeet = "Must be greater than 0";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const propertyData = {
        name: formData.name,
        price: formData.price,
        description: formData.description,
        propertyType: formData.propertyType,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        squareFeet: formData.squareFeet,
        images: formData.images,
      };

      try {
        setLoading(true);
        const response = await fetch("/api/create-property", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ propertyData }),
        });

        if (!response.ok) {
          throw new Error("Failed to create property");
        }

        router.push("/home");
      } catch (error) {
        console.error("Error creating property:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => setShowPropertyForm(false)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Back
        </button>
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 via-fuchsia-600 to-pink-600 text-transparent bg-clip-text animate-gradient">
          Add Property Information
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-white/20"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-indigo-900"
          >
            Property Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
          />
          {errors.name && (
            <span className="text-pink-600 text-sm mt-1">{errors.name}</span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-semibold text-indigo-900"
            >
              Price
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-indigo-500 sm:text-sm">$</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                className="pl-7 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
              />
            </div>
            {errors.price && (
              <span className="text-pink-600 text-sm mt-1">{errors.price}</span>
            )}
          </div>

          <div>
            <label
              htmlFor="propertyType"
              className="block text-sm font-semibold text-indigo-900"
            >
              Property Type
            </label>
            <select
              id="propertyType"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
            >
              <option value="APARTMENT">🏢 Apartment</option>
              <option value="VILLA">🏘️ Villa</option>
              <option value="HOUSE">🏠 House</option>
              <option value="COMMERCIAL">🏪 Commercial</option>
              <option value="LAND">🌳 Land</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-semibold text-indigo-900"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50"
          />
          {errors.description && (
            <span className="text-pink-600 text-sm mt-1">
              {errors.description}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-semibold text-indigo-900"
            >
              Bedrooms
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-indigo-500">🛏️</span>
              </div>
              <input
                type="number"
                id="bedrooms"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                className="pl-8 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
              />
            </div>
            {errors.bedrooms && (
              <span className="text-pink-600 text-sm mt-1">
                {errors.bedrooms}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="bathrooms"
              className="block text-sm font-semibold text-indigo-900"
            >
              Bathrooms
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-indigo-500">🚿</span>
              </div>
              <input
                type="number"
                id="bathrooms"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                className="pl-8 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
              />
            </div>
            {errors.bathrooms && (
              <span className="text-pink-600 text-sm mt-1">
                {errors.bathrooms}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="squareFeet"
              className="block text-sm font-semibold text-indigo-900"
            >
              Square Feet
            </label>
            <div className="mt-1 relative rounded-lg shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-indigo-500">📏</span>
              </div>
              <input
                type="number"
                id="squareFeet"
                name="squareFeet"
                value={formData.squareFeet}
                onChange={handleChange}
                step="0.01"
                className="pl-8 block w-full rounded-lg shadow-sm focus:ring-2 border border-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
              />
            </div>
            {errors.squareFeet && (
              <span className="text-pink-600 text-sm mt-1">
                {errors.squareFeet}
              </span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="images"
            className="block text-sm font-semibold text-indigo-900"
          >
            Image URL
          </label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="Paste image URL here"
            className="mt-1 block w-full rounded-lg border border-indigo-500 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-white/50 p-3"
          />
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Property preview"
                className="max-w-full h-auto rounded-lg shadow-md"
                onError={() => setImagePreview("")}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-indigo-600 hover:via-fuchsia-600 hover:to-pink-600 transform hover:scale-[1.02] transition-all duration-200 font-semibold shadow-lg hover:shadow-indigo-500/25 relative"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
              Submitting...
            </div>
          ) : (
            "Submit Property"
          )}
        </button>
      </form>
    </div>
  );
}
