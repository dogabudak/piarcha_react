import React, {Component} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {Button, StyleSheet, View, TextInput} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';

class Login extends Component<> {
  state = {
    username: null,
    password: null,
  };
  componentDidUpdate() {
    if (this.props.token.login.token) {
      this.props.navigation.navigate('Main');
    }
  }
  googleSignIn = async () => {
    GoogleSignin.configure({
      iosClientId:
        '747114552067-367k5gh5d7asb2eu5ras6flbpfg8p5vm.apps.googleusercontent.com',
      // 747114552067-i3mq2qlg96mo3c9liffc2qf6tpkp43kk.apps.googleusercontent.com thats google
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log(error);
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log(error);
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log(error);
        // play services not available or outdated
      } else {
        console.log(error);
        // some other error happened
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: 50,
            borderColor: 'silver',
            borderWidth: 5,
            margin: 5,
            textAlign: 'center',
            backgroundColor: 'white',
            textDecorationStyle: 'solid',
            letterSpacing: 2,
          }}
          onChangeText={text => this.setState({username: text})}
          value={this.state.username}
          maxLength={40}
        />
        <TextInput
          style={{
            height: 50,
            borderColor: 'silver',
            borderWidth: 5,
            margin: 5,
            textAlign: 'center',
            textDecorationStyle: 'solid',
            letterSpacing: 2,
          }}
          onChangeText={text => this.setState({password: text})}
          value={this.state.password}
          maxLength={40}
        />
        <Button
          style={{backgroundColor: 'green'}}
          title="Login"
          onPress={() => {
            this.props.login(this.state.username, this.state.password);
          }}
        />
        <Button
          style={{backgroundColor: 'green'}}
          title="Continiue without login"
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}
        />
        <Button
          style={{backgroundColor: 'green'}}
          title="Create a New Profile! "
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}
        />
        <GoogleSigninButton
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.googleSignIn}
        />
        <LoginButton
          onLoginFinished={(error, result) => {
            if (error) {
              console.log('login has error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('login is cancelled.');
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log(data.accessToken.toString());
              });
            }
          }}
          onLogoutFinished={() => console.log('logout.')}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
});
const mapStateToProps = state => {
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
