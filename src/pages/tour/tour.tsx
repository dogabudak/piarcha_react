import React from 'react';
import {StyleSheet, Button, View} from 'react-native';

export default function Tour({navigation , route}: {navigation: any, route: any}) {
  // TODO this should fetch the tours
  return (
    <View style={styles.page}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },
});
