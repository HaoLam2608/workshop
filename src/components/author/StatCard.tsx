import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  onClick, 
  isActive = false 
}) => {
  return (
    <div 
      className={`p-6 rounded-lg transition-all duration-200 ${
        onClick ? 'cursor-pointer' : ''
      } ${
        isActive 
          ? 'bg-blue-500 text-white shadow-lg transform scale-105' 
          : 'bg-white shadow hover:shadow-md hover:-translate-y-1'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm font-medium ${
            isActive ? 'text-blue-100' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`text-2xl font-bold ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}>
            {value}
          </p>
        </div>
        <div className={`transition-colors duration-200 ${
          isActive ? 'text-blue-100' : 'text-gray-400'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;