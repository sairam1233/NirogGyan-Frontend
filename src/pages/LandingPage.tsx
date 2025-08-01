import React, { useMemo, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import SearchBar from '../components/SearchBar';
import { Users } from 'lucide-react';

interface LandingPageProps {
  onDoctorSelect: (doctorId: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onDoctorSelect }) => {
  const { doctors, searchQuery } = useAppContext();
  const [filter, setFilter] = useState('All');

  const filteredDoctors = useMemo(() => {
    let filtered = [...doctors];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialization.toLowerCase().includes(q)
      );
    }

    if (filter !== 'All') {
      filtered = filtered.filter(
        (doc) => doc.specialization.toLowerCase() === filter.toLowerCase()
      );
    }

    return filtered;
  }, [doctors, searchQuery, filter]);

  const specializations = Array.from(
    new Set(doctors.map((doc) => doc.specialization))
  );

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Find Your Perfect{' '}
          <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            Doctor
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Schedule appointments with top medical professionals – fast, simple, and trusted.
        </p>
      </section>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
        <div className="flex-1">
          <SearchBar />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-60 p-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Specializations</option>
          {specializations.map((spec, index) => (
            <option key={index} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {searchQuery || filter !== 'All'
            ? `Showing ${filteredDoctors.length} Result(s)`
            : 'Available Doctors'}
        </h2>
        {(searchQuery || filter !== 'All') && (
          <p className="text-sm text-gray-500">
            {searchQuery && <>Search: <span className="font-medium">"{searchQuery}"</span>{' '}</>}
            {filter !== 'All' && <>| Specialization: <span className="font-medium">{filter}</span></>}
          </p>
        )}
      </div>

      {/* Doctor List */}
      {filteredDoctors.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onClick={() => onDoctorSelect(doctor.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No Results Found</h3>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Try adjusting your search or selecting a different specialization.
          </p>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
