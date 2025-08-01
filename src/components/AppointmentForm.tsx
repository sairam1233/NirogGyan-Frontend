import React, { useState } from 'react';
import { X, Calendar, Clock, User, Mail, CheckCircle } from 'lucide-react';
import { Doctor } from '../types';
import { validateAppointmentForm, formatTime, formatDate } from '../utils/validation';
import { useAppContext } from '../context/AppContext';

interface AppointmentFormProps {
  doctor: Doctor;
  onClose: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ doctor, onClose }) => {
  const { bookAppointment } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    date: '',
    time: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedDay, setSelectedDay] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'date') {
      const date = new Date(value);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      setSelectedDay(dayName);
      setFormData(prev => ({ ...prev, time: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateAppointmentForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    const selectedDate = new Date(formData.date);
    const dayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const availableTimes = doctor.availability[dayName] || [];

    if (!availableTimes.includes(formData.time)) {
      setErrors({ time: 'Time not available for selected date.' });
      return;
    }

    bookAppointment({
      doctorId: doctor.id,
      patientName: formData.patientName,
      email: formData.email,
      date: formData.date,
      time: formData.time
    });

    setIsSubmitted(true);
  };

  const getAvailableTimes = () => {
    return selectedDay && doctor.availability[selectedDay] ? doctor.availability[selectedDay] : [];
  };

  const today = new Date().toISOString().split('T')[0];

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed</h2>
          <p className="text-gray-600 mb-6">
            You’re booked with <strong>{doctor.name}</strong> on <strong>{formatDate(formData.date)}</strong> at <strong>{formatTime(formData.time)}</strong>.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Confirmation sent to <strong>{formData.email}</strong>
          </p>
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-blue-700"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-bold">Book Appointment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 rounded-lg p-4 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-200 text-blue-900 font-semibold flex items-center justify-center text-lg">
              {doctor.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
              <p className="text-blue-600 text-sm">{doctor.specialization}</p>
              <p className="text-gray-600 text-sm">{doctor.location}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {['patientName', 'email', 'date'].map((field) => {
              const Icon = field === 'patientName' ? User : field === 'email' ? Mail : Calendar;
              return (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                    <Icon className="inline w-4 h-4 mr-1" />
                    {field === 'patientName' ? 'Patient Name' : field === 'email' ? 'Email Address' : 'Appointment Date'}
                  </label>
                  <input
                    type={field === 'date' ? 'date' : field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    min={field === 'date' ? today : undefined}
                    placeholder={field === 'patientName' ? 'Enter your name' : field === 'email' ? 'Enter email' : ''}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                      errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {errors[field] && (
                    <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
                  )}
                </div>
              );
            })}

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Appointment Time
              </label>
              {selectedDay && getAvailableTimes().length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-2">
                  {getAvailableTimes().map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, time }))}
                      className={`p-3 border rounded-lg text-sm font-medium transition-all ${
                        formData.time === time
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      {formatTime(time)}
                    </button>
                  ))}
                </div>
              ) : selectedDay ? (
                <p className="text-gray-500 italic py-3">No slots for {selectedDay}</p>
              ) : (
                <p className="text-gray-500 italic py-3">Pick a date to see time slots</p>
              )}
              {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!doctor.isAvailable}
                className={`flex-1 px-6 py-3 rounded-xl font-semibold ${
                  doctor.isAvailable
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {doctor.isAvailable ? 'Book Appointment' : 'Doctor Not Available'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;