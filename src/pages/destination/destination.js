import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Picker} from '@react-native-community/picker';
import {ListItem, Avatar} from 'react-native-elements';
import {
  getAvailableCountries,
  getAvailableCities,
} from '../../redux/cityList/reducer';
import {Text} from 'react-native-paper';
import Images from '../../images/images';
//TODO get this list from locations project
const list = [
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
        <View>
          <Text>Select your destination</Text>
        </View>
        <View style={styles.locations}>
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
        <View style={styles.list}>
          {list.map((l, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar source={l.avatarImage} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      </View>
    );
  }
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
