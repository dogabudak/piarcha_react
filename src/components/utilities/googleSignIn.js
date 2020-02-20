import React from 'react'
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

class googleSignIn extends React.Component {
  state = {
    photo: undefined
  }

  render() {
    const { photo } = this.state;
    return (
      <div style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      </div>
    )
  }
}
export default googleSignIn;

