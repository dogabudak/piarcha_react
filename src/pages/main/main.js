import React, {memo, useCallback, useState, useRef, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
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
import Images from '../../images/images';
import {useNavigation} from '@react-navigation/native';
import MapViewDirections from 'react-native-maps-directions';
import Button from "../../components/viewComponents/pressable";

const {height} = Dimensions.get('window');

// TODO find a way to keep this as a secret
const GOOGLE_MAPS_APIKEY = undefined;

export const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLatitute, setCurrentLatitute] = useState('');
  const [currentLongtitute, setCurrentLongtitute] = useState('');
  const [coordinates, setCoordinates] = useState([{name: '', x: 0, y: 0}]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isMapReady, setMapReady] = useState(false);
  const _map = useRef(null);
  const _handleMapReady = useCallback(() => {
    setMapReady(true);
  }, [setMapReady]);

  useEffect(() => {
    // TODO instead of this 'then', you can do this in reducer
    // TODO instead of this 'Istanbul', find a solution
    dispatch(getCoordinates('Istanbul')).then(result => {
      setCoordinates(result?.payload?.data?.coordinates);
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
  // TODO marker images are huuuge
  const Markers =
    coordinates &&
    coordinates.map(eachCoordinate => (
      <Marker
        coordinate={{
          latitude: eachCoordinate.x,
          longitude: eachCoordinate.y,
        }}
        calloutOffset={{x: -8, y: 28}}
        calloutAnchor={{x: 0.5, y: 0.4}}
        image={Images[eachCoordinate.type]}>
        <Callout
          alphaHitTest
          tooltip
          onPress={e => {
            if (Platform.OS !== 'ios') {
              navigation.navigate('Settings');
            }
            if (
              e.nativeEvent.action === 'marker-inside-overlay-press' ||
              e.nativeEvent.action === 'callout-inside-press'
            ) {
              return;
            }
          }}
          style={styles.callout}>
          <CustomCallout
            onPress={() => {
              if (Platform.OS !== 'ios') {
                navigation.navigate('LocationDetailsPage');
              }
            }}>
            <Text>{eachCoordinate.name}</Text>
            {Platform.OS === 'ios' && (
              <CalloutSubview onPress={() => this?._panel.show()}>
                <Text>Details</Text>
              </CalloutSubview>
            )}
          </CustomCallout>
        </Callout>
      </Marker>
    ));

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={_map}
        style={isMapReady ? styles.map : {}}
        onMapReady={_handleMapReady}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: 41.0094092,
          longitude: 28.9770532,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
          <MapViewDirections
              // TODO this is to create new directions, make it modular with way points if possible
              origin={{latitude: 41.016664, longitude: 28.922510}}
              destination={{latitude: 40.893749, longitude: 29.228901}}
              waypoints={ undefined }
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
              onError={(errorMessage) => {
                   console.log(errorMessage);
              }}
          />
        {Markers}
      </MapView>
      <View style={styles.buttons}>
        <Button
          title="Create a route plan !"
          onPress={() => {
            //TODO this should do something
            console.log('Create a route plan ! Pressed ');
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
              coordinates,
            );
            //TODO show a navigation with this value
            console.log('closest attraction is => ', closestAttraction);
          }}
        />
      </View>
      <SlidingUpPanel
        backdropOpacity={0}
        draggableRange={{top: height / 1.5, bottom: 0}}
        containerStyle={styles.container}
        ref={c => {
            if(this){
                this._panel = c
            }
        }}>
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
          //TODO put this FAB to somewher else
          actions={[
            {
              icon: 'message',
              label: 'Inbox',
              onPress: () => {
                navigation.navigate('Inbox');
              },
            },
            {
              icon: 'human-male-female',
              label: 'Friends',
              onPress: () => {
                navigation.navigate('Friends');
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
                  icon: 'map',
                  label: 'Destination',
                  onPress: () => {
                      navigation.navigate('Destination');
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
        />
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    flex:1,
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
      flex: 2,
    ...StyleSheet.absoluteFillObject,
  },
  buttons: {
    justifyContent: 'flex-end',
    flex: 3
  },
  callout: {
    width: 140,
    height: 140,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 30,
    bottom: -90,
  },
});

export default memo(Main);
