import React, {Component} from 'react';

import { StyleSheet, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {setCurrentLocation} from '../../redux/geoLocation/reducer';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

class Main extends Component<> {
  componentDidMount(): void {
    Geolocation.getCurrentPosition(info => {
      this.props.setCurrentLocation(info);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
