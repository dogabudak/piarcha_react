import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {register} from '../../redux/user/reducer';
import {useDispatch} from 'react-redux';

export default function Register(props) {
  const {control, getValues, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();
  const onSubmit = async data => {
    if (data.passwordDuplicaiton !== data.password) {
      return;
    }
    dispatch(register(data));
    props.navigation.navigate('Main');
  };
  // TODO Create a proper register page (only a form page is stupid, maybe create a couple pages which shares states, when you click register in the end send customer to the register sercive)
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../images/backgrounds/morning.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              placeholder={'Username or email'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="username"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.username && (
          <Text style={styles.error}>Please enter a user name</Text>
        )}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              secureTextEntry={true}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Password'}
            />
          )}
          name="password"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.error}>Please enter a password</Text>
        )}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              secureTextEntry={true}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'re-enter password'}
            />
          )}
          name="passwordDuplicaiton"
          rules={{required: true}}
          defaultValue=""
        />
        {(getValues('passwordDuplicaiton') !== getValues('password') ||
          errors.passwordDuplicaiton) && (
          <Text style={styles.error}>Please re-enter your password</Text>
        )}
        <Button title="Register" onPress={handleSubmit(onSubmit)} />
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
  },
  formInput: {
    height: 50,
    borderColor: 'silver',
    borderWidth: 2,
    margin: 5,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    letterSpacing: 2,
  },
});
