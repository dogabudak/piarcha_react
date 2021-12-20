import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Images from '../../images/images';
import {Avatar, ListItem} from 'react-native-elements';

// TODO messages should come from db
const messageList = [
  {
    name: 'Your Best Friend',
    avatarImage: Images.Hiker,
    subtitle: 'Hey, how are you',
  },
  {
    name: 'A Girl from somewhere',
    avatarImage: Images.TrekkingImage,
    subtitle: 'Hello',
  },
  {
    name: 'A Guy from somewhere',
    avatarImage: Images.Bicycle,
    subtitle: 'Hello',
  },
];
const Inbox = () => {
  return (
    <View style={styles.page}>
      <View>
        <Text>Select your destination</Text>
      </View>
      <View style={styles.list}>
        {messageList.map((l, i) => (
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
};
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
});
export default Inbox;
