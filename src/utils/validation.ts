export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

export const validateAppointmentForm = (data: {
  patientName: string;
  email: string;
  date: string;
  time: string;
}): ValidationResult => {
  const errors: { [key: string]: string } = {};

  // Validate patient name
  if (!data.patientName.trim()) {
    errors.patientName = 'Patient name is required';
  } else if (data.patientName.trim().length < 2) {
    errors.patientName = 'Patient name must be at least 2 characters';
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Validate date
  if (!data.date) {
    errors.date = 'Appointment date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      errors.date = 'Appointment date cannot be in the past';
    }
  }

  // Validate time
  if (!data.time) {
    errors.time = 'Appointment time is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};