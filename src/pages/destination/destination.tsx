import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAvailableCountries,
  getAvailableCities,
  getCoordinates,
} from '../../redux/cityList/reducer';
import {useNavigation} from '@react-navigation/native';
import PageHeader from '../../components/viewComponents/PageHeader';
import LocationSelector from '../../components/viewComponents/LocationSelector';
import TourListSection from '../../components/viewComponents/TourListSection';
import AttractionsListSection from '../../components/viewComponents/AttractionsListSection';


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
      <PageHeader 
        title="Select your next destination"
        subtitle="Choose a country and city to explore amazing tours and attractions"
      />
      
      <LocationSelector
        countries={countries}
        cities={cities}
        selectedCountry={country}
        selectedCity={city}
        onCountryChange={setCountry}
        onCityChange={setCity}
      />
      
      <TourListSection
        tourList={tourList}
        onTourPress={(tourId) => navigation.navigate('Tour', {locationName: tourId})}
      />
      
      <AttractionsListSection attractions={coordinates} />
      
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
  buttonContainer: {
    margin: 16,
    marginTop: 8,
  },
});
