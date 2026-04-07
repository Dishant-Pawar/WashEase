import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../src/styles/theme';

const { width, height } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    title: 'Schedule a Pickup',
    description: "Laundry days are over. Book a pickup in seconds and we'll handle the rest.",
    color: '#E0F2FE',
  },
  {
    id: '2',
    title: 'Professional Care',
    description: 'Our experts treat every garment with the utmost care using eco-friendly detergents.',
    color: '#F0FDF4',
  },
  {
    id: '3',
    title: 'Fast Delivery',
    description: 'Fresh, clean, and delivered back to your door within 24 hours.',
    color: '#EFF6FF',
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/auth');
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Top Section: Flexible Image Area */}
            <View style={styles.imageWrapper}>
              <View style={[styles.imageContainer, { backgroundColor: item.color }]}>
                 {/* Image placeholder */}
                 <View style={styles.placeholderIcon} />
              </View>
            </View>

            {/* Bottom Section: Scrollable Text Area */}
            <View style={styles.contentArea}>
              <ScrollView 
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.description}>
                  {item.description}
                </Text>
              </ScrollView>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                currentIndex === i ? styles.activeDot : null,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={handleNext}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ChevronRight size={20} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    height: 60,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  skipText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textVariant,
    fontFamily: 'Inter-Medium',
  },
  slide: {
    width: width,
    flex: 1,
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flex: 1.2, // Takes more space but shrinks if needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: '80%', // Responsive height within the wrapper
    borderRadius: ROUNDNESS.xl,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '-2deg' }],
  },
  placeholderIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    opacity: 0.5,
  },
  contentArea: {
    flex: 1, // Takes remaining space
    paddingTop: SPACING.md,
  },
  content: {
    paddingHorizontal: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    fontSize: 28,
    color: COLORS.text,
    textAlign: 'left',
  },
  description: {
    ...TYPOGRAPHY.body,
    color: COLORS.textVariant,
    marginTop: SPACING.sm,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.outline,
    marginHorizontal: 3,
    opacity: 0.3,
  },
  activeDot: {
    width: 20,
    backgroundColor: COLORS.primary,
    opacity: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: ROUNDNESS.full,
    gap: 8,
  },
  buttonText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    fontFamily: 'Inter-Medium',
  },
});
