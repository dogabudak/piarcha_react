import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');
import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';
import Button from "../../components/viewComponents/pressable";
import {useNavigation} from "@react-navigation/native";
function Login(props:any) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    if(props.token.login.token){
      AsyncStorage.setItem('@token', props.token.login.token).then(()=>{
        navigation.navigate('Main');
      })
    }
  }, [props.token.login.token]);
  return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        <View style={styles.buttons}>
          <TextInput
              style={styles.textInput}
              onChangeText={text => setUsername(text)}
              placeholder={'Username'}
              value={username}
              maxLength={40}
          />
          <TextInput
              style={styles.textInput}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              placeholder={'Password'}
              value={password}
              maxLength={40}
          />
          <Button
              style={{backgroundColor: 'green'}}
              title="Login"
              onPress={() => {
                props.login(username, password);
              }}
          />
        </View>
      </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  buttons: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    width: width / 1.5,
    borderColor: 'silver',
    borderWidth: 5,
    margin: 5,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    letterSpacing: 2,
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapStateToProps = (state :any) => {
  return {
    token: state,
  };
};
const mapDispatchToProps = {
  login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
