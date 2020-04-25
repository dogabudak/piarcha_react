import React, {Component} from 'react';

import {Text, StyleSheet, View} from 'react-native';

class Register extends Component<> {
  render() {
    return (
      <View style={styles.container}>
        <Text>Register</Text>
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

export default Register;
