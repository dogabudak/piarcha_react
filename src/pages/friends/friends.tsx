import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {getPublicUser} from "../../redux/user/reducer";
import {useDispatch} from "react-redux";
import SearchBar from 'react-native-search-bar';

// TODO ===== A search bar from users should be implemented.

const Friends = () => {
    const dispatch = useDispatch();
    // TODO we should also render an avatar or profile pic or something similar ?

    useEffect(() => {
        // TODO this should come from outside
        // @ts-ignore
        dispatch(getPublicUser('dogabudak')).then(result => {
            setPublicUser(result?.payload?.data);
        });
    }, [dispatch])
    const [publicUser, setPublicUser] = useState({username:'', gender:'', birthdate:''});
    // TODO this search bar is useless
    const [search, setSearch] = useState('');
    const searchRef = React.createRef();

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

        <Text>{publicUser?.username}</Text>
        <Text>{publicUser?.gender}</Text>
        <Text>{publicUser?.birthdate}</Text>
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
