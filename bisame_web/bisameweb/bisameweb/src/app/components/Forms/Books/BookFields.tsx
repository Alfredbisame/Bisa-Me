import React from "react";
// import KeyBooksDropdown from "./KeyBooksDropdown";
import { FormOptions } from "./interfaces";
import DynamicFormDisplay from "./components/DynamicFormDisplay";

interface BookFieldsProps {
  data: FormOptions[];
  formData: Record<string, string | string[] | (string | string[])[]>;
  handleInputChange: (field: string, value: string | string[]) => void;
}

const BookFields: React.FC<BookFieldsProps> = ({
  data,
  formData,
  handleInputChange,
}) => {
  // const [nameCount, setNameCount] = useState({
  //   bookTitle: 0,
  //   authorName: 0,
  //   publisherName: 0,
  //   genre: 0,
  //   edition: 0,
  //   publicationYear: 0,
  //   condition: 0,
  //   description: 0,
  //   price: 0,
  //   negotiation: 0,
  //   phone: 0,
  // });

  // const handleNameChange = (name: string, value: string) => {
  //   if (value.length <= 60) {
  //     onInputChange(name, value);
  //     setNameCount((prev) => ({ ...prev, [name]: value.length }));
  //   }
  // };

  return (
    <div className="grid grid-cols-2 gap-5">
      <DynamicFormDisplay
        formData={formData}
        data={data}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default BookFields;
