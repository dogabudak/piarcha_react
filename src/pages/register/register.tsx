import React from 'react';
import {
    Text,
    View,
    ImageBackground,
    TextInput,
    StyleSheet,
} from 'react-native';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {register} from '../../redux/user/reducer';
import {useDispatch} from 'react-redux';
import Button from "../../components/viewComponents/pressable";
type FormValues =  { password: string; passwordDuplication: string; username: string;}

export default function Register(props: { navigation: { navigate: (arg0: string) => void } }) {
    const {control, getValues, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const dispatch = useDispatch();
    const onSubmit: SubmitHandler<FormValues>  = async (data) => {
        if (data?.passwordDuplication !== data.password) {
            return;
        }
        dispatch(register(data));
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
                    render={({field: {onChange, onBlur, value}}) => (
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
                    render={({field: {onChange, onBlur, value}}) => (
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
                    render={({field: {onChange, onBlur, value}}) => (
                        <TextInput
                            style={styles.formInput}
                            onBlur={onBlur}
                            secureTextEntry={true}
                            onChangeText={value => onChange(value)}
                            value={value}
                            placeholder={'re-enter password'}
                        />
                    )}
                    name="passwordDuplication"
                    rules={{required: true}}
                    defaultValue=""
                />
                {(getValues('passwordDuplication') !== getValues('password') ||
                    errors.passwordDuplication) && (
                    <Text style={styles.error}>Please re-enter your password</Text>
                )}
                <Button title="Register" onPress={handleSubmit(onSubmit)}/>
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
