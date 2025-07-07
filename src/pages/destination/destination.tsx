import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Select your next destination</Text>
        <Text style={styles.headerSubtext}>Choose a country and city to explore amazing tours and attractions</Text>
      </View>
      
      {/* Location Selection Section */}
      <View style={styles.locationSection}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locations}>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Country</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={country}
                onValueChange={itemValue => setCountry(itemValue)}
                style={styles.pickerStyle}>
                {listToPickerItem(countries)}
              </Picker>
            </View>
          </View>
          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>City</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={city}
                onValueChange={itemValue => setCity(itemValue)}
                style={styles.pickerStyle}>
                {listToPickerItem(cities)}
              </Picker>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Available Tours</Text>
        <View style={styles.list}>
          {tourList?.map((l:any, i: any) => (
            <ListItem
                key={i}
                bottomDivider
                onPress={() => navigation.navigate('Tour', {locationName: l.id})}
                containerStyle={styles.listItem}>
              <Avatar
                  // @ts-ignore
                  source={Images[l.type]}
                  size="medium"
                  rounded
              />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{l.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>{l.shortDescription}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron color="#007AFF" />
            </ListItem>
          ))}
        </View>
      </View>
      
      <View style={styles.listSection}>
        <Text style={styles.sectionTitle}>Local Attractions</Text>
        <View style={styles.list}>
          {coordinates?.map((l: any, i: any) => (
            <ListItem key={i} bottomDivider containerStyle={styles.listItem}>
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{l.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.listItemSubtitle}>{l.name}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Download Guide" 
          onPress={() => {
            // TODO This should really download something
            return console.log('Download')
          }}
          color="#007AFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtext: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
  },
  locationSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
  locations: {
    flexDirection: 'row',
    gap: 12,
  },
  pickerContainer: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#e1e5e9',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  pickerStyle: {
    height: 50,
  },
  listSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  list: {
    flex: 1,
  },
  listItem: {
    borderRadius: 8,
    marginVertical: 2,
    backgroundColor: '#fafafa',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  listItemSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  buttonContainer: {
    margin: 16,
    marginTop: 8,
  },
});
