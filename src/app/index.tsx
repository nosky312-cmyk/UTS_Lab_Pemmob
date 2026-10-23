import { useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import InfoCard from '../components/InfoCard';

type TaskItem = {
  id: string;
  title: string;
  status: 'selesai' | 'proses';
  description: string;
  deadline: string;
};

const DAFTAR_TUGAS: TaskItem[] = [
  {
    id: 't-1',
    title: 'Praktikum Setup Environment',
    status: 'selesai',
    description:
      'Instalasi Node.js LTS, JDK 17, Android Studio, serta konfigurasi environment variable ANDROID_HOME dan PATH.',
    deadline: '15 Okt 2026',
  },
  {
    id: 't-2',
    title: 'Pengerjaan Tugas UTS Mobile',
    status: 'proses',
    description:
      'Membangun aplikasi React Native dengan navigasi modular, manajemen state menggunakan React Context, dan validasi form.',
    deadline: '28 Okt 2026',
  },
    {
    id: 't-3',
    title: 'Pengerjaan Tugas Lab Administrasi Sistem dan Jaringan',
    status: 'proses',
    description:
      'Membuat laporan praktikum administrasi sistem dan jaringan, termasuk konfigurasi server, manajemen pengguna, dan pengaturan jaringan.',
    deadline: '31 Okt 2026',
  },
];

const DAFTAR_MAHASISWA = [
  { id: '1', nama: 'Alifia Putri', prodi: 'Sistem Informasi', nim: '210101' },
  { id: '2', nama: 'Budi Santoso', prodi: 'Teknologi Informasi', nim: '210102' },
  { id: '3', nama: 'Citra Dewi', prodi: 'Sistem Informasi', nim: '210103' },
  { id: '4', nama: 'Dimas Anggara', prodi: 'Teknik Informatika', nim: '210104' },
  { id: '5', nama: 'Eka Nur Safitri', prodi: 'Sistem Informasi', nim: '210105' },
  { id: '6', nama: 'Christian Gabriel Lie', prodi: 'Teknologi Informasi', nim: '2532007' },
  { id: '7', nama: 'Rico Marceleno', prodi: 'Teknologi Informasi', nim: '2532037' },
];

export default function App() {
  const [keyword, setKeyword] = useState('');

  const filteredMahasiswa = DAFTAR_MAHASISWA.filter(
    (item) =>
      item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
      item.prodi.toLowerCase().includes(keyword.toLowerCase())
  );

  const renderStudentItem = ({
    item,
  }: {
    item: (typeof DAFTAR_MAHASISWA)[number];
  }) => {
    const initials = item.nama
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('');

    return (
      <View style={styles.studentCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{item.nama}</Text>
          <Text style={styles.studentProdi}>
            {item.prodi} • NIM: {item.nim}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={filteredMahasiswa}
        keyExtractor={(item) => item.id}
        renderItem={renderStudentItem}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.appHeader}>
              <Text style={styles.headerTitle}>Portal Akademik</Text>
              <Text style={styles.headerSubtitle}>
                Manajemen Tugas & Rekap Mahasiswa
              </Text>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Tugas & Praktikum</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{DAFTAR_TUGAS.length}</Text>
              </View>
            </View>

            {DAFTAR_TUGAS.map((task) => (
              <InfoCard key={task.id} task={task} />
            ))}

            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
              <Text style={styles.sectionTitle}>Daftar Mahasiswa</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{filteredMahasiswa.length}</Text>
              </View>
            </View>

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Cari nama atau program studi..."
                placeholderTextColor="#94a3b8"
                value={keyword}
                onChangeText={setKeyword}
                clearButtonMode="while-editing"
              />
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Data Tidak Ditemukan</Text>
            <Text style={styles.emptySubtitle}>
              Tidak ada mahasiswa yang cocok dengan "{keyword}"
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  appHeader: {
    marginBottom: 20,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
  },
  countBadge: {
    backgroundColor: '#e2e8f0',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 12,
  },
  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    height: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0f172a',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4338ca',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  studentProdi: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },
  emptyContainer: {
    paddingVertical: 28,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  emptySubtitle: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
});