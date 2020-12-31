import React, {Component} from 'react';

import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
const {height} = Dimensions.get('window');
import {FAB, Portal} from 'react-native-paper';

import Geolocation from '@react-native-community/geolocation';
import {setCurrentLocation} from '../../redux/geoLocation/reducer';
import {getCoordinates} from '../../redux/cityList/reducer';
import {connect} from 'react-redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import CustomCallout from './customMarker';

interface State {
  isMenuOpen: boolean;
}

class Main extends Component<{}, State> {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false,
    };
  }
  componentDidMount(): void {
    Geolocation.getCurrentPosition(info => {
      this.props.setCurrentLocation(info);
    });
    this.props.getCoordinates();
  }
  toggleMenu = () => this.setState({isMenuOpen: !this.state.isMenuOpen});

  render() {
    // TODO bu kordinatlar loop olsun [0]'dan aliyor
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: 41.0094092,
            longitude: 28.9770532,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}>
          <Marker
            coordinate={{
              latitude: this.props.coordinates?.coordinates[0].x,
              longitude: this.props.coordinates?.coordinates[0].y,
            }}
            calloutOffset={{x: -8, y: 28}}
            calloutAnchor={{x: 0.5, y: 0.4}}
            //TODO fix this 
            /*
            image={require(`../../images/icons/${
              this.props.coordinates?.coordinates[0].type
            }.png`)}
             */
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
                <Text>{this.props.coordinates?.coordinates[0].name}</Text>
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
        <Portal>
          <FAB.Group
            small
            open={this.state.isMenuOpen}
            icon={
              this.state.isMenuOpen ? 'calendar-today' : 'reorder-horizontal'
            }
            actions={[
              {
                icon: 'map',
                label: 'Destination',
                onPress: () => {
                  this.props.navigation.navigate('Destination');
                },
              },
              {
                icon: 'account',
                label: 'Profile',
                onPress: () => console.log('Pressed Profile'),
              },
              {
                icon: 'cog',
                label: 'Settings',
                onPress: () => {
                  this.props.navigation.navigate('Settings');
                },
              },
            ]}
            onStateChange={() => {
              this.toggleMenu();
            }}
            onPress={() => {
              if (this.state.isMenuOpen) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 30,
    bottom: -90,
  },
});

const mapStateToProps = state => {
  return {
    currentLocation: state.currentLocation.currentLocation,
    coordinates: state.cityList.coordinates,
  };
};

const mapDispatchToProps = {
  setCurrentLocation,
  getCoordinates,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
