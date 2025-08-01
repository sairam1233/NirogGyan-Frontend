import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Award,
  Calendar,
  Clock,
  ArrowLeft,
  GraduationCap,
} from 'lucide-react';
import { Doctor } from '../types';
import { formatTime } from '../utils/validation';

interface DoctorProfileProps {
  doctor: Doctor;
  onBack: () => void;
  onBookAppointment: () => void;
}

const DoctorProfile: React.FC<DoctorProfileProps> = ({
  doctor,
  onBack,
  onBookAppointment,
}) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Doctors</span>
      </button>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white text-blue-700 text-2xl font-bold">
              {getInitials(doctor.name)}
              <span
                className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white ${
                  doctor.isAvailable ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{doctor.name}</h1>
              <p className="text-blue-100 font-medium mb-4">{doctor.specialization}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{doctor.experience}+ yrs experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                  <span>{doctor.rating} rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>

            {/* Status & Button */}
            <div className="flex flex-col gap-3 items-start md:items-end">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-center ${
                  doctor.isAvailable ? 'bg-green-500' : 'bg-gray-500'
                } text-white`}
              >
                {doctor.status}
              </span>

              {doctor.isAvailable && (
                <button
                  onClick={onBookAppointment}
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 shadow-sm hover:shadow-md transition"
                >
                  Book Appointment
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8 grid md:grid-cols-2 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-xl font-bold mb-3">About Dr. {doctor.name.split(' ')[1]}</h2>
            <p className="text-gray-700 mb-5">{doctor.bio}</p>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-800">Education</span>
              </div>
              <p className="text-sm text-gray-600">{doctor.education}</p>
            </div>
          </div>

          {/* Schedule */}
          <div>
            <h2 className="text-xl font-bold mb-4">Available Schedule</h2>

            <div className="flex flex-wrap gap-2 mb-4">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                    selectedDay === day
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center gap-2 mb-3 text-sm font-medium text-gray-800">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>{selectedDay}</span>
              </div>

              {doctor.availability[selectedDay]?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {doctor.availability[selectedDay].map((time) => (
                    <div
                      key={time}
                      className="bg-white border border-gray-200 rounded-md px-2 py-1 text-center text-sm hover:border-blue-300 hover:bg-blue-50 transition"
                    >
                      <Clock className="inline w-4 h-4 mr-1 text-gray-500" />
                      {formatTime(time)}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic text-sm">
                  No available slots on {selectedDay}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
