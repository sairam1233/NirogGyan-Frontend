import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Doctor, Appointment, AppContextType } from '../types';
import { mockDoctors } from '../data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used inside an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [doctors] = useState<Doctor[]>(mockDoctors);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const bookAppointment = (data: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...data,
      id: Date.now().toString(),
      status: 'pending',
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const value: AppContextType = {
    doctors,
    appointments,
    selectedDoctor,
    searchQuery,
    setSelectedDoctor,
    setSearchQuery,
    bookAppointment,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
