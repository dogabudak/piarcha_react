import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View} from 'react-native';

export default function CustomCallout(props) {
  return (
      <View style={[styles.container]}>
        <View style={styles.bubble}>
          <View style={styles.amount}>{props.children}</View>
        </View>
        <View style={styles.arrowBorder} />
        <View style={styles.arrow} />
      </View>
  );
}

CustomCallout.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#18bbcd',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#ffffff',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#ffffff',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});