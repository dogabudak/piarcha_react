import React, {Component, useState} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
function FadeIn(props: any) {
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  const onLoad = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
      <Animated.Image
          onLoad={onLoad}
          {...props}
          style={[
            {
              opacity: opacity,
              transform: [
                {
                  scale: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
            props.style,
          ]}
      />
  );
}


const Tutorial = () => (
  <View style={styles.container}>
    <FadeIn style={styles.image} source={require('../../images/logo.png')} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default Tutorial;
