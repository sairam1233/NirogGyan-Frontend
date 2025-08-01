import React from 'react';
import { Star, MapPin, Clock, Award } from 'lucide-react';
import { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onClick: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onClick }) => {
  // Get initials from doctor's name
  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
    >
      <div className="p-4 flex flex-col sm:flex-row gap-4">
        {/* Avatar */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-700 text-lg font-bold">
          {getInitials(doctor.name)}
          <span
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              doctor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
            }`}
          ></span>
        </div>

        {/* Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-3">
            <div className="flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>{doctor.experience}+ yrs</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>{doctor.rating}</span>
            </div>
          </div>

         

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-gray-400" />
              <span
                className={`text-sm font-medium ${
                  doctor.isAvailable ? 'text-green-600' : 'text-gray-500'
                }`}
              >
                {doctor.status}
              </span>
            </div>
            <button className="text-blue-600 text-sm font-medium hover:underline mt-2 sm:mt-0">
              View Profile →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
