import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { Search, ChevronLeft, Minus, Plus, ShoppingCart, ShoppingBag } from 'lucide-react-native';
import { COLORS, SPACING, ROUNDNESS, TYPOGRAPHY } from '../../src/styles/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CATEGORIES = ['Wash & Fold', 'Dry Clean', 'Ironing', 'Duvets'];

const ITEMS = [
  { id: '1', name: 'Cotton Shirt', price: 4.5, category: 'Wash & Fold' },
  { id: '2', name: 'Premium Suit', price: 15.0, category: 'Dry Clean' },
  { id: '3', name: 'Silk Dress', price: 12.5, category: 'Dry Clean' },
  { id: '4', name: 'Linen Trousers', price: 6.0, category: 'Wash & Fold' },
  { id: '5', name: 'Duvet (King)', price: 25.0, category: 'Duvets' },
  { id: '6', name: 'Polo Shirt', price: 3.5, category: 'Wash & Fold' },
];

export default function ServicesScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Wash & Fold');
  const [cart, setCart] = useState<Record<string, number>>({});

  const updateCart = (id: string, delta: number) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>All Services</Text>
        <Text style={styles.subtitle}>Select items for professional hygiene treatment.</Text>
      </View>

      <View style={styles.searchRow}>
        <TextInput 
          placeholder="Search items..." 
          style={styles.searchBar} 
          placeholderTextColor={COLORS.outline}
        />
        <TouchableOpacity style={styles.iconBtn}>
          <Search size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryRow}
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity 
            key={cat} 
            onPress={() => setSelectedCategory(cat)}
            style={[
              styles.categoryChip, 
              selectedCategory === cat && styles.activeChip
            ]}
          >
            <Text style={[
              styles.categoryText, 
              selectedCategory === cat && styles.activeChipText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.listScroll} showsVerticalScrollIndicator={false}>
        {ITEMS.filter(i => i.category === selectedCategory).map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)} / item</Text>
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity 
                style={styles.stepperBtn} 
                onPress={() => updateCart(item.id, -1)}
              >
                <Minus size={16} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.stepperVal}>{cart[item.id] || 0}</Text>
              <TouchableOpacity 
                style={styles.stepperBtn} 
                onPress={() => updateCart(item.id, 1)}
              >
                <Plus size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {totalItems > 0 && (
        <View style={styles.checkoutBar}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.checkoutBtn}
          >
            <View style={styles.cartInfo}>
              <View style={styles.cartIcon}>
                <ShoppingBag size={18} color={COLORS.primary} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{totalItems}</Text>
                </View>
              </View>
              <Text style={styles.checkoutText}>Review Order</Text>
            </View>
            <ChevronRight size={20} color="#FFF" />
          </LinearGradient>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    fontSize: 28,
  },
  subtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textVariant,
    fontSize: 14,
    marginTop: 4,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.xl,
    gap: 12,
    marginBottom: SPACING.lg,
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFF',
    borderRadius: ROUNDNESS.lg,
    paddingHorizontal: SPACING.md,
    ...TYPOGRAPHY.body,
    fontSize: 14,
  },
  iconBtn: {
    width: 48,
    height: 48,
    borderRadius: ROUNDNESS.lg,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryRow: {
    paddingHorizontal: SPACING.xl,
    gap: 12,
    height: 44,
    marginBottom: SPACING.lg,
  },
  categoryChip: {
    paddingHorizontal: 20,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeChip: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    ...TYPOGRAPHY.label,
    color: COLORS.textVariant,
    textTransform: 'none',
    fontFamily: 'Inter-Medium',
  },
  activeChipText: {
    color: '#FFF',
  },
  listScroll: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: 150,
  },
  itemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: SPACING.md,
    borderRadius: ROUNDNESS.lg,
    marginBottom: SPACING.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...TYPOGRAPHY.body,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
  },
  itemPrice: {
    ...TYPOGRAPHY.label,
    color: COLORS.outline,
    fontSize: 10,
    marginTop: 4,
    textTransform: 'none',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: ROUNDNESS.full,
    padding: 2,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperVal: {
    paddingHorizontal: 12,
    ...TYPOGRAPHY.body,
    fontSize: 14,
    fontFamily: 'Inter-Bold',
  },
  checkoutBar: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  checkoutBtn: {
    height: 64,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.primary,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 8,
    fontFamily: 'Inter-Bold',
  },
  checkoutText: {
    ...TYPOGRAPHY.body,
    color: '#FFF',
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});
