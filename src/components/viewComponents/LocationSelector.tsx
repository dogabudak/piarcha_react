import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface LocationSelectorProps {
  countries: string[];
  cities: string[];
  selectedCountry: string;
  selectedCity: any;
  onCountryChange: (country: string) => void;
  onCityChange: (city: any) => void;
}

const listToPickerItem = (listToConvert: any) => {
  return listToConvert?.map((eachValue: string) => (
    <Picker.Item key={`${eachValue}_destination_list`} label={eachValue} value={eachValue} />
  ));
};

export default function LocationSelector({
  countries,
  cities,
  selectedCountry,
  selectedCity,
  onCountryChange,
  onCityChange,
}: LocationSelectorProps) {
  return (
    <View style={styles.locationSection}>
      <Text style={styles.sectionTitle}>Location</Text>
      <View style={styles.locations}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Country</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={itemValue => onCountryChange(itemValue)}
              style={styles.pickerStyle}>
              {listToPickerItem(countries)}
            </Picker>
          </View>
        </View>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>City</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={selectedCity}
              onValueChange={itemValue => onCityChange(itemValue)}
              style={styles.pickerStyle}>
              {listToPickerItem(cities)}
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});