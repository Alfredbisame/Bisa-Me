"use client";
import { useState } from "react";
import TradeAssuranceProductCard from "./TradeAssuranceProductCard";
import ProductsHeader from "../SavedProducts/SavedProductsHeader";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  location: string;
  image: string;
  imageAlt: string;
  isAdminEnabled?: boolean;
}

const TradeAssuranceProducts = () => {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Laptop HP",
      description: "HP Elitebook 840 G3\nIntel ® Core ™ i5 - 6300U.",
      price: "GH₵3350",
      location: "Eastern, New-Juaben Municipal",
      image:
        "https://storage.googleapis.com/a1aa/image/971685fe-0cfd-4742-38be-5997a58c54ab.jpg",
      imageAlt:
        "Hand holding an HP Elitebook 840 G3 laptop with screen showing a video call",
      isAdminEnabled: false,
    },
    {
      id: "2",
      name: "Samsung Galaxy",
      description: "Latest model with AMOLED display\n128GB storage, 8GB RAM.",
      price: "GH₵2500",
      location: "Greater Accra, Accra Central",
      image:
        "https://storage.googleapis.com/a1aa/image/017c3a90-676e-4e43-dbdf-2135d907cda1.jpg",
      imageAlt:
        "Front view of a Samsung Galaxy smartphone with a colorful screen",
      isAdminEnabled: true,
    },
    {
      id: "3",
      name: "Sony Headphones",
      description: "WH-1000XM4 Wireless Noise Cancelling\nOver-ear headphones.",
      price: "GH₵1200",
      location: "Ashanti, Kumasi Metropolitan",
      image:
        "https://storage.googleapis.com/a1aa/image/7daef0d0-ed90-4f41-0159-96a8e7e936fd.jpg",
      imageAlt:
        "Side view of a Sony WH-1000XM4 wireless noise cancelling headphones in black",
      isAdminEnabled: false,
    },
    {
      id: "4",
      name: "Canon DSLR",
      description: "EOS 80D with 18-135mm lens\nHigh resolution photography.",
      price: "GH₵4500",
      location: "Volta, Ho Municipal",
      image:
        "https://storage.googleapis.com/a1aa/image/2acba102-8c0e-4af2-10e9-ab4297b993ee.jpg",
      imageAlt: "Image of a Canon EOS DSLR camera with lens",
      isAdminEnabled: true,
    },
    {
      id: "5",
      name: "Nike Running Shoe",
      description: "Lightweight and breathable\nPerfect for daily runs.",
      price: "GH₵600",
      location: "Central, Cape Coast",
      image:
        "https://storage.googleapis.com/a1aa/image/6d778a62-e02f-4cf9-7aa0-6f7762d81c84.jpg",
      imageAlt: "Image of a Nike running shoe in white and black",
      isAdminEnabled: false,
    },
    {
      id: "6",
      name: "Samsung Smart TV",
      description: "55 inch 4K UHD display\nSmart apps and streaming.",
      price: "GH₵3800",
      location: "Western, Takoradi",
      image:
        "https://storage.googleapis.com/a1aa/image/4c9a5d85-2140-4b04-ee32-7b52b2b1c674.jpg",
      imageAlt: "Image of a Samsung 55 inch smart TV showing a colorful screen",
      isAdminEnabled: true,
    },
  ]);

  const handlePaymentClick = (productId: string) => {
    console.log("Payment initiated for product:", productId);
    // Handle payment logic here
  };

  //   const handleDisableClick = (productId: string) => {
  //     console.log('Product disabled:', productId);
  //     // Handle disable logic here
  //   };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <ProductsHeader
        header="Trade Assurance"
        description="Want to keep your money safe until your order arrives just right. Shop confidently knowing every purchase is protected"
      />

      {/* Cards container */}
      <main className="p-4 flex justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <TradeAssuranceProductCard
              key={product.id}
              product={product}
              onPaymentClick={handlePaymentClick}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default TradeAssuranceProducts;
