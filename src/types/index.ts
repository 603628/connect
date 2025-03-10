export interface CategoryStructure {
  name: string;
  subcategories: string[];
}

export const CATEGORIES: CategoryStructure[] = [
  {
    name: 'Automotive',
    subcategories: ['Mechanics', 'Car Sales', 'Car Buying Consultation', 'Auto Body Repair']
  },
  {
    name: 'Legal',
    subcategories: ['Tax Advisory', 'Family Law', 'Real Estate Law', 'Business Law', 'Immigration Law']
  },
  {
    name: 'Housing',
    subcategories: ['Real Estate Agents', 'Property Management', 'Home Inspection', 'Interior Design']
  },
  {
    name: 'Healthcare',
    subcategories: ['Primary Care', 'Pediatrics', 'Dentistry', 'Physical Therapy', 'Mental Health']
  },
  {
    name: 'Food & Dining',
    subcategories: ['Restaurants', 'Personal Chefs', 'Catering', 'Nutrition']
  },
  {
    name: 'Financial',
    subcategories: ['Tax Advisory', 'Financial Planning', 'Accounting', 'Investment']
  }
];

export interface Connection {
  name: string;
  role: string;
  imageUrl: string;
  connectionStrength: number; // 1-10 rating of how reliable/responsive the contact is
  lastInteraction: string;
  category: string;
  subcategory: string;
  expertise: string; // Brief description of their specific expertise
}

export interface ConnectionCardProps extends Connection {} 