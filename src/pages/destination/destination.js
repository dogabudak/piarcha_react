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
  const [coordinates, setCoordinates] = useState([]);
  const [tourList, setTourList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO instead of this .then you can use useSelector
    dispatch(getAvailableCountries()).then(result => {
      setCountries(result.payload.data.countries);
    });
  }, [dispatch]);
  useEffect(() => {
        // TODO instead of this .then you can use useSelector
    dispatch(getAvailableCities(country)).then(result => {
      setCities(result.payload.data);
    });
  }, [country, dispatch]);
  useEffect(() => {
        // TODO instead of this .then you can use useSelector
    dispatch(getCoordinates(city)).then(result => {
      setCoordinates(result.payload.data.coordinates);
      setTourList(result.payload.data.tours)
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
            onValueChange={itemValue => setCountry(itemValue)}>
            {listToPickerItem(countries)}
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={city}
            onValueChange={itemValue => setCity(itemValue)}>
            {listToPickerItem(cities)}
          </Picker>
        </View>
      </View>
      <View style={styles.list}>
        {tourList.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar source={Images[l.type]} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.shortDescription}</ListItem.Subtitle>
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
