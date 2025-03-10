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
    id: 'beauty',
    name: 'Beauty',
    subcategories: [
      { id: 'hairdressers', name: 'Hairdressers' },
      { id: 'nailSalons', name: 'Nail Salons' },
      { id: 'makeup', name: 'Makeup' },
      { id: 'skinCare', name: 'Skin Care' },
      { id: 'massage', name: 'Massage' }
    ]
  },
  {
    id: 'childcare',
    name: 'Childcare',
    subcategories: [
      { id: 'babysitting', name: 'Babysitting' },
      { id: 'partyAnimators', name: 'Party Animators' },
      { id: 'tutoring', name: 'Tutoring' },
      { id: 'daycare', name: 'Daycare' }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    subcategories: [
      { id: 'languageCourses', name: 'Language Courses' },
      { id: 'drivingSchools', name: 'Driving Schools' },
      { id: 'musicLessons', name: 'Music Lessons' },
      { id: 'artClasses', name: 'Art Classes' }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'phoneRepair', name: 'Phone Repair' },
      { id: 'computerRepair', name: 'Computer Repair' },
      { id: 'tvRepair', name: 'TV Repair' },
      { id: 'applianceRepair', name: 'Appliance Repair' }
    ]
  },
  {
    id: 'events',
    name: 'Events',
    subcategories: [
      { id: 'photographers', name: 'Photographers' },
      { id: 'videographers', name: 'Videographers' },
      { id: 'eventPlanners', name: 'Event Planners' },
      { id: 'catering', name: 'Catering' }
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
  },
  {
    id: 'foodAndDining',
    name: 'Food & Dining',
    subcategories: [
      { id: 'restaurants', name: 'Restaurants' },
      { id: 'personalChefs', name: 'Personal Chefs' },
      { id: 'bakeries', name: 'Bakeries' },
      { id: 'nutrition', name: 'Nutrition' }
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
    id: 'legal',
    name: 'Legal',
    subcategories: [
      { id: 'familyLaw', name: 'Family Law' },
      { id: 'realEstateLaw', name: 'Real Estate Law' },
      { id: 'businessLaw', name: 'Business Law' },
      { id: 'immigrationLaw', name: 'Immigration Law' }
    ]
  },
  {
    id: 'moving',
    name: 'Moving',
    subcategories: [
      { id: 'localMoving', name: 'Local Moving' },
      { id: 'internationalMoving', name: 'International Moving' },
      { id: 'storage', name: 'Storage' },
      { id: 'packingServices', name: 'Packing Services' }
    ]
  },
  {
    id: 'telecom',
    name: 'Telecom',
    subcategories: [
      { id: 'internetProviders', name: 'Internet Providers' },
      { id: 'mobileProviders', name: 'Mobile Providers' },
      { id: 'tvProviders', name: 'TV Providers' },
      { id: 'networkInstallation', name: 'Network Installation' }
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