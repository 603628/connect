'use client';

import ConnectionCard from '@/components/ConnectionCard';
import { Connection, CATEGORIES } from '@/types';
import React from 'react';

const sampleConnections: Connection[] = [
  {
    name: "Mike Rodriguez",
    role: "Master Mechanic",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    connectionStrength: 9,
    lastInteraction: "2 days ago",
    category: "Automotive",
    subcategory: "Mechanics",
    expertise: "European car specialist, 15 years experience with BMW and Mercedes"
  },
  {
    name: "Sarah Chen",
    role: "Tax Attorney",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    connectionStrength: 8,
    lastInteraction: "1 week ago",
    category: "Legal",
    subcategory: "Tax Advisory",
    expertise: "International tax law and small business taxation"
  },
  {
    name: "James Wilson",
    role: "Real Estate Agent",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    connectionStrength: 9,
    lastInteraction: "3 days ago",
    category: "Housing",
    subcategory: "Real Estate Agents",
    expertise: "Luxury homes and investment properties"
  },
  {
    name: "Dr. Emily Thompson",
    role: "Pediatrician",
    imageUrl: "https://i.pravatar.cc/150?img=4",
    connectionStrength: 10,
    lastInteraction: "1 day ago",
    category: "Healthcare",
    subcategory: "Pediatrics",
    expertise: "Newborn care specialist, developmental pediatrics"
  },
  {
    name: "David Kim",
    role: "Personal Chef",
    imageUrl: "https://i.pravatar.cc/150?img=5",
    connectionStrength: 7,
    lastInteraction: "5 days ago",
    category: "Food & Dining",
    subcategory: "Personal Chefs",
    expertise: "Asian fusion cuisine, dietary restrictions specialist"
  }
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<string>('All');

  const filteredConnections = sampleConnections.filter(connection => {
    if (selectedCategory === 'All') return true;
    if (selectedSubcategory === 'All') return connection.category === selectedCategory;
    return connection.category === selectedCategory && connection.subcategory === selectedSubcategory;
  });

  const currentSubcategories = selectedCategory === 'All' 
    ? []
    : CATEGORIES.find(cat => cat.name === selectedCategory)?.subcategories || [];

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect</h1>
        <p className="text-lg text-gray-600">Your trusted network of service providers</p>
      </header>

      <div className="space-y-4">
        {/* Main categories */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubcategory('All');
            }}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === 'All'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Services
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                setSelectedSubcategory('All');
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Subcategories */}
        {selectedCategory !== 'All' && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedSubcategory === 'All'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All {selectedCategory}
            </button>
            {currentSubcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-3 py-1 text-sm rounded-full ${
                  selectedSubcategory === sub
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConnections.map((connection) => (
          <ConnectionCard
            key={connection.name}
            {...connection}
          />
        ))}
      </section>
    </div>
  );
}
