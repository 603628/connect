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
    subcategories: ['Family Law', 'Real Estate Law', 'Business Law', 'Immigration Law']
  },
  {
    name: 'Housing',
    subcategories: ['Real Estate Agents', 'Property Management', 'Home Inspection', 'Interior Design']
  },
  {
    name: 'Financial',
    subcategories: ['Tax Advisory', 'Financial Planning', 'Accounting', 'Investment']
  },
  {
    name: 'Healthcare',
    subcategories: ['Primary Care', 'Dentistry', 'Physical Therapy', 'Mental Health']
  },
  {
    name: 'Childcare',
    subcategories: ['Daycare', 'Nanny Services', 'Tutoring', 'Pediatrics']
  },
  {
    name: 'Food & Dining',
    subcategories: ['Restaurants', 'Catering', 'Personal Chefs', 'Nutrition']
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