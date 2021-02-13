import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';

export default FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim, { toValue: 1, duration: 3000, useNativeDriver: true })
      .start()}, 
      [fadeAnim]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      {props.children}
    </Animated.View>
  );
}