import React from 'react';
import { Svg, Path } from 'react-native-svg';

interface BumpIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export default function BumpIcon({ size = 24, color = '#000', fill = 'none' }: BumpIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2}>
      {/* Fist bump icon paths */}
      <Path d="M12 2L14 4L12 6L10 4L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M4 8C4 8 6 6 8 8C10 10 10 12 8 14C6 16 4 14 4 14" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M20 8C20 8 18 6 16 8C14 10 14 12 16 14C18 16 20 14 20 14" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 8L16 8" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 14L16 14" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 6L14 6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}