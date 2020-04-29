import React, {Component} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {Button, StyleSheet, View, TextInput} from 'react-native';
import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';

class Login extends Component<> {
  state = {
    username: null,
    password: null,
  };

  googleSignIn = async () => {
    GoogleSignin.configure({
      iosClientId:
        '747114552067-367k5gh5d7asb2eu5ras6flbpfg8p5vm.apps.googleusercontent.com',
    });

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
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
            // TODO not evaluating the result
            this.props.login(this.state.username, this.state.password);
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
