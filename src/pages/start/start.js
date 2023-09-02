import React, {Component} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {
  ImageBackground,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/viewComponents/pressable";

const {height} = Dimensions.get('window');
const isValidToken = (token) => {
  // TODO maybe check validation here
  const [credentials, extras, secret] = token.split('.');
  return true
}
class Start extends Component<> {
  state = {
    username: null,
    password: null,
  };
  componentDidMount() {
    AsyncStorage.getItem('@token').then(async (token)=>{
      if(token){
        if(isValidToken(token)){
          this.props.navigation.navigate('Main');
        }else {
          await AsyncStorage.removeItem('@token')
        }
      }
    })
  }

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
      // TODO use this userinfo
      console.log(userInfo);
    } catch (error) {
      switch (error.code) {
        // user cancelled the login flow
        case statusCodes.SIGN_IN_CANCELLED:
        // operation (e.g. sign in) is in progress already
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
        // play services not available or outdated
        case statusCodes.IN_PROGRESS:
        default:
          console.log(error);
          break;
      }
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../images/backgrounds/morning.png')}
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
              title="Forgot password ? "
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword');
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
              // TODO this looks weird in android
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
    gap: 10,
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
    flexDirection:'column',
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
