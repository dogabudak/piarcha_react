import React, {Component} from 'react';

import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
const {height} = Dimensions.get('window');

import Geolocation from '@react-native-community/geolocation';
import {setCurrentLocation} from '../../redux/geoLocation/reducer';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import CustomCallout from './customMarker';

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
            latitude: 41.0094092,
            longitude: 28.9770532,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: 41.008545,
              longitude: 28.9780613,
            }}
            calloutOffset={{x: -8, y: 28}}
            calloutAnchor={{x: 0.5, y: 0.4}}
            ref={ref => {
              this.marker2 = ref;
            }}>
            <Callout
              alphaHitTest
              tooltip
              onPress={e => {
                if (
                  e.nativeEvent.action === 'marker-inside-overlay-press' ||
                  e.nativeEvent.action === 'callout-inside-press'
                ) {
                  return;
                }
              }}
              style={{
                width: 140,
                height: 140,
              }}>
              <CustomCallout>
                <Text>{'Ayasofya müzesi'}</Text>
                <CalloutSubview onPress={() => this._panel.show()}>
                  <Text>Details</Text>
                </CalloutSubview>
              </CustomCallout>
            </Callout>
          </Marker>
        </MapView>
        <View style={styles.buttons}>
          <Button
            title="Create a route plan !"
            onPress={() => {
              console.log();
            }}
          />
          <Button
            title="Go to Next attraction ! "
            onPress={() => {
              console.log();
            }}
          />
        </View>
        <SlidingUpPanel
          backdropOpacity={0}
          draggableRange={{top: height / 1.5, bottom: 0}}
          containerStyle={styles.container}
          ref={c => (this._panel = c)}>
          <View style={styles.content}>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
            <Text>Here is the content inside panel</Text>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    height: 650,
    width: 450,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    height: 500,
    backgroundColor: 'white',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    justifyContent: 'flex-end',
    marginBottom: -100,
  },
  slider: {
    marginTop: -50,
    zIndex: 1,
    alignItems: 'center',
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
