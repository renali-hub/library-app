import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react"; 
import {  
  StyleSheet,
  View,
  Text,
  TextInput, 
  TouchableOpacity, 
  FlatList, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function LibraryScreen({ navigation, route }) {
  const [book, setBook] = useState({}); // can also be a function that returns on object
  const [books, setBooks] = useState([]); 
  const [editIndex, setEditIndex] = useState(-1); 

  const handleAddBook = () => { 
    // console.log("Here");
    if (book) { 
      if (editIndex !== -1) { 
        // Edit existing book 
        const updatedBooks = [...books]; 
        updatedBooks[editIndex] = book; 
        setTasks(updatedBooks); 
        setEditIndex(-1); 
      } else { 
        // Add new book 
        setBooks([...books, book]); 
      } 
      setBook({}); 
    } 
  }; 

  useEffect(() => {
    if (route.params) {
      console.log(route.params.title);
      console.log(route.params.author);
      console.log(route.params.series);
      console.log(route.params.pages);

      setBook({
        title : route.params.title,
        author : route.params.author,
        series : route.params.series,
        pages : route.params.pages
      });
      // BUG: Figure out how to add book to list
      handleAddBook();
    }
  }, [route.params.title]);

  const handleEditBook = (index) => { 
    const bookToEdit = books[index]; 
    setBook(bookToEdit); 
    setEditIndex(index); 
  }; 

  const handleDeleteBook = (index) => { 
    const updatedBooks = [...books]; 
    updatedBooks.splice(index, 1); 
    setBooks(updatedBooks); 
  }; 

  const renderItem = ({ item, index }) => ( 
    <View> 
      <Text>{item}</Text> 

      <View> 
        <TouchableOpacity onPress={() => handleEditBook(index)}> 
          <Text>Edit</Text> 
        </TouchableOpacity> 

        <TouchableOpacity onPress={() => handleDeleteBook(index)}> 
          <Text>Delete</Text> 
        </TouchableOpacity> 
      </View> 

    </View> 
  ); 

  return (
    <View style={styles.screen}> 

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add")}> 
        <Text style={styles.buttonText}> Add Book </Text> 
      </TouchableOpacity> 

      <FlatList 
        data={books} 
        renderItem={renderItem} 
        keyExtractor={(item, index) => index.toString()} 
      /> 

    </View>
  );
}

function AddBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [series, setSeries] = useState("");
  const [pages, setPages] = useState("");

  return (
    <View style={styles.screen}>
      <TextInput 
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      /> 
      <TextInput 
        placeholder="Enter author"
        value={author} 
        onChangeText={setAuthor}
      /> 
      <TextInput 
        placeholder="Enter series"
        value={series} 
        onChangeText={setSeries}
      /> 
      <TextInput 
        placeholder="Enter pages"
        value={pages} 
        onChangeText={setPages}
      /> 
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Library',
            params: { title: title, author : author, series : series, pages : pages },
            merge: true,
          });
        }}
      > 
        <Text style={styles.buttonText}> Add </Text> 
      </TouchableOpacity> 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "blue",
    padding: 10
  },
  buttonText: {
    color: "white"
  }
});

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={headerOpts}>
        <Stack.Screen 
          name="Library" 
          component={LibraryScreen}
          initialParams={{ title: "Hello" }}
        />
        <Stack.Screen 
          name="Add" 
          component={AddBookScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function headerOpts() {
  return (
    {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  )
}
