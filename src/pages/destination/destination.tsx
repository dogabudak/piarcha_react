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

const listToPickerItem = (listToConvert: any) => {
  return listToConvert?.map((eachValue: string) => (
    <Picker.Item key ={`${eachValue}_destination_list`} label={eachValue} value={eachValue} />
  ));
};
export default function Destination() {
  const [country, setCountry] = useState('Turkey');
  const [city, setCity] = useState({});

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const countries = useSelector((state: any) => state.cityList.availableCountries);
  const cities = useSelector((state: any) => state.cityList.availableCities);
  const coordinates = useSelector((state: any) => state.cityList.coordinates);
  const tourList = useSelector((state: any) => state.cityList.tours);
  // TODO bu sayfanin UX'i cok kotu bunu duzelt
  useEffect(() => {
    try {
      dispatch(getAvailableCountries());
    } catch (e) {
      // TODO without try catch it doesnt work
      console.log(e)
    }
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
        {tourList?.map((l:any, i: any) => (
          <ListItem
              key={i}
              bottomDivider
              onPress={() => navigation.navigate('Tour', {locationName: l.id})} hasTVPreferredFocus={undefined}
              tvParallaxProperties={undefined}>

            <Avatar
                // @ts-ignore
                source={Images[l.type]}
            />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.shortDescription}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <View style={styles.list}>
        {coordinates?.map((l: any, i: any) => (
          <ListItem key={i} bottomDivider hasTVPreferredFocus={false} tvParallaxProperties={false}>
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
