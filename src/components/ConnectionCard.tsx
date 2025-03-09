import { ConnectionCardProps } from '@/types';
import React from 'react';

export default function ConnectionCard({
  name,
  role,
  imageUrl,
  connectionStrength,
  lastInteraction,
}: ConnectionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="relative w-16 h-16">
          <img
            src={imageUrl}
            alt={`${name}'s profile`}
            className="rounded-full object-cover w-full h-full"
          />
          <div 
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
              ${connectionStrength >= 7 ? 'bg-green-500' : 
                connectionStrength >= 4 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
          />
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Last interaction: {lastInteraction}
        </p>
      </div>
    </div>
  );
} 