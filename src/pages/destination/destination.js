import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Images from '../../images/images';
import {ListItem, Avatar} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {
  getAvailableCountries,
  getAvailableCities,
  getCoordinates,
} from '../../redux/cityList/reducer';

const tourList = [
  {
    name: 'Initial Historical Tour',
    avatarImage: Images.Hiker,
    subtitle: '1 Hour',
  },
  {
    name: 'Detailed amazing tour',
    avatarImage: Images.TrekkingImage,
    subtitle: '2 Hours',
  },
  {
    name: 'Bicycle tour',
    avatarImage: Images.Bicycle,
    subtitle: '2 Hours',
  },
];

const listToPickerItem = listToConvert => {
  return listToConvert?.map(eachValue => (
    <Picker.Item label={eachValue} value={eachValue} />
  ));
};
export default function Destination() {
  const [country, setCountry] = useState('Turkey');
  const [city, setCity] = useState(null);
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [coordinates, setCoorditanes] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAvailableCountries()).then(result => {
      setCountries(result.payload.data.countries);
    });
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAvailableCities(country)).then(result => {
      setCities(result.payload.data.cities);
    });
  }, [country, dispatch]);
  useEffect(() => {
    dispatch(getCoordinates(city)).then(result => {
      setCoorditanes(result.payload.data.locations);
    });
  }, [city, dispatch]);
  return (
    <View style={styles.page}>
      <View>
        <Text>Select your destination</Text>
      </View>
      <View style={styles.locations}>
        <View style={styles.picker}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}>
            {listToPickerItem(countries)}
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={city}
            onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
            {listToPickerItem(cities)}
          </Picker>
        </View>
      </View>
      <View style={styles.list}>
        {tourList.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={l.avatarImage} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={styles.list}>
        {coordinates.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  locations: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    flexShrink: 2,
  },
  picker: {
    flex: 1,
  },
  list: {
    flex: 1,
    flexGrow: 3,
  },
  page: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    flex: 1,
  },
});
