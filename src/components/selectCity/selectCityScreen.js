
import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { getAvailableCities } from '../../redux/cityList/reducer';

class citySelect extends Component {
  componentDidMount() {
    this.props.getAvailableCities();
  }
  renderItem = ({ item }) => {
    console.log(item)
    return (
    <View style={styles.item}>
      <Text>{item}</Text>
    </View>
  )};
  render() {
    const { cities } = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={cities}
        keyExtractor={cities => cities}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  return {
    cities: state.availableCities.cities
  };
};

const mapDispatchToProps = {
  getAvailableCities
};

export default connect(mapStateToProps, mapDispatchToProps)(citySelect);
