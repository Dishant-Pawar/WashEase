import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Search, MapPin, Bell, Waves, Wind, Flame, Sparkles } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../../src/styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SERVICES = [
  { id: '1', title: 'Wash & Fold', icon: Waves, color: '#E0F2FE' },
  { id: '2', title: 'Dry Clean', icon: Sparkles, color: '#F0FDF4' },
  { id: '3', title: 'Ironing', icon: Flame, color: '#FFF7ED' },
  { id: '4', title: 'Fresh Air', icon: Wind, color: '#EFF6FF' },
];

export default function HomeDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={COLORS.primary} />
              <Text style={styles.locationText}>Home: Sunset Blvd, 24</Text>
            </View>
            <Text style={styles.greeting}>Good Morning, Alex</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Bell size={24} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.searchBar}>
          <Search size={20} color={COLORS.outline} />
          <Text style={styles.searchText}>Search services, fabrics...</Text>
        </TouchableOpacity>

        <View style={styles.promoContainer}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.promoCard}
          >
            <View style={styles.promoContent}>
              <Text style={styles.promoTitle}>Platinum Member</Text>
              <Text style={styles.promoText}>Get 20% off your next 3 hygiene-first wash orders.</Text>
              <TouchableOpacity style={styles.promoBtn}>
                <Text style={styles.promoBtnText}>Redeem Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.promoDecoration} />
          </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <TouchableOpacity onPress={() => router.push('/services')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {SERVICES.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={[styles.serviceCard, { backgroundColor: item.color }]}
              onPress={() => router.push('/services')}
            >
              <item.icon size={32} color={COLORS.primary} />
              <Text style={styles.serviceTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>In Progress</Text>
        </View>

        <TouchableOpacity 
          style={styles.trackingCard}
          onPress={() => router.push('/tracking')}
        >
          <View style={[styles.trackingIndicator, { backgroundColor: COLORS.success + '20' }]}>
            <Waves size={24} color={COLORS.success} />
          </View>
          <View style={styles.trackingContent}>
            <Text style={styles.trackingTitle}>Order #2944 • Washing</Text>
            <View style={styles.progressBarBg}>
               <View style={[styles.progressBarFill, { width: '65%' }]} />
            </View>
          </View>
          <Text style={styles.trackingEta}>12 min</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    ...TYPOGRAPHY.label,
    color: COLORS.textVariant,
    fontSize: 10,
    textTransform: 'none',
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginTop: 4,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 2,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    height: 56,
    borderRadius: ROUNDNESS.lg,
    paddingHorizontal: SPACING.md,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(112, 120, 131, 0.05)',
  },
  searchText: {
    ...TYPOGRAPHY.body,
    color: COLORS.outline,
    fontSize: 15,
  },
  promoContainer: {
    marginTop: SPACING.xl,
  },
  promoCard: {
    height: 180,
    borderRadius: ROUNDNESS.xl,
    padding: SPACING.lg,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  promoContent: {
    flex: 1,
    zIndex: 2,
  },
  promoTitle: {
    ...TYPOGRAPHY.label,
    color: '#FFF',
    opacity: 0.8,
  },
  promoText: {
    ...TYPOGRAPHY.h2,
    color: '#FFF',
    fontSize: 20,
    marginTop: 8,
    lineHeight: 28,
  },
  promoBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: ROUNDNESS.full,
    alignSelf: 'flex-start',
    marginTop: SPACING.md,
  },
  promoBtnText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },
  promoDecoration: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
  },
  viewAllText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    textTransform: 'none',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: width * 0.04,
  },
  serviceCard: {
    width: width * 0.4,
    height: 120,
    borderRadius: ROUNDNESS.lg,
    padding: SPACING.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  serviceTitle: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    textTransform: 'none',
    fontFamily: 'Inter-SemiBold',
  },
  trackingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: SPACING.md,
    borderRadius: ROUNDNESS.lg,
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  trackingIndicator: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackingContent: {
    flex: 1,
  },
  trackingTitle: {
    ...TYPOGRAPHY.body,
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  progressBarBg: {
    height: 4,
    backgroundColor: COLORS.surfaceContainerHigh,
    borderRadius: 2,
    marginTop: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  trackingEta: {
    ...TYPOGRAPHY.label,
    color: COLORS.outline,
    textTransform: 'none',
  },
});
