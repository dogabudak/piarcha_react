import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button(props) {
    const { onPress, title } = props;
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        marginBottom: 5,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 1,
        elevation: 3,
        backgroundColor: 'orange',
    },
    text: {
        fontSize: 12,
        lineHeight: 15,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
