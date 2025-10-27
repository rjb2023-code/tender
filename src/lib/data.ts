import type { Tender, User, Notification } from '@/lib/types';
import { PlaceHolderImages } from './placeholder-images';

const getUserAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const users: User[] = [
  { id: 'user-1', username: 'admincp', password: 'password', name: 'Admin User', email: 'admin@paratama.co.id', avatar: getUserAvatar('user-1'), role: 'admin' },
  { id: 'user-2', username: 'budih', password: 'password', name: 'Budi Hartono', email: 'budi.h@paratama.co.id', avatar: getUserAvatar('user-2'), role: 'manager' },
  { id: 'user-3', username: 'cvmajujaya', password: 'password', name: 'CV Maju Jaya', email: 'contact@cvmajujaya.com', avatar: getUserAvatar('user-3'), role: 'vendor' },
  { id: 'user-4', username: 'sitia', password: 'password', name: 'Siti Aminah', email: 'siti.a@paratama.co.id', avatar: getUserAvatar('user-4'), role: 'manager' },
  { id: 'user-5', username: 'rinaw', password: 'password', name: 'Rina Wijaya', email: 'rina.w@paratama.co.id', avatar: getUserAvatar('user-5'), role: 'manager' },
  { id: 'user-6', username: 'aguss', password: 'password', name: 'Agus Salim', email: 'agus.s@paratama.co.id', avatar: getUserAvatar('user-6'), role: 'manager' },
];

export const tenders: Tender[] = [
  {
    id: 'TND-001',
    title: 'Pengadaan Laptop Kantor',
    description: 'Pengadaan 50 unit laptop untuk kebutuhan karyawan baru di departemen IT dan Marketing. Spesifikasi minimum: Core i5, 16GB RAM, 512GB SSD.',
    department: 'IT',
    amount: 750000000,
    vendor: 'PT. Teknologi Nusantara',
    status: 'Approved',
    submissionDate: '2024-05-01',
    deadline: '2024-05-15',
    documents: [{ name: 'Proposal_Teknis.pdf', url: '#' }, { name: 'RAB.xlsx', url: '#' }],
    approvers: [
      { userId: 'user-2', status: 'Approved', date: '2024-05-03', comments: 'Spesifikasi sesuai kebutuhan.' },
      { userId: 'user-4', status: 'Approved', date: '2024-05-04', comments: 'Budget OK.' },
    ],
  },
  {
    id: 'TND-002',
    title: 'Renovasi Gedung Kantor Pusat',
    description: 'Renovasi dan perbaikan fasilitas gedung kantor pusat, termasuk lobi, ruang rapat, dan area pantry. Fokus pada desain modern dan efisiensi energi.',
    department: 'General Affairs',
    amount: 1200000000,
    vendor: 'CV. Konstruksi Abadi',
    status: 'In Review',
    submissionDate: '2024-05-10',
    deadline: '2024-05-25',
    documents: [{ name: 'Desain_Arsitektur.pdf', url: '#' }, { name: 'Jadwal_Proyek.pdf', url: '#' }],
    approvers: [
      { userId: 'user-2', status: 'Approved', date: '2024-05-12' },
      { userId: 'user-5', status: 'Pending' },
    ],
  },
  {
    id: 'TND-003',
    title: 'Jasa Konsultan Pemasaran Digital',
    description: 'Mencari agensi atau konsultan untuk merancang dan mengeksekusi strategi pemasaran digital selama 6 bulan ke depan. KPI utama: peningkatan leads 50%.',
    department: 'Marketing',
    amount: 300000000,
    vendor: 'Digital Agency XYZ',
    status: 'Submitted',
    submissionDate: '2024-05-15',
    deadline: '2024-05-30',
    documents: [{ name: 'Company_Profile.pdf', url: '#' }, { name: 'Portofolio.pdf', url: '#' }],
    approvers: [
      { userId: 'user-4', status: 'Pending' },
    ],
  },
  {
    id: 'TND-004',
    title: 'Pengadaan ATK Bulanan',
    description: 'Pengadaan rutin alat tulis kantor untuk semua departemen. Daftar item terlampir.',
    department: 'Office Management',
    amount: 50000000,
    vendor: 'CV Maju Jaya',
    status: 'Rejected',
    submissionDate: '2024-04-20',
    deadline: '2024-05-05',
    documents: [{ name: 'Daftar_ATK.xlsx', url: '#' }],
    approvers: [
      { userId: 'user-5', status: 'Rejected', date: '2024-04-22', comments: 'Harga tidak kompetitif.' },
    ],
  },
];

export const notifications: Notification[] = [
  {
    id: 'N-1',
    title: 'Approval Dibutuhkan',
    description: 'Tender TND-002 "Renovasi Gedung" menunggu approval Anda.',
    date: '2024-05-13T10:00:00Z',
    read: false,
  },
  {
    id: 'N-2',
    title: 'Tender Disetujui',
    description: 'Tender TND-001 "Pengadaan Laptop" telah disetujui sepenuhnya.',
    date: '2024-05-04T15:30:00Z',
    read: true,
  },
  {
    id: 'N-3',
    title: 'Tender Baru Masuk',
    description: 'Tender TND-003 "Jasa Konsultan" telah disubmit oleh vendor.',
    date: '2024-05-15T09:00:00Z',
    read: false,
  },
  {
    id: 'N-4',
    title: 'Deadline Mendekat',
    description: 'Tender TND-002 "Renovasi Gedung" akan berakhir dalam 2 hari.',
    date: '2024-05-23T11:00:00Z',
    read: true,
  },
];
