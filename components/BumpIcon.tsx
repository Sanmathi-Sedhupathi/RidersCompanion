import React from 'react';
import { Svg, Path, Circle } from 'react-native-svg';

interface BumpIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export default function BumpIcon({ size = 24, color = '#000', fill = 'none' }: BumpIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2}>
      {/* Left fist */}
      <Path 
        d="M8 12c0-2 1-3 2-3s2 1 2 3v4c0 1-1 2-2 2s-2-1-2-2v-4z" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right fist */}
      <Path 
        d="M16 12c0-2-1-3-2-3s-2 1-2 3v4c0 1 1 2 2 2s2-1 2-2v-4z" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Left thumb */}
      <Path 
        d="M8 10c-1 0-2-1-2-2s1-2 2-2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Right thumb */}
      <Path 
        d="M16 10c1 0 2-1 2-2s-1-2-2-2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Impact lines */}
      <Path 
        d="M12 8l0-2M12 4l0-1M10 6l-1-1M14 6l1-1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </Svg>
  );
}