import React, {useState} from 'react';
import {
  View,
  Button,
  Platform,
  TextInput,
  Text,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectPicture from '../../components/utilities/selectPicture';
import {useForm, Controller} from 'react-hook-form';
import {setUserInformation} from '../../redux/user/user';
import {useDispatch} from 'react-redux';

export default function Profile() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    dispatch(setUserInformation(data));
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  // TODO country and city that he is from
  // TODO fetch data here from db or save the data here in phone
  // TODO intrested in ? (like coffee, long walks beer etc.)
  // TODO countries you want to visit from the list
  // TODO Privacy
  return (
    <View>
      <SelectPicture />
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
        defaultValue={new Date()}
        name="birthdate"
        rules={{required: true}}
        render={({onChange, onBlur, value}) =>
          show && (
            <DateTimePicker
              testID="dateTimePicker"
              mode={mode}
              value={value}
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                setShow(Platform.OS === 'ios');
                onChange(value);
              }}
            />
          )
        }
      />
      <Button onPress={showDatepicker} title="Show date picker!" />
      <Button title="Update" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
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
