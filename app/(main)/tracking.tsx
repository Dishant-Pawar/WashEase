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
import { ShieldCheck, MapPin, Phone, MessageCircle, ChevronRight, CheckCircle2, Waves } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../../src/styles/theme';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const TIMELINE = [
  { id: '1', title: 'Order Placed', time: '10:30 AM', status: 'completed' },
  { id: '2', title: 'Driver Picked Up', time: '11:15 AM', status: 'completed' },
  { id: '3', title: 'In Washing', time: '12:00 PM', status: 'active' },
  { id: '4', title: 'Professional Drying', time: 'Pending', status: 'upcoming' },
  { id: '5', title: 'Out for Delivery', time: 'Pending', status: 'upcoming' },
];

export default function OrderTracking() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.orderId}>Order #2944</Text>
          <View style={[styles.statusBadge, { shadowColor: COLORS.success, shadowOpacity: 0.3, shadowRadius: 10, elevation: 5 }]}>
            <Text style={styles.statusText}>Washing</Text>
          </View>
        </View>

        <View style={styles.animationCard}>
          <LinearGradient
            colors={[COLORS.primaryContainer, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            <Waves size={80} color="#FFF" style={styles.wavesIcon} opacity={0.2} />
            <Text style={styles.animationText}>Your garments are being treated with premium care.</Text>
            <View style={styles.etaContainer}>
              <Text style={styles.etaLabel}>Estimated Completion</Text>
              <Text style={styles.etaTime}>12:35 PM</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Track Progress</Text>
          <View style={styles.timeline}>
            {TIMELINE.map((item, index) => (
              <View key={item.id} style={styles.timelineItem}>
                <View style={styles.timelineIndicators}>
                  <View style={[
                    styles.timelineDot,
                    item.status === 'completed' && styles.dotCompleted,
                    item.status === 'active' && styles.dotActive,
                  ]}>
                    {item.status === 'completed' && <CheckCircle2 size={12} color="#FFF" />}
                  </View>
                  {index < TIMELINE.length - 1 && (
                    <View style={[
                      styles.timelineLine,
                      item.status === 'completed' && styles.lineCompleted,
                    ]} />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[
                      styles.timelineTitle,
                      item.status === 'active' && styles.activeText,
                      item.status === 'upcoming' && styles.upcomingText,
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.timelineTime}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Courier Details</Text>
          <View style={styles.courierCard}>
             <View style={styles.courierAvatar}>
               <User size={24} color={COLORS.outline} />
             </View>
             <View style={styles.courierInfo}>
               <Text style={styles.courierName}>Robert Fox</Text>
               <Text style={styles.courierRole}>Logistics Partner</Text>
             </View>
             <View style={styles.actionRow}>
               <TouchableOpacity style={styles.actionBtn}>
                 <Phone size={20} color={COLORS.primary} />
               </TouchableOpacity>
               <TouchableOpacity style={styles.actionBtn}>
                 <MessageCircle size={20} color={COLORS.primary} />
               </TouchableOpacity>
             </View>
          </View>
        </View>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  orderId: {
    ...TYPOGRAPHY.h2,
    fontSize: 22,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.success,
  },
  statusText: {
    ...TYPOGRAPHY.label,
    color: '#FFF',
    fontSize: 10,
  },
  animationCard: {
    height: 180,
    borderRadius: ROUNDNESS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.xl,
  },
  cardGradient: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'center',
  },
  wavesIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  animationText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    width: '80%',
  },
  etaContainer: {
    marginTop: SPACING.lg,
  },
  etaLabel: {
    ...TYPOGRAPHY.label,
    color: '#FFF',
    opacity: 0.6,
    fontSize: 10,
  },
  etaTime: {
    ...TYPOGRAPHY.h2,
    color: '#FFF',
    fontSize: 20,
    marginTop: 2,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h2,
    fontSize: 18,
    marginBottom: SPACING.md,
  },
  timeline: {
    backgroundColor: '#FFF',
    padding: SPACING.lg,
    borderRadius: ROUNDNESS.lg,
  },
  timelineItem: {
    flexDirection: 'row',
    height: 70,
  },
  timelineIndicators: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.outline + '20',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  dotCompleted: {
    backgroundColor: COLORS.success,
  },
  dotActive: {
    backgroundColor: COLORS.primary,
    borderWidth: 4,
    borderColor: COLORS.primaryContainer + '40',
  },
  timelineLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.outline + '20',
  },
  lineCompleted: {
    backgroundColor: COLORS.success,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: SPACING.md,
  },
  timelineTitle: {
    ...TYPOGRAPHY.body,
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  activeText: {
    color: COLORS.primary,
    fontFamily: 'Inter-Bold',
  },
  upcomingText: {
    color: COLORS.outline,
  },
  timelineTime: {
    ...TYPOGRAPHY.label,
    color: COLORS.outline,
    fontSize: 10,
    marginTop: 2,
    textTransform: 'none',
  },
  courierCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: SPACING.md,
    borderRadius: ROUNDNESS.lg,
    gap: 12,
  },
  courierAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.surfaceContainerLow,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courierInfo: {
    flex: 1,
  },
  courierName: {
    ...TYPOGRAPHY.body,
    fontFamily: 'Inter-SemiBold',
  },
  courierRole: {
    ...TYPOGRAPHY.label,
    color: COLORS.outline,
    textTransform: 'none',
    fontSize: 10,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
