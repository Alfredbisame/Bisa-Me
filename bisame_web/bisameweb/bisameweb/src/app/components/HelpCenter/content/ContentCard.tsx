import React from 'react';

interface ContentCardProps {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
  className?: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ 
  icon, 
  title, 
  content, 
  className = '' 
}) => {
  return (
    <div className={`
      bg-gradient-to-br from-white to-gray-50 
      rounded-xl border border-gray-200 
      p-6 shadow-sm hover:shadow-md 
      transition-all duration-300 ease-in-out
      hover:border-orange-200
      group
      ${className}
    `}>
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm border border-gray-100 group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <div className="text-gray-700 leading-relaxed">
            {typeof content === 'string' ? (
              <p>{content}</p>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
      
      {/* Subtle accent line */}
      <div className="mt-4 h-1 bg-gradient-to-r from-orange-200 to-purple-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default ContentCard;
