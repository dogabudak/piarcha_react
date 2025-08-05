import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ListItem} from 'react-native-elements';

interface AttractionsListSectionProps {
  attractions: any[];
}

export default function AttractionsListSection({attractions}: AttractionsListSectionProps) {
  return (
    <View style={styles.listSection}>
      <Text style={styles.sectionTitle}>Local Attractions</Text>
      <View style={styles.list}>
        {attractions?.map((l: any, i: any) => (
          <ListItem key={i} bottomDivider containerStyle={styles.listItem}>
            <ListItem.Content>
              <ListItem.Title style={styles.listItemTitle}>{l.name}</ListItem.Title>
              <ListItem.Subtitle style={styles.listItemSubtitle}>{l.name}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
  },
});