import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getPublicUser} from "../../redux/user/reducer";
import {useDispatch} from "react-redux";
import SearchBar from 'react-native-search-bar';
import {Avatar, ListItem} from "react-native-elements";
import Images from "../../images/images";

// TODO ===== A search bar from users should be implemented.


// TODO this is a dummy list, this should be a dynamic list of searched users
const defaultFriendsList = [
    {
        username: 'Your Best Friend',
        avatarImage: Images.Hike,
        details: 'Hey, how are you',
    },
    {
        username: 'A Girl from somewhere',
        avatarImage: Images.Trekking,
        details: 'Hello',
    },
    {
        username: 'A Guy from somewhere',
        avatarImage: Images.Bike,
        details: 'Hello',
    },
];
const Friends = () => {
    const dispatch = useDispatch();
    // TODO we should also render an avatar or profile pic or something similar ?

    useEffect(() => {
        // TODO this should come from outside
        // @ts-ignore
        dispatch(getPublicUser('dogabudak')).then(result => {
            // TODO next line is commented out because real list is not coming from backend
            // setFriends(result?.payload?.data);
        });
    }, [dispatch])
    const [friends, setFriends] = useState(defaultFriendsList);
    // TODO this search bar is useless
    const [search, setSearch] = useState('');
    const searchRef = React.createRef();
    console.log(friends)
    return (
    <View style={styles.page}>
        <SearchBar
            text={search}
            // @ts-ignore
            ref={searchRef}
            onChange={e => {}}
            onChangeText={setSearch}
            // @ts-ignore
            onSearchButtonPress={() => searchRef.current.blur()}
        />
        {friends.map((l, i) => (
            <ListItem key={i} bottomDivider hasTVPreferredFocus={undefined} tvParallaxProperties={undefined}>
                <Avatar source={l.avatarImage} />
                <ListItem.Content>
                    <ListItem.Title>{l.username}</ListItem.Title>
                    <ListItem.Subtitle>{l.details}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        ))}
    </View>
  );
};
const styles = StyleSheet.create({
  page: {
    marginTop: 50,
    flex: 1
  },
    formInput: {
        height: 50,
        width: 300,
        borderColor: 'silver',
        borderWidth: 2,
        margin: 5,
        textAlign: 'center',
        textDecorationStyle: 'solid',
        letterSpacing: 2,
    },
});
export default Friends;
