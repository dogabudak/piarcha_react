import React from 'react';
import {Text, View, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

export default function Register(props) {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = data => {
    console.log(data);
    // TODO send data to create profile service
    props.navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require('../../images/logo.png')} />
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              placeholder={'Your name!'}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="firstName"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.firstName && <Text>This is required.</Text>}

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Your lastname!'}
            />
          )}
          name="lastName"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.lastName && <Text>This is required.</Text>}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              autoCompleteType={'email'}
              keyboardType={'email-address'}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'E-mail'}
            />
          )}
          name="email"
          rules={{required: true}}
          defaultValue=""
        />
        {errors.email && <Text>This is required.</Text>}
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.formInput}
              onBlur={onBlur}
              keyboardType={'phone-pad'}
              onChangeText={value => onChange(value)}
              value={value}
              placeholder={'Phone number'}
            />
          )}
          name="phonenumber"
          defaultValue=""
        />
        {errors.phonenumber && <Text>This is required.</Text>}
      </View>
      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    height: 50,
    width: 300,
    borderColor: 'silver',
    borderWidth: 2,
    margin: 5,
    textAlign: 'center',
    textDecorationStyle: 'solid',
    letterSpacing: 2,
  },
});
