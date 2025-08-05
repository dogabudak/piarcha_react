import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({title, subtitle}: PageHeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
      <Text style={styles.headerSubtext}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});