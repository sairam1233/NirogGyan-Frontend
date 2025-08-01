import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DoctorDetailPage from './pages/DoctorDetailPage';

const AppContent: React.FC = () => {
  const { doctors } = useAppContext();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);

  const selectedDoctor = selectedDoctorId 
    ? doctors.find(doctor => doctor.id === selectedDoctorId) || null
    : null;

  const handleDoctorSelect = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  const handleBack = () => {
    setSelectedDoctorId(null);
  };

  return (
    <Layout>
      {selectedDoctor ? (
        <DoctorDetailPage
          doctor={selectedDoctor}
          onBack={handleBack}
        />
      ) : (
        <LandingPage onDoctorSelect={handleDoctorSelect} />
      )}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;