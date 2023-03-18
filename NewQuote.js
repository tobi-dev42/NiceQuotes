import { useState } from 'react';
import { Modal, Text, StyleSheet, Pressable, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import BigButon from './BigButton';
import IconButton from './IconButton';

export default function NewQuote({visible, onCancel, onSave}) {

    const [content, setContent] = useState('');
    const [name, setName] = useState('');

    function saveQuote() {

        const newContent = content.trim();
        const newName = name.trim();

        if (newContent.length === 0 || newName.length === 0) {
            alert('Inhalt und Name dürfen nicht leer sein.')
            return;
        }

        onSave(content, name)
        setContent('');
        setName('');

    }

    function cancelEditing() {
        onCancel();
        setName('');
        setContent('');
    }

    return ( 
        <Modal visible={visible} animationType="slide" onRequestClose={cancelEditing}>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
            
                <IconButton onPress={cancelEditing} icon="arrow-back-ios" style={styles.back} />

                <TextInput 
                    placeholder='Inhalt' 
                    multiline={true} 
                    onChangeText={setContent}
                    style={[styles.input, styles.inputContent]} 
                />
                
                <TextInput 
                    placeholder='Name' 
                    returnKeyType='done'
                    onChangeText={setName}
                    onSubmitEditing={() => saveQuote()}
                    style={styles.input}
                /> 

                <BigButon title="Speichern" onPress={() => saveQuote()} />

            </KeyboardAvoidingView> 
        </Modal>
    )
}   

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input: {
        marginBottom: 10,
        fontSize: 18,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        borderColor: '#999',
        borderRadius: 5,
    },

    inputContent: {
        height: 150,
        textAlignVertical: 'top',
    },

    back: {
        position: "absolute",
        top: 50,
        left: 20,
    }
  
});