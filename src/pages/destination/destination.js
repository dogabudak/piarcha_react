import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Images from '../../images/images';
import {ListItem, Avatar} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAvailableCountries,
  getAvailableCities,
  getCoordinates,
} from '../../redux/cityList/reducer';
import {useNavigation} from '@react-navigation/native';

const listToPickerItem = listToConvert => {
  return listToConvert?.map(eachValue => (
    <Picker.Item label={eachValue} value={eachValue} />
  ));
};
export default function Destination() {
  const [country, setCountry] = useState('Turkey');
  const [city, setCity] = useState(null);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const countries = useSelector(state => state.cityList.availableCountries);
  const cities = useSelector(state => state.cityList.availableCities);
  const coordinates = useSelector(state => state.cityList.coordinates);
  const tourList = useSelector(state => state.cityList.tours);
  // TODO bu sayfanin UX'i cok kotu bunu duzelt
  useEffect(() => {
    dispatch(getAvailableCountries());
  }, [dispatch]);
  useEffect(() => {
    if(countries.length > 0 ){
      dispatch(getAvailableCities(country))
    }
  }, [dispatch, country]);

  useEffect(() => {
    if(city){
      dispatch(getCoordinates(city));
    }
  }, [dispatch, cities, city]);

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
        {tourList?.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigation.navigate('Tour', {locationName: l.id})}>
            <Avatar source={Images[l.type]} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.shortDescription}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={styles.list}>
        {coordinates?.map((l, i) => (
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
