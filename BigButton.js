import { Pressable, StyleSheet, Text } from "react-native";

export default function BigButon({onPress, title, style}) {

    return (
        <Pressable 
            onPress={onPress} 
            style={[styles.button, style]}
        >
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#666',
        padding: 5,
        borderRadius: 20,
        borderWidth: 1,
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },

})