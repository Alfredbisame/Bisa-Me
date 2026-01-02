import { CategoryData } from './types';

export const defaultCategories: CategoryData[] = [
  {
    id: 'services',
    name: 'Services',
    description: 'Find artisans and other service providers',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/70c208e4-4231-48cf-0193-9b52ee1f222d.jpg',
    borderColor: '#f97316',
    textColor: '#f97316',
    subcategories: [
      { id: 'plumbing-electrical', name: 'Plumbing & Electrical', description: 'Professional plumbing and electrical services' },
      { id: 'home-cleaning', name: 'Home Cleaning', description: 'House cleaning and maintenance services' },
      { id: 'personal-training', name: 'Personal Training', description: 'Fitness and wellness training' },
      { id: 'graphic-design', name: 'Graphic Design', description: 'Creative design and branding services' },
      { id: 'event-planning', name: 'Event Planning', description: 'Event organization and management' },
      { id: 'catering', name: 'Catering Services', description: 'Food and beverage services for events' },
      { id: 'photography', name: 'Photography', description: 'Professional photography services' },
      { id: 'tutoring', name: 'Tutoring', description: 'Educational and academic support' }
    ],
    childCategories: [
      { id: 'emergency-repairs', name: 'Emergency Repairs', description: '24/7 emergency service calls' },
      { id: 'scheduled-maintenance', name: 'Scheduled Maintenance', description: 'Regular maintenance services' },
      { id: 'consultations', name: 'Consultations', description: 'Professional advice and planning' },
      { id: 'installation', name: 'Installation', description: 'Equipment and system installation' },
      { id: 'repair-services', name: 'Repair Services', description: 'General repair and maintenance' }
    ]
  },
  {
    id: 'buy-sell',
    name: 'Buy & Sell',
    description: 'Find Unlimited products here to buy',
    imageUrl: 'https://storage.googleapis.com/a1aa/image/ceed5cad-7609-461a-083b-af162d108ae5.jpg',
    borderColor: '#2563eb',
    textColor: '#2563eb',
    subcategories: [
      { id: 'electronics-gadgets', name: 'Electronics & Gadgets', description: 'Latest technology and devices' },
      { id: 'fashion-apparel', name: 'Fashion & Apparel', description: 'Clothing, shoes, and accessories' },
      { id: 'home-garden', name: 'Home & Garden', description: 'Home improvement and gardening' },
      { id: 'vehicles-accessories', name: 'Vehicles & Accessories', description: 'Cars, bikes, and vehicle parts' },
      { id: 'sports-outdoors', name: 'Sports & Outdoors', description: 'Sports equipment and outdoor gear' },
      { id: 'books-media', name: 'Books & Media', description: 'Books, movies, and entertainment' },
      { id: 'toys-games', name: 'Toys & Games', description: 'Children toys and board games' },
      { id: 'collectibles', name: 'Collectibles', description: 'Rare items and collectibles' }
    ],
    childCategories: [
      { id: 'new-items', name: 'New Items', description: 'Brand new products' },
      { id: 'used-items', name: 'Used Items', description: 'Pre-owned products in good condition' },
      { id: 'vintage-items', name: 'Vintage Items', description: 'Classic and vintage products' },
      { id: 'bulk-purchases', name: 'Bulk Purchases', description: 'Wholesale and bulk buying options' },
      { id: 'auction-items', name: 'Auction Items', description: 'Items available for bidding' }
    ]
  }
];

export const getCategoryById = (id: string): CategoryData | undefined => {
  return defaultCategories.find(category => category.id === id);
};

export const getSubcategoryById = (categoryId: string, subcategoryId: string) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories.find(sub => sub.id === subcategoryId);
};

export const getChildCategoryById = (categoryId: string, childCategoryId: string) => {
  const category = getCategoryById(categoryId);
  return category?.childCategories?.find(child => child.id === childCategoryId);
}; 