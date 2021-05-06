import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
const {height} = Dimensions.get('window');
import {FAB, Portal} from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import {setCurrentLocation} from '../../redux/geoLocation/reducer';
import {getCoordinates} from '../../redux/cityList/reducer';
import SlidingUpPanel from 'rn-sliding-up-panel';
import MapView, {
  Callout,
  CalloutSubview,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import CustomCallout from './customMarker';
import getClosestCoordinate from '../../utilities/getClosestCoordinates';
import Images from '../../images/icons/church.png';
import {useNavigation} from '@react-navigation/native';

export const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLatitute, setCurrentLatitute] = useState('');
  const [currentLongtitute, setCurrentLongtitute] = useState('');
  const [coordinates, setCoordinates] = useState({
    coordinates: [{name: '', x: 0, y: 0}],
  });
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getCoordinates('Istanbul')).then(result => {
      setCoordinates(result.payload.data);
    });
  }, [dispatch]);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  React.useEffect(() => {
    let interval;
    const fetchLocation = async () => {
      interval = setInterval(async () => {
        Geolocation.getCurrentPosition(location => {
          setCurrentLatitute(location.coords.latitude);
          setCurrentLongtitute(location.coords.longitude);
          dispatch(setCurrentLocation(location));
        });
      }, 10000);

      return () => {
        clearInterval(interval);
      };
    };
    fetchLocation();
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  // TODO CalloutSubView is not supported by android
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
            latitude: coordinates?.coordinates[0].x,
            longitude: coordinates?.coordinates[0].y,
          }}
          calloutOffset={{x: -8, y: 28}}
          calloutAnchor={{x: 0.5, y: 0.4}}
          image={Images}
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
              <Text>{coordinates?.coordinates[0].name}</Text>
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
            const closestAttraction = getClosestCoordinate(
              {
                x: currentLatitute,
                y: currentLongtitute,
              },
              coordinates?.coordinates,
            );
            //TODO do something with this value
            console.log('closest attraction is => ', closestAttraction);
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
          open={isMenuOpen}
          icon={isMenuOpen ? 'calendar-today' : 'reorder-horizontal'}
          actions={[
            {
              icon: 'map',
              label: 'Destination',
              onPress: () => {
                navigation.navigate('Destination');
              },
            },
            {
              icon: 'account',
              label: 'Profile',
              onPress: () => {
                navigation.navigate('Profile');
              },
            },
            {
              icon: 'cog',
              label: 'Settings',
              onPress: () => {
                navigation.navigate('Settings');
              },
            },
            {
              icon: 'information-outline',
              label: 'About',
              onPress: () => {
                navigation.navigate('About');
              },
            },
          ]}
          onStateChange={() => {
            toggleMenu();
          }}
          onPress={() => {
            if (isMenuOpen) {
            }
          }}
        />
      </Portal>
    </View>
  );
};

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

export default Main;
