import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';

import {
  getAvailableCountries,
  getAvailableCities,
} from '../../redux/cityList/reducer';
import {Text} from 'react-native-paper';

class Destination extends Component {
  state = {
    country: 'Turkey',
    city: null,
  };
  componentDidMount() {
    this.props.getAvailableCountries();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.country !== this.state.country) {
      this.props.getAvailableCities(this.state.country);
    }
  }
  listToPickerItem(list) {
    return list?.map(eachValue => (
      <Picker.Item label={eachValue} value={eachValue} />
    ));
  }
  render() {
    const {countries, cities} = this.props;
    return (
      <View style={styles.page}>
        <View style={styles.picker}>
          <Picker
            selectedValue={this.state.country}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              this.setState({country: itemValue});
            }}>
            {this.listToPickerItem(countries)}
          </Picker>
        </View>
        <View style={styles.item}>
          <Text>Available Cities</Text>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={this.state.city}
            style={{height: 50, width: 150}}
            onValueChange={itemValue => {
              this.setState({city: itemValue});
            }}>
            {this.listToPickerItem(cities)}
          </Picker>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    padding: 16,
  },
  picker: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    countries: state?.cityList?.availableCountries || [],
    cities: state?.cityList?.availableCities || [],
  };
};

const mapDispatchToProps = {
  getAvailableCountries,
  getAvailableCities,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Destination);
