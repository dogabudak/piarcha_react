import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getPublicUser, searchUser} from "../../redux/user/reducer";
import {connect, useDispatch} from "react-redux";
import SearchBar from 'react-native-search-bar';
import {Avatar, ListItem} from "react-native-elements";
import Images from "../../images/images";
import {login} from "../../redux/login/reducer";

// TODO ===== A search bar from users should be implemented.


// TODO this is a dummy list, this should be a dynamic list of searched users
let defaultFriendsList = [
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

const Friends = (props: any) => {
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
    const [users, setUsers] = useState(defaultFriendsList);
    const [search, setSearch] = useState('');
    const searchRef = React.createRef();
    const searchFunction = (search: string) => {
        if(search?.length >4){
            // TODO this is a real search, but the results looks ugly
            props.searchUser(search).then((result : any) => {
                setUsers(result?.payload?.data);
            })
        }
    }
    return (
    <View style={styles.page}>
        <SearchBar
            text={search}
            // @ts-ignore
            ref={searchRef}
            onChangeText={searchFunction}
            onSearchButtonPress={(e) => {
                searchFunction(e);
                // @ts-ignore
                searchRef.current.blur()
            }}
        />
        {(users || friends).map((l, i) => (
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
const mapStateToProps = (state :any) => {
    return {
        users: state,
    };
};
const mapDispatchToProps = {
    searchUser,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Friends);
