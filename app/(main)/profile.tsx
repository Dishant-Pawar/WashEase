import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { User, CreditCard, MapPin, Bell, Shield, LogOut, ChevronRight, Star } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../../src/styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const SETTINGS = [
  { id: '1', title: 'Personal Details', icon: User, color: '#E0F2FE' },
  { id: '2', title: 'Address Book', icon: MapPin, color: '#F0FDF4' },
  { id: '3', title: 'Payment Methods', icon: CreditCard, color: '#FFF7ED' },
  { id: '4', title: 'Notifications', icon: Bell, color: '#EFF6FF' },
  { id: '5', title: 'Privacy & Security', icon: Shield, color: '#F5F3FF' },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.profileBox}>
            <View style={styles.avatar}>
               <User size={40} color={COLORS.primary} />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>Alex Johnson</Text>
              <View style={styles.membershipBadge}>
                <Star size={10} color={COLORS.primary} fill={COLORS.primary} />
                <Text style={styles.membershipText}>Platinum Member</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statVal}>32</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>$120</Text>
            <Text style={styles.statLabel}>Saved (Exp)</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statVal}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          <View style={styles.settingsGroup}>
            {SETTINGS.map((item) => (
              <TouchableOpacity key={item.id} style={styles.settingBtn}>
                <View style={[styles.settingIcon, { backgroundColor: item.color }]}>
                  <item.icon size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <ChevronRight size={18} color={COLORS.outline} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.referCard}>
          <LinearGradient
            colors={[COLORS.primaryContainer, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.referGradient}
          >
            <View style={styles.referContent}>
              <Text style={styles.referTitle}>Share the Freshness</Text>
              <Text style={styles.referText}>Give $10 to your friends and get $10 when they try WashEase.</Text>
            </View>
            <TouchableOpacity style={styles.referBtn}>
              <Text style={styles.referBtnText}>Refer Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <LogOut size={20} color={COLORS.error} />
          <Text style={styles.logoutText}>Sign Out</Text>
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
    paddingBottom: 120,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 2,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.h2,
    fontSize: 24,
  },
  membershipBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary + '10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: ROUNDNESS.full,
    alignSelf: 'flex-start',
    marginTop: 4,
    gap: 4,
  },
  membershipText: {
    ...TYPOGRAPHY.label,
    color: COLORS.primary,
    fontSize: 9,
    fontFamily: 'Inter-Bold',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: SPACING.lg,
    borderRadius: ROUNDNESS.lg,
    marginBottom: SPACING.xl * 1.5,
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statVal: {
    ...TYPOGRAPHY.h2,
    fontSize: 20,
    color: COLORS.primary,
  },
  statLabel: {
    ...TYPOGRAPHY.label,
    fontSize: 9,
    color: COLORS.textVariant,
    marginTop: 2,
    textTransform: 'none',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.outline,
    opacity: 0.1,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    marginBottom: SPACING.md,
  },
  settingsGroup: {
    backgroundColor: '#FFF',
    borderRadius: ROUNDNESS.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 15,
  },
  settingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    // Ghost bordering
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.02)',
    gap: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: ROUNDNESS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingTitle: {
    ...TYPOGRAPHY.body,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  referCard: {
    borderRadius: ROUNDNESS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  referGradient: {
    padding: SPACING.lg,
  },
  referContent: {
    marginBottom: SPACING.md,
  },
  referTitle: {
    ...TYPOGRAPHY.h2,
    color: '#FFF',
    fontSize: 20,
  },
  referText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    opacity: 0.8,
    fontSize: 13,
    marginTop: 4,
  },
  referBtn: {
    backgroundColor: '#FFF',
    borderRadius: ROUNDNESS.full,
    paddingVertical: 10,
    alignItems: 'center',
  },
  referBtnText: {
    ...TYPOGRAPHY.body,
    color: COLORS.primary,
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: SPACING.md,
  },
  logoutText: {
    ...TYPOGRAPHY.body,
    color: COLORS.error,
    fontFamily: 'Inter-SemiBold',
  },
});
