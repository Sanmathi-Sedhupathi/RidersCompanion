import React from 'react';
import { Svg, Path, Circle, G } from 'react-native-svg';

interface BumpIconProps {
  size?: number;
  color?: string;
  fill?: string;
}

export default function BumpIcon({ size = 24, color = '#000', fill = 'none' }: BumpIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={1.5}>
      {/* Left fist */}
      <G>
        <Path 
          d="M6 10c0-1.5 1-2.5 2.5-2.5S11 8.5 11 10v6c0 1-1 2-2.5 2S6 17 6 16v-6z" 
          fill={fill !== 'none' ? color : 'none'}
          stroke={color}
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Left thumb */}
        <Path 
          d="M6 12c-1 0-1.5-0.5-1.5-1.5s0.5-1.5 1.5-1.5" 
          fill="none"
          stroke={color}
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Left knuckles */}
        <Path 
          d="M7 10.5h2M7 12h2M7 13.5h2" 
          stroke={color}
          strokeLinecap="round" 
          strokeWidth={0.8}
        />
      </G>
      
      {/* Right fist */}
      <G>
        <Path 
          d="M18 10c0-1.5-1-2.5-2.5-2.5S13 8.5 13 10v6c0 1 1 2 2.5 2s2.5-1 2.5-2v-6z" 
          fill={fill !== 'none' ? color : 'none'}
          stroke={color}
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Right thumb */}
        <Path 
          d="M18 12c1 0 1.5-0.5 1.5-1.5s-0.5-1.5-1.5-1.5" 
          fill="none"
          stroke={color}
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        {/* Right knuckles */}
        <Path 
          d="M15 10.5h2M15 12h2M15 13.5h2" 
          stroke={color}
          strokeLinecap="round" 
          strokeWidth={0.8}
        />
      </G>
      
      {/* Impact/bump effect lines */}
      <G opacity={fill !== 'none' ? '1' : '0.6'}>
        <Path 
          d="M12 6l0-1.5M12 4l0-1M10.5 5.5l-0.7-0.7M13.5 5.5l0.7-0.7M9 7l-1-0.5M15 7l1-0.5" 
          stroke={color}
          strokeLinecap="round" 
          strokeWidth={1.2}
        />
      </G>
      
      {/* Center impact point */}
      <Circle 
        cx="12" 
        cy="8" 
        r="1" 
        fill={fill !== 'none' ? color : 'none'}
        stroke={color}
        strokeWidth={1}
        opacity={fill !== 'none' ? '1' : '0.4'}
      />
    </Svg>
  );
}