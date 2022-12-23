import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';

const {width} = Dimensions.get('window');
import {login} from '../../redux/login/reducer';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    username: null,
    password: null,
  };
  componentDidUpdate() {
    if (this.props.token.login.token) {
      AsyncStorage.setItem('@token', this.props.token.login.token).then(()=>{
        this.props.navigation.navigate('Main');
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        <View style={styles.buttons}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({username: text})}
            placeholder={'Username'}
            value={this.state.username}
            maxLength={40}
          />
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={text => this.setState({password: text})}
            placeholder={'Password'}
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
        </View>
      </View>
    );
  }
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
