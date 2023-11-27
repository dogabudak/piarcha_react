import React, {useState} from 'react';

import {
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';

import {forgotPassword} from '../../redux/user/reducer';
import {connect} from 'react-redux';
import Button from "../../components/viewComponents/pressable";

const {width} = Dimensions.get('window');
function ForgotPassword(props: any) {
  const [email, setEmail] = useState('');

  return (
      <View style={styles.container}>
        <Image source={require('../../images/logo.png')} />
        <View style={styles.buttons}>
          <TextInput
              style={styles.textInput}
              onChangeText={text => setEmail(text)}
              placeholder={'Please enter your E-Mail address'}
              value={email}
              maxLength={40}
          />
          <Button
              title="Forward"
              // TODO on press should make something ! Now not doing anything
              onPress={() => {
                props.forgotPassword(email);
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
});
const mapStateToProps = (state: any) => {
  return {
    email: state.email,
  }
};
const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
