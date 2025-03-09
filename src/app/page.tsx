import ConnectionCard from '@/components/ConnectionCard';
import { Connection } from '@/types';
import React from 'react';

const sampleConnections: Connection[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    connectionStrength: 8,
    lastInteraction: "2 days ago"
  },
  {
    name: "Michael Chen",
    role: "Software Engineer",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    connectionStrength: 6,
    lastInteraction: "1 week ago"
  },
  {
    name: "Emma Wilson",
    role: "UX Designer",
    imageUrl: "https://i.pravatar.cc/150?img=3",
    connectionStrength: 9,
    lastInteraction: "3 days ago"
  }
];

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect</h1>
        <p className="text-lg text-gray-600">Stay connected with your community</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleConnections.map((connection) => (
          <ConnectionCard
            key={connection.name}
            {...connection}
          />
        ))}
      </section>
    </div>
  )
}
