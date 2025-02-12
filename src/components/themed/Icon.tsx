import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import glyphMap from 'react-native-vector-icons/glyphmaps/Ionicons.json';
import { COLORS } from '@/constants';
import { StyleProp, ViewStyle } from 'react-native';

export type IconName = keyof typeof glyphMap;

export const ICON_SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

export type IconSize = keyof typeof ICON_SIZES;

interface IconProps {
  name: IconName;
  size?: IconSize | number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Icon = ({ 
  name, 
  size = 'md', 
  color = COLORS.textPrimary,
  style
}: IconProps) => {
  const iconSize = typeof size === 'number' ? size : ICON_SIZES[size];
  return <Ionicons name={name} size={iconSize} color={color} style={style} />;
};

// Pre-configured icons
export const Close = (props: Omit<IconProps, 'name'>) => (
  <Icon name="close-outline" {...props} />
);

export const Search = (props: Omit<IconProps, 'name'>) => (
  <Icon name="search-outline" {...props} />
);

export const Menu = (props: Omit<IconProps, 'name'>) => (
  <Icon name="menu-outline" {...props} />
);

export const ChevronRight = (props: Omit<IconProps, 'name'>) => (
  <Icon name="chevron-forward-outline" {...props} />
);

export const ChevronLeft = (props: Omit<IconProps, 'name'>) => (
  <Icon name="chevron-back-outline" {...props} />
);

export default Icon; 