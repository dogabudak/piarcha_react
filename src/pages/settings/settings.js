import React, {useState} from 'react';
import {View, Switch, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Settings() {

    const [isEnabled, setIsEnabled] = useState(false);
    const [language, setLanguage] = useState('English');
    const toggleSwitch = async () => {
        setIsEnabled(previousState => !previousState)
        await AsyncStorage.setItem('soundToggle', isEnabled)
    };
    const setLanguageValue = async (itemValue) => {
        setLanguage(itemValue);
        await AsyncStorage.setItem('appLanguage', itemValue)
    };

    return (
        <View style={styles.page}>
            <Switch
                trackColor={{false: '#767577', true: '#e05d1d'}}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
            <Picker
                selectedValue={language}
                style={{height: 50, width: 100}}
                onValueChange={setLanguageValue}>
                <Picker.Item label="English" value="english"/>
                <Picker.Item label="Turkish" value="turkish"/>
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});
