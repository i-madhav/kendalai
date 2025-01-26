"use client"
import React, { useRef, useState } from "react";
import { useJsApiLoader , Autocomplete} from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import { setAddress, setNeighborhood } from "@/app/(service)/store/slice/PropertyInformation";
import Link from "next/link";

interface FormData {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
}

const UpdateGetAddress = ({setShowPropertyForm}: {setShowPropertyForm: (show: boolean) => void}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [searchResult, setSearchResult] = useState<google.maps.places.Autocomplete | null>(null);
  const dispatch = useDispatch();
    /** @type React.MutableRefObject<HTMLInputElement> */
    const searchRef = useRef<HTMLInputElement>(null);
  const inputs = [
    { placeholder: "Address", label: "Enter Property address?" , name: "address"},
    { placeholder: "Neighbourhood", label: "Enter Property neighbourhood?" , name: "neighborhood"}
  ];
  const [formData, setFormData] = useState<FormData>({
    address: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("This is the form data");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onPlaceChanged = () => {
    if (searchRef.current) {
      const autocomplete = searchResult as google.maps.places.Autocomplete;
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        const currentField = inputs[currentStep].name;
        console.log('Selected place:', place);
        if(currentField === "address"){
          dispatch(setAddress({lat: lat!, lng: lng!, name:place.formatted_address!}));
        }else if(currentField === "neighborhood"){
          dispatch(setNeighborhood({lat: lat!, lng: lng!, name:place.formatted_address!}));
        }
      }
    }
  };


  const isLastInput = currentStep === inputs.length - 1;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 w-1/2 mx-auto p-6">
      <div className="relative w-full">
        <Link
          href="/"
          className="absolute -top-10 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:scale-110 hover:shadow-lg transition-all duration-200"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 text-gray-600"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Link>

        <div className="flex flex-col items-center gap-4 w-full">
          <h3 className="text-lg font-medium text-gray-700">
            {inputs[currentStep].label}
          </h3>     
          <Autocomplete
            onLoad={(autocomplete) => setSearchResult(autocomplete)}
            onPlaceChanged={onPlaceChanged}
            className="w-full"
          >
          <input
            ref={searchRef}
            type="text"
            placeholder={inputs[currentStep].placeholder}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg outline-none text-base transition-all duration-300 focus:border-blue-400 focus:shadow-[0_0_8px_rgba(0,170,255,0.6)]"
            value={formData[inputs[currentStep].name as keyof FormData]}
            name={inputs[currentStep].name}
            onChange={(e) => {handleChange(e)}} 
            required
          />
          </Autocomplete>

          <div className="flex justify-between w-full mt-4">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Previous
              </button>
            )}
            
            {currentStep < inputs.length - 1 && (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 ml-auto"
              >
                Next
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-5 h-5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
            )}
          </div>

          {isLastInput && (
            <button
              onClick={() => setShowPropertyForm(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Go Forward
            </button>
          )}
        </div>
      </div>
    </div> 
  );
};

export default UpdateGetAddress;
