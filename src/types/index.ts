export interface CategoryStructure {
  id: string;
  name: string;
  subcategories: Array<{
    id: string;
    name: string;
  }>;
}

export const CATEGORIES: CategoryStructure[] = [
  {
    id: 'automotive',
    name: 'Automotive',
    subcategories: [
      { id: 'mechanics', name: 'Mechanics' },
      { id: 'carSales', name: 'Car Sales' },
      { id: 'carBuyingConsultation', name: 'Car Buying Consultation' },
      { id: 'autoBodyRepair', name: 'Auto Body Repair' }
    ]
  },
  {
    id: 'legal',
    name: 'Legal',
    subcategories: [
      { id: 'taxAdvisory', name: 'Tax Advisory' },
      { id: 'familyLaw', name: 'Family Law' },
      { id: 'realEstateLaw', name: 'Real Estate Law' },
      { id: 'businessLaw', name: 'Business Law' },
      { id: 'immigrationLaw', name: 'Immigration Law' }
    ]
  },
  {
    id: 'housing',
    name: 'Housing',
    subcategories: [
      { id: 'realEstateAgents', name: 'Real Estate Agents' },
      { id: 'propertyManagement', name: 'Property Management' },
      { id: 'homeInspection', name: 'Home Inspection' },
      { id: 'interiorDesign', name: 'Interior Design' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    subcategories: [
      { id: 'primaryCare', name: 'Primary Care' },
      { id: 'pediatrics', name: 'Pediatrics' },
      { id: 'dentistry', name: 'Dentistry' },
      { id: 'physicalTherapy', name: 'Physical Therapy' },
      { id: 'mentalHealth', name: 'Mental Health' }
    ]
  },
  {
    id: 'foodAndDining',
    name: 'Food & Dining',
    subcategories: [
      { id: 'restaurants', name: 'Restaurants' },
      { id: 'personalChefs', name: 'Personal Chefs' },
      { id: 'catering', name: 'Catering' },
      { id: 'nutrition', name: 'Nutrition' }
    ]
  },
  {
    id: 'financial',
    name: 'Financial',
    subcategories: [
      { id: 'taxAdvisory', name: 'Tax Advisory' },
      { id: 'financialPlanning', name: 'Financial Planning' },
      { id: 'accounting', name: 'Accounting' },
      { id: 'investment', name: 'Investment' }
    ]
  }
];

export interface Connection {
  name: string;
  role: string;
  imageUrl: string;
  connectionStrength: number; // 1-10 rating of how reliable/responsive the contact is
  lastInteractionAt: string; // ISO 8601 timestamp
  categoryId: string;
  subcategoryId: string;
  expertise: string; // Brief description of their specific expertise
}

export interface ConnectionCardProps extends Connection {} 