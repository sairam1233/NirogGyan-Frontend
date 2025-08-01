export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profileImage: string;
  bio: string;
  experience: number;
  rating: number;
  availability: {
    [key: string]: string[];
  };
  isAvailable: boolean;
  location: string;
  education: string;
  status: string; // Added the missing 'status' property
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  email: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface AppContextType {
  doctors: Doctor[];
  appointments: Appointment[];
  selectedDoctor: Doctor | null;
  searchQuery: string;
  setSelectedDoctor: (doctor: Doctor | null) => void;
  setSearchQuery: (query: string) => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
}