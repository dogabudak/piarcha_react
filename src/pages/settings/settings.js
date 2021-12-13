import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import Slider from '@react-native-community/slider';

class settings extends Component {
  state = {
    language: 'English',
  };
  render() {
    return (
      <View style={styles.item}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#FFFFFF"
        />
        <Picker
          selectedValue={this.state.language}
          style={{height: 50, width: 100}}
          onValueChange={itemValue => this.setState({language: itemValue})}>
          <Picker.Item label="English" value="english" />
          <Picker.Item label="Turkish" value="turkish" />
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default settings;
