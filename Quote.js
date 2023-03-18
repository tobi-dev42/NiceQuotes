
import {  Text, StyleSheet, View  } from 'react-native';

export default function Quote({author, text}) {

  return (
  <View style={styles.container}>  
    <Text style={styles.text}>{text}</Text>
    <Text style={styles.author}>&ndash; {author}</Text>
  </View>
  );  
}  


 
// Styles
const styles = StyleSheet.create({

  text: { 
    fontSize: 38, 
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  
  author: { 
    fontSize: 20, 
    fontStyle: 'normal',
    textAlign: "right",
    marginTop: 8,
    marginRight: 20,
  },

  container: {
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 20,
  }

});