import React, {Component} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  Button,
  ImageBackground,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';

const {height} = Dimensions.get('window');
import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';

class Start extends Component<> {
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
        <ImageBackground
          source={require('../../images/background.jpg')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.buttons}>
            <Button
              title="Sign Up For Free"
              onPress={() => {
                this.props.navigation.navigate('Register');
              }}
            />
            <Button
              style={{backgroundColor: 'green'}}
              title="Login"
              onPress={() => {
                this.props.navigation.navigate('Login');
              }}
            />
            <Button
              title="Continue without login"
              onPress={() => {
                this.props.navigation.navigate('Main');
              }}
            />
            <Button
              title="Tutorial"
              onPress={() => {
                this.props.navigation.navigate('Tutorial');
              }}
            />
          </View>
          <View style={styles.socialLogin}>
            <GoogleSigninButton
              style={{width: height / 4, height: 48}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.googleSignIn}
            />
            <LoginButton
              style={{width: height / 4.15, height: 42}}
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
              //TODO be able to logout somehow
              onLogoutFinished={() => console.log('logout.')}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  socialLogin: {
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
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
)(Start);
