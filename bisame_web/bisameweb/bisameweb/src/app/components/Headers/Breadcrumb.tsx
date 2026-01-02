"use client";
import Link from "next/link";
import { FC } from "react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto py-4">
        <nav className="flex items-center text-gray-600 text-sm">
          {/* Home Icon */}
          <i className="fas fa-home mr-2"></i>
          {/* Render Breadcrumb Items */}
          {items.map((item, index) => (
            <span key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  className={`hover:underline ${
                    index === items.length - 1 ? "text-blue-500" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {/* Separator (>) */}
              {index < items.length - 1 && (
                <span className="mx-2">{" > "}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;