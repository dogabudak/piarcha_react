import React, {Component} from 'react';

import {Text, StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Main extends Component<> {
  componentDidMount(): void {
    Geolocation.getCurrentPosition(info => {
      console.log('current position', info);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});

export default Main;
