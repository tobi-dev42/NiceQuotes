import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SQLite from 'expo-sqlite';

import BigButon from './BigButton';
import IconButton from './IconButton';
import Quote from './Quote';
import NewQuote from './NewQuote';
import Firebase from './Firebase';

//const database = SQLite.openDatabase('quotes.db'); // wird auf dem Handy abgelegt




export default function App() {
  const [index, setIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [showNewDialog, setShowNewDialog] = useState(false);

  useEffect(() => {
    // TODO Firebase.init();
    Firebase.init();
    loadQuotes();
  }, []); // [] = nur 1x -->  Ziate beim Start der App laden (1x beim Starten) 



  function addQuoteToList(text, author) {
      setShowNewDialog(false);
      const newQuotes = [
        ...quotes,
        {text, author},
      ];
      setQuotes(newQuotes); 
      setIndex(newQuotes.length - 1); 
      saveQuotes(text, author, newQuotes);
  }

  function removeQuoteFromList() {

    const newQuotes = [...quotes];
    const id = quotes[index].id;

    newQuotes.splice(index, 1); // löscht ab index 1 element
    setIndex(0);
    setQuotes(newQuotes);

    // TODO: Zitat aus Firebase löschen
    Firebase.removeQuote(id);


  }

  function deleteQuote() {
    Alert.alert(
      'Zitat löschen löschen',
      'Soll das aktuelle Zitat wirklich gelöscht werden?',
      [
        {
          text: 'abbrechen',
          style: 'cancel',
        },
        {
          text: 'Bestätigen',
          style: 'destructive',
          onPress: removeQuoteFromList,
        }
      ]
    );
  }

  async function saveQuotes(text, author, newQuotes) {
    // Zitat in Firebase speichern
    const id = await Firebase.saveQuote(text,author);
    newQuotes[newQuotes.length -1].id = id;
    setQuotes(newQuotes);


    // AsyncStorage
    // AsyncStorage.setItem('QUOTES', JSON.stringify(newQuotes));  
    
    /*
    // SQLITE
    database.transaction((tx) => 
      tx.executeSql(
        'INSERT INTO quotes (text, author) VALUES (?,?)',
        [text, author],
        (_, result) => { 
          newQuotes[newQuotes.length -1].id = result.insertId;
          setQuotes(newQuotes);
        }
      )
    );
    */
  }

  async function loadQuotes() {
    // Zitat aus Firebase laden
    const quotesFromDB =  await Firebase.getQuotes();
    setQuotes(quotesFromDB);

    // AsyncStorage
    // let quotesFromDB = await AsyncStorage.getItem('QUOTES');


    // SQLITE
    /*
    database.transaction((tx) => 
      tx.executeSql('SELECT * FROM quotes', [], (_, result) => {
        setQuotes(result.rows._array);
      })
    );
    */ 
  }

  let content = <Text style={styles.noQuotes}>Keine Zitate</Text>;
  if (quotes.length > 0) {
    const quote = quotes[index];
    content = <Quote text={quote.text} author={quote.author} />;
  } 

  return (
    <View style={styles.container}>

      {quotes.length === 0 ? null : <IconButton onPress={deleteQuote} icon="delete" style={styles.delete}  />} 

      <IconButton onPress={() => setShowNewDialog(true)} icon="add-circle" style={styles.new}  />

      <NewQuote 
        visible={showNewDialog} 
        onCancel={() => setShowNewDialog(false)} 
        onSave={addQuoteToList}
      />

      {content}

      {quotes.length < 2 ? null : <BigButon style={styles.next} title="nächstes Zitat" onPress={() =>setIndex((index + 1) % quotes.length)} />} 

      <StatusBar style="auto" />

    </View> 
  ); 
}

// Styles
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  next: {
    position: "absolute",
    bottom: 30,
  },

  new: {
    position: "absolute",
    top: 50,
    right: 20,
  },

  noQuotes: {
    fontSize: 36,
    fontWeight: '300',
  },

  delete: {
    position: "absolute",
    top: 50,
    left: 20,
  },

});
