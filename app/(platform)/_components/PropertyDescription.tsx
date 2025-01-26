import Image from "next/image";
import Link from "next/link";
import propertyImg from "@/public/assests/img/download.jpg";

interface PropertyData {
  id: string;
  name: string;
  price: number;
  description: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  images?: string;
  createdAt: string;
  updatedAt: string;
}

interface Location {
  id: string;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
}

type PropertyType = "VILLA" | "COMMERCIAL" | "APARTMENT" | "HOUSE" | "LAND";

type LocationType = "ADDRESS" | "NEIGHBORHOOD" | "CITY" | "STATE";

const PropertyPopup: React.FC<{
  property: PropertyData;
  isOpen: boolean;
  onClose: () => void;
}> = ({ property, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Popup Container */}
      <div className="bg-white rounded-3xl p-6 relative z-10 shadow-lg transform transition-all duration-300 w-[50%] h-[90%] overflow-y-auto">
        {/* Glowy Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300 via-purple-300 to-pink-300 opacity-30 blur-3xl rounded-3xl"></div>

        <div className="relative z-20">
          {/* Property Image */}
          <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
            <Image
              src={propertyImg}
              alt={property.name}
              layout="fill"
              className="object-fill"
            />
          </div>

          {/* Property Name */}
          <h2 className="text-3xl font-bold mb-2">{property.name}</h2>

          {/* Property Price */}
          <p className="text-xl text-green-600 mb-4">
            ${property.price.toLocaleString()}
          </p>

          {/* Property Description */}
          <p className="text-gray-700 mb-4">{property.description}</p>

          {/* Property Details */}
          <div className="mb-4">
            <p>
              <strong>Bedrooms:</strong> {property.bedrooms}
            </p>
            <p>
              <strong>Bathrooms:</strong> {property.bathrooms}
            </p>
            <p>
              <strong>Square Feet:</strong>{" "}
              {property.squareFeet.toLocaleString()} sqft
            </p>
            <p>
              <strong>Property Type:</strong> {property.propertyType}
            </p>
          </div>

          <div className="flex gap-4">
            <Link href={`/edit/${property.id}`}>
              <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300">
                Edit
              </button>
            </Link>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPopup;