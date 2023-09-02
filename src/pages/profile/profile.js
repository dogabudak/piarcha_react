import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  TextInput,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectPicture from '../../components/utilities/selectPicture';
import {useForm, Controller} from 'react-hook-form';
import {setUserInformation, getUserInformation} from '../../redux/user/reducer';
import {useDispatch, useSelector} from 'react-redux';
import MultiSelect from "react-native-multiple-select";
import languages from 'languages-list';
import Button from "../../components/viewComponents/pressable";

const normalizedLanguages = languages.map((eachLanguage)=>{
    return {id: eachLanguage, name: eachLanguage}
})
export default function Profile() {
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [preferredLanguages, setPreferredLanguages] = useState([]);
  const {firstName, lastName} = useSelector(state => ({
    firstName: state.user.firstName,
    lastName: state.user.lastName,
  }));
   const onSelectedItemsChange = selectedItems => {
       setPreferredLanguages(selectedItems);
    };
  const {control, handleSubmit, errors} = useForm();
  const dispatch = useDispatch();

  const onSubmit = async data => {
    dispatch(setUserInformation({...data, preferredLanguages}));
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  useEffect(() => {
    dispatch(getUserInformation());
  }, [dispatch]);
  // TODO country and city that he is from
  // TODO intrested in ? (like coffee, long walks beer etc.)
  // TODO countries you want to visit from the list
  // TODO Privacy
  // TODO User shouldnt be able to open here if he did not logged in
  // TODO preferred languages, when click outside should close the dropdown
  // TODO style here is horrible
   let multiSelect= {}
  return (
      <View style={styles.container}>
        <ImageBackground
        source={require('../../images/backgrounds/evening.png')}
        resizeMode="cover"
        style={styles.backgroundImage}>
      <SelectPicture />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formInput}
            onBlur={onBlur}
            placeholder={'Your name!'}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="firstName"
        defaultValue={firstName}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={'Your lastname!'}
          />
        )}
        name="lastName"
        defaultValue={lastName}
      />
      <Controller
        control={control}
        defaultValue={new Date()}
        name="birthdate"
        render={({ field: { onChange, onBlur, value } }) =>
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
        <Controller
            control={control}
            defaultValue={''}
            name="languagesList"
            render={({ field: { onChange, onBlur, value } }) =>
                <MultiSelect
                    items={normalizedLanguages}
                    uniqueKey="id"
                    ref={(component) => { multiSelect = component }}
                    onSelectedItemsChange={onSelectedItemsChange}
                    selectedItems={preferredLanguages}
                    selectText="Pick Languages you can speak!"
                    fixedHeight={ true }
                    searchInputPlaceholderText="Search Items..."
                    submitButtonText="Submit"
                />
            }
        />
      <Button title="Update" onPress={handleSubmit(onSubmit)} />
        </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
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
