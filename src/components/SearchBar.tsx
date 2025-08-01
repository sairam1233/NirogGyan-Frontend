import React from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useAppContext();

  return (
    <div className="relative max-w-lg mx-auto mb-6 px-4">
      <label htmlFor="search" className="sr-only">
        Search Doctors
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center">
          <Search className="h-5 w-5 text-gray-400" />
        </span>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name or specialty"
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none bg-white shadow transition-all duration-150"
        />
      </div>
    </div>
  );
};

export default SearchBar;
