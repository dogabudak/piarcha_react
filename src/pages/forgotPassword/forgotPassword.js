import React, {Component} from 'react';

import {
  Button,
  Dimensions,
  StyleSheet,
  View,
  TextInput,
  Image,
} from 'react-native';

import {forgotPassword} from '../../redux/user/reducer';
import {connect} from 'react-redux';

const {width} = Dimensions.get('window');
class ForgotPassword extends Component {
  state = {
    email: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        <View style={styles.buttons}>
          <TextInput
            style={styles.textInput}
            onChangeText={text => this.setState({username: text})}
            placeholder={'Please enter your E-Mail address'}
            value={this.state.email}
            maxLength={40}
          />
          <Button
            title="Forward"
            onPress={() => {
              this.props.forgotPassword(this.state.email);
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
});

const mapDispatchToProps = {
  forgotPassword,
};

export default connect(mapDispatchToProps)(ForgotPassword);
