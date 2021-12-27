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

export default function Register(props) {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = data => {
    console.log(data);
    // TODO send data to create profile service
    props.navigation.navigate('Main');
  };

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
