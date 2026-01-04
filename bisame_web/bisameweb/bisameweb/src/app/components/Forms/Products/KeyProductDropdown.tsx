import React, { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useFetchServiceOptions from "@/app/components/Forms/Services/UnifiedService/hooks/useFetchServiceOptions";
import { useSearchParams } from "next/navigation";

interface KeyServiceDropdownProps {
  selectedServices?: string[];
  onServicesChange: (services: string[]) => void;
  disabled?: boolean;
  required?: boolean;
  category: string;
  subCategory: string;
  // selectedService?: ServiceSelection | null; // unused variable
}

const KeyProductDropdown: React.FC<KeyServiceDropdownProps> = ({
  selectedServices,
  onServicesChange,
  disabled = false,
  required = false,
  category,
  subCategory,
  // selectedService = null, // unused variable
}) => {
  const SearchParams = useSearchParams();
  const categoryParams = category ?? SearchParams.get("category");
  const subCategoryParams = subCategory ?? SearchParams.get("subCategory");
  // const category = SearchParams.get("category") as string;
  // const subCategory = SearchParams.get("subCategory") as string;

  const { data, error, isLoading } = useFetchServiceOptions({
    category: categoryParams,
    subCategory: subCategoryParams,
  });

  console.log(data);

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    if (!disabled) {
      setOpenDropdown(!openDropdown);
    }
  };

  const handleServiceToggle = (service: string) => {
    const current = selectedServices || [];
    if (current.includes(service)) {
      onServicesChange(current.filter((s) => s !== service));
    } else {
      onServicesChange([...current, service]);
    }
  };

  const getDisplayText = () => {
    if (selectedServices && selectedServices.length > 0) {
      if (selectedServices.length <= 4) {
        return selectedServices.join(", ");
      } else {
        return `${selectedServices.slice(0, 4).join(", ")} +${
          selectedServices.length - 4
        } more`;
      }
    }
    return `Product Type${required ? "*" : ""}`;
  };

  if (!categoryParams && !subCategoryParams) {
    return (
      <button
        type="button"
        disabled
        className="w-full border border-blue-200 rounded-md p-2 text-blue-300 bg-blue-50 cursor-not-allowed flex items-center justify-between"
      >
        <span>Please select a service category first</span>
        <ChevronDownIcon className="w-4 h-4 text-blue-300" />
      </button>
    );
  }

  if (isLoading) {
    return (
      <button
        type="button"
        disabled
        className="w-full border border-blue-200 rounded-md p-2 text-blue-300 bg-blue-50 cursor-not-allowed flex items-center justify-between"
      >
        <span>Loading product type...</span>
        <ChevronDownIcon className="w-4 h-4 text-blue-300" />
      </button>
    );
  }

  if (error) {
    return (
      <button
        type="button"
        disabled
        className="w-full border border-red-200 rounded-md p-2 text-red-300 bg-red-50 cursor-not-allowed flex items-center justify-between"
      >
        <span>Error loading products keywords</span>
        <ChevronDownIcon className="w-4 h-4 text-red-300" />
      </button>
    );
  }

  // const availableServices = data?.options || [];

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={handleDropdownToggle}
        disabled={disabled}
        className={`w-full border rounded-md text-base font-normal p-2 flex items-center justify-between transition-all duration-200 min-h-[48px] ${
          disabled
            ? "border-blue-200 text-blue-300 bg-blue-50 cursor-not-allowed"
            : "border-blue-300 text-[#6b8ba6] bg-white hover:border-orange-400 hover:bg-orange-50 hover:shadow-md transform hover:-translate-y-0.5 cursor-pointer"
        }`}
        aria-label="Select Products Keywords"
      >
        <span className="flex flex-nowrap gap-1 items-center max-w-full overflow-hidden">
          {selectedServices && selectedServices.length > 0 ? (
            <>
              {selectedServices.slice(0, 4).map((service) => (
                <span
                  key={service}
                  className="flex items-center bg-orange-100 text-orange-700 border border-orange-300 rounded-full px-2 py-0.5 text-xs mr-1 whitespace-nowrap max-w-[90px] overflow-hidden text-ellipsis"
                  style={{ maxWidth: "90px" }}
                >
                  <span className="truncate">{service}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleServiceToggle(service);
                    }}
                    className="ml-1 text-orange-500 hover:text-orange-700 cursor-pointer flex items-center"
                    tabIndex={0}
                    aria-label={`Remove ${service}`}
                    role="button"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleServiceToggle(service);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </span>
                </span>
              ))}
              {selectedServices.length > 4 && (
                <span className="text-xs text-[#6b8ba6] whitespace-nowrap">
                  +{selectedServices.length - 4} more
                </span>
              )}
            </>
          ) : (
            <span className="text-[#6b8ba6]">{getDisplayText()}</span>
          )}
        </span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${
            openDropdown ? "rotate-180" : ""
          } ${disabled ? "text-blue-300" : "text-[#6b8ba6]"}`}
        />
      </button>
      {data && data?.length > 0 && openDropdown && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-blue-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {data.map((service: string) => (
            <label
              key={service}
              className="flex items-center px-4 py-2 hover:bg-orange-50 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedServices && selectedServices.includes(service)}
                onChange={() => handleServiceToggle(service)}
                className="mr-2 accent-orange-500"
              />
              <span className="text-[#6b8ba6]">{service}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default KeyProductDropdown;
