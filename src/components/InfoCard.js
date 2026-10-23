import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function InfoCard({ task }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isSelesai = task.status === 'selesai';
  const isProses = task.status === 'proses';

  const badgeBg = isSelesai ? '#dcfce7' : isProses ? '#ffedd5' : '#f1f5f9';
  const badgeColor = isSelesai ? '#166534' : isProses ? '#9a3412' : '#475569';

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <View style={[styles.badge, { backgroundColor: badgeBg }]}>
          <Text style={[styles.badgeText, { color: badgeColor }]}>
            {task.status}
          </Text>
        </View>
      </View>

      {isExpanded && (
        <View style={styles.detailContainer}>
          <Text style={styles.descriptionLabel}>Deskripsi:</Text>
          <Text style={styles.descriptionText}>{task.description}</Text>

          {task.deadline && (
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Tenggat:</Text>
              <Text style={styles.metaValue}>{task.deadline}</Text>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isExpanded && styles.buttonOutline]}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <Text
          style={[styles.buttonText, isExpanded && styles.buttonOutlineText]}
        >
          {isExpanded ? 'Tutup Detail' : 'Lihat Detail'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  detailContainer: {
    paddingTop: 12,
    paddingBottom: 4,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginBottom: 12,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 4,
  },
  descriptionText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
  },
  metaValue: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 9,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  buttonOutlineText: {
    color: '#1d4ed8',
  },
});