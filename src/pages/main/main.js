import React, {Component} from 'react';

import {Text, StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {setCurrentLocation} from '../../redux/geoLocation/reducer';
import {connect} from 'react-redux';

class Main extends Component<> {
  componentDidMount(): void {
    Geolocation.getCurrentPosition(info => {
      console.log(this.props)
      this.props.setCurrentLocation(info);
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

const mapStateToProps = state => {
  return {
    currentLocation: state,
  };
};

const mapDispatchToProps = {
  setCurrentLocation,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
