import { Doctor } from '../types';

export const mockDoctors: Doctor[] = [
   {
    id: '1',
    name: 'Dr. Priya Desai',
    specialization: 'Gynecology',
    profileImage: 'https://images.pexels.com/photos/8460092/pexels-photo-8460092.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Experienced gynecologist with prenatal and fertility expertise.',
    experience: 9,
    rating: 4.9,
    availability: {
      Monday: ['09:00', '10:00'],
      Tuesday: ['08:00'],
      Wednesday: ['10:00'],
      Thursday: ['09:00'],
      Friday: ['08:00']
    },
    isAvailable: true,
    location: 'Women’s Health Center',
    education: 'MD from King Edward Medical College, Mumbai',
    status: 'Available Today'
  },
  {
    id: '2',
    name: 'Dr. Aarav Mehta',
    specialization: 'Orthopedics',
    profileImage: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specialist in joint replacement and sports injuries.',
    experience: 11,
    rating: 4.6,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    },
    isAvailable: false,
    location: 'City Ortho Hospital',
    education: 'MS Orthopedics from AIIMS, Delhi',
    status: 'On Leave'
  },
  {
    id: '3',
    name: 'Dr. Kavya Iyer',
    specialization: 'Pediatrics',
    profileImage: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Passionate about child health and development.',
    experience: 8,
    rating: 4.8,
    availability: {
      Monday: ['09:00'],
      Tuesday: ['09:00'],
      Wednesday: [],
      Thursday: [],
      Friday: ['09:00']
    },
    isAvailable: true,
    location: 'Happy Kids Clinic',
    education: 'MD from Christian Medical College, Vellore',
    status: 'Available Today'
  },
  {
    id: '4',
    name: 'Dr. Rohan Gupta',
    specialization: 'Cardiology',
    profileImage: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Cardiologist with expertise in heart failure and rhythm disorders.',
    experience: 14,
    rating: 4.7,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    },
    isAvailable: false,
    location: 'Pulse Cardiac Center',
    education: 'DM Cardiology from PGIMER, Chandigarh',
    status: 'Fully Booked'
  },
  {
    id: '5',
    name: 'Dr. Meenakshi Rao',
    specialization: 'Dermatology',
    profileImage: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Skin and cosmetic specialist with over a decade of experience.',
    experience: 12,
    rating: 4.9,
    availability: {
      Monday: ['09:00', '11:00'],
      Tuesday: ['09:00'],
      Wednesday: [],
      Thursday: ['10:00'],
      Friday: ['09:00']
    },
    isAvailable: true,
    location: 'Glow Skin Clinic',
    education: 'MD from Kasturba Medical College',
    status: 'Available Today'
  },
  {
    id: '6',
    name: 'Dr. Anil Joshi',
    specialization: 'ENT',
    profileImage: 'https://images.pexels.com/photos/8460096/pexels-photo-8460096.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Expert in ear, nose, throat surgeries and treatments.',
    experience: 10,
    rating: 4.5,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    },
    isAvailable: false,
    location: 'ClearSound ENT Hospital',
    education: 'MS ENT from Maulana Azad Medical College',
    status: 'On Leave'
  },
  {
    id: '7',
    name: 'Dr. Sneha Patil',
    specialization: 'Psychiatry',
    profileImage: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Mental health expert focusing on anxiety and stress disorders.',
    experience: 13,
    rating: 4.8,
    availability: {
      Monday: ['09:00'],
      Tuesday: ['09:00'],
      Wednesday: ['10:00'],
      Thursday: ['11:00'],
      Friday: ['09:00']
    },
    isAvailable: true,
    location: 'MindWell Clinic',
    education: 'MD Psychiatry from NIMHANS',
    status: 'Available Today'
  },
  {
    id: '8',
    name: 'Dr. Dev Arora',
    specialization: 'Urology',
    profileImage: 'https://images.pexels.com/photos/5452290/pexels-photo-5452290.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Specialist in urinary disorders and kidney health.',
    experience: 16,
    rating: 4.7,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    },
    isAvailable: false,
    location: 'UroCare Hospital',
    education: 'MCH Urology from AIIMS',
    status: 'Fully Booked'
  },
  {
    id: '9',
    name: 'Dr. Aditi Singh',
    specialization: 'Endocrinology',
    profileImage: 'https://images.pexels.com/photos/6749776/pexels-photo-6749776.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Treats diabetes, thyroid, and hormonal disorders.',
    experience: 9,
    rating: 4.6,
    availability: {
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: []
    },
    isAvailable: false,
    location: 'Hormone Health Center',
    education: 'DM Endocrinology from SGPGI Lucknow',
    status: 'On Leave'
  },
  {
    id: '10',
    name: 'Dr. Rajeev Malhotra',
    specialization: 'Nephrology',
    profileImage: 'https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Renal expert managing dialysis and kidney diseases.',
    experience: 18,
    rating: 4.9,
    availability: {
      Monday: ['09:00'],
      Tuesday: ['09:00', '10:00'],
      Wednesday: ['10:00'],
      Thursday: ['09:00'],
      Friday: []
    },
    isAvailable: true,
    location: 'RenalPlus Institute',
    education: 'DM Nephrology from JIPMER',
    status: 'Available Today'
  }
];