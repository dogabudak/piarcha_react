import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getPublicUser} from "../../redux/user/reducer";
import {useDispatch} from "react-redux";

// TODO A search bar from users should be implemented.

const Friends = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        // TODO this should come from outside
        dispatch(getPublicUser('dogabudak')).then(result => {
            setPublicUser(result.payload.data);
        });
    }, [dispatch])
    const [publicUser, setPublicUser] = useState([]);
    // TODO we should also render an avatar or profile pic or something similar ?
    return (
    <View style={styles.page}>
        <Text>{publicUser.username}</Text>
        <Text>{publicUser.gender}</Text>
        <Text>{publicUser.birthdate}</Text>
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
