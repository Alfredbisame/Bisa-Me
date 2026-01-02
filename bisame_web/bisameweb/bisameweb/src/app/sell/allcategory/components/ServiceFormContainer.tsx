"use client";

// Unified form: combine initial category/location/image selection with category-specific fields
import UnifiedPostForm from "./UnifiedPostForm";
import FormContext from "@/app/components/Forms/Foods/context/FormContext";

/**
 * Container component for the unified post form
 */
const ServiceFormContainer = () => {
  return (
    <div className="service-form-container">
      <FormContext>
        <UnifiedPostForm />
      </FormContext>
    </div>
  );
};

export default ServiceFormContainer;
