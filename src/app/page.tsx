'use client';

import ConnectionCard from '@/components/ConnectionCard';
import { Connection, CATEGORIES } from '@/types';
import React from 'react';

type SortOption = 'name' | 'lastInteraction' | 'connectionStrength';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'lastInteraction', label: 'Last Interaction' },
  { value: 'connectionStrength', label: 'Reliability Score' },
];

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
  const [searchQuery, setSearchQuery] = React.useState('');
  const [sortBy, setSortBy] = React.useState<SortOption>('name');
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const filteredAndSortedConnections = React.useMemo(() => {
    return sampleConnections
      // First, apply text search across all items
      .filter(connection => {
        if (!searchQuery) return true;
        const searchLower = searchQuery.toLowerCase();
        return (
          connection.name.toLowerCase().includes(searchLower) ||
          connection.role.toLowerCase().includes(searchLower) ||
          connection.expertise.toLowerCase().includes(searchLower)
        );
      })
      // Then apply category filters
      .filter(connection => {
        if (selectedCategory === 'All') return true;
        if (selectedSubcategory === 'All') return connection.category === selectedCategory;
        return connection.category === selectedCategory && connection.subcategory === selectedSubcategory;
      })
      // Finally sort
      .sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'connectionStrength':
            return b.connectionStrength - a.connectionStrength;
          case 'lastInteraction':
            return a.lastInteraction.localeCompare(b.lastInteraction);
          default:
            return 0;
        }
      });
  }, [searchQuery, selectedCategory, selectedSubcategory, sortBy]);

  const currentSubcategories = selectedCategory === 'All' 
    ? []
    : CATEGORIES.find(cat => cat.name === selectedCategory)?.subcategories || [];

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-screen bg-white shadow-lg z-20 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="w-64 h-full p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-900">Categories</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ←
            </button>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSubcategory('All');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg ${
                selectedCategory === 'All'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Services
            </button>
            {CATEGORIES.map((category) => (
              <div key={category.name} className="space-y-1">
                <button
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedSubcategory('All');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
                {selectedCategory === category.name && (
                  <div className="ml-4 space-y-1">
                    <button
                      onClick={() => setSelectedSubcategory('All')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                        selectedSubcategory === 'All'
                          ? 'bg-green-500 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      All {category.name}
                    </button>
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${
                          selectedSubcategory === sub
                            ? 'bg-green-500 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle sidebar button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className={`fixed left-4 top-4 z-30 bg-white p-2 rounded-lg shadow-lg border border-gray-200 text-gray-500 hover:text-gray-700 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        →
      </button>

      {/* Main content */}
      <div className={`transition-all duration-300 ease-in-out ${isSidebarOpen ? 'pl-64' : 'pl-0'}`}>
        <header className="text-center py-8 bg-white border-b">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect</h1>
          <p className="text-lg text-gray-600">Your trusted network of service providers</p>
        </header>

        <div className="max-w-7xl mx-auto px-4">
          {/* Search bar */}
          <div className="py-6">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name, role, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 px-4 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 text-xl"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Results count and Sort */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-gray-600">
              Found {filteredAndSortedConnections.length} connections
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {filteredAndSortedConnections.map((connection) => (
              <ConnectionCard
                key={connection.name}
                {...connection}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
