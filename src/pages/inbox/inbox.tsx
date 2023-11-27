import React from 'react';
import { StyleSheet, View} from 'react-native';
import Images from '../../images/images';
import {Avatar, ListItem} from 'react-native-elements';
import Button from "../../components/viewComponents/pressable";

// TODO messages should come from db
// TODO chatroom endpoints and users are ready in backend, but not here
// TODO find users should find !
const messageList = [
  {
    name: 'Your Best Friend',
    avatarImage: Images.Hike,
    subtitle: 'Hey, how are you',
  },
  {
    name: 'A Girl from somewhere',
    avatarImage: Images.Trekking,
    subtitle: 'Hello',
  },
  {
    name: 'A Guy from somewhere',
    avatarImage: Images.Bike,
    subtitle: 'Hello',
  },
];
const Inbox = () => {
  return (
    <View style={styles.page}>
      <View>
        {messageList.map((l, i) => (
          <ListItem key={i} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
            <Avatar source={l.avatarImage} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
              <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
      <Button title="Find other users " />
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    marginTop: 50,
    flex: 1
  },
});
export default Inbox;
