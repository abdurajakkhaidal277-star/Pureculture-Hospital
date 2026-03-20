import { Timestamp } from 'firebase/firestore';

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  createdAt: Timestamp;
  // Doctor specific
  specialization?: string;
  schedule?: string;
  // Patient specific
  address?: string;
  birthdate?: string;
  gender?: string;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  patientName: string;
  doctorName: string;
  date: Timestamp;
  status: AppointmentStatus;
  notes?: string;
}

export type InvoiceStatus = 'unpaid' | 'paid';

export interface Invoice {
  id: string;
  appointmentId: string;
  patientId: string;
  totalAmount: number;
  status: InvoiceStatus;
  createdAt: Timestamp;
}

export interface Payment {
  id: string;
  invoiceId: string;
  method: string;
  amount: number;
  status: string;
  createdAt: Timestamp;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  details: string;
  createdAt: Timestamp;
}

export interface LabResult {
  id: string;
  patientId: string;
  result: string;
  fileUrl?: string;
  createdAt: Timestamp;
}
