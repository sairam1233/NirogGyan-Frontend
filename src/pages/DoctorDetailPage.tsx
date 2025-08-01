import React, { useState } from 'react';
import { Doctor } from '../types';
import DoctorProfile from '../components/DoctorProfile';
import AppointmentForm from '../components/AppointmentForm';

interface DoctorDetailPageProps {
  doctor: Doctor;
  onBack: () => void;
}

const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({ doctor, onBack }) => {
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  return (
    <>
      <DoctorProfile
        doctor={doctor}
        onBack={onBack}
        onBookAppointment={() => setShowAppointmentForm(true)}
      />
      
      {showAppointmentForm && (
        <AppointmentForm
          doctor={doctor}
          onClose={() => setShowAppointmentForm(false)}
        />
      )}
    </>
  );
};

export default DoctorDetailPage;