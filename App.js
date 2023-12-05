/**
 * A React Native mobile application that maintains a library of books. Users
 * are able to add books by inputting information about the book (such as title,
 * author, series, number of pages, and a rating), edit this information, and 
 * delete the book entry. This data persists even after restarting the application.
 * Users are also able to customize how they view their library by using different
 * sort options. 
 */

import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  View, 
  SafeAreaView, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet 
} from 'react-native';
import Book from './Book';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // Initializing states
  const [books, setBooks] = useState([]);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookAuthor, setNewBookAuthor] = useState('');
  const [newBookSeries, setNewBookSeries] = useState('');
  const [newBookPages, setNewBookPages] = useState('');
  const [newBookRating, setNewBookRating] = useState('');

  // Effect hook that loads the stored book list from AsyncStorage when the component mounts
  useEffect(() => {
    loadBooks();
  }, []);

  // Saves the current book list to AsyncStorage
  const saveBooks = async (booksToSave) => {
    try {
      const jsonBooks = JSON.stringify(booksToSave);
      await AsyncStorage.setItem('books', jsonBooks);
    } catch (error) {
      console.error('Error saving books to AsyncStorage:', error);
    }
  };

  // Loads the stored book list from AsyncStorage
  const loadBooks = async () => {
    try {
      const jsonBooks = await AsyncStorage.getItem('books');
      if (jsonBooks) {
        setBooks(JSON.parse(jsonBooks));
      }
    } catch (error) {
      console.error('Error loading books from AsyncStorage:', error);
    }
  };

  // Adds a new book to the book list based off of information inputted by user
  const addBook = () => {
    if (newBookTitle && newBookAuthor) {
      let pageCount = 0;
      if (newBookPages != undefined) {
        // Converts inputted string to a number
        pageCount = parseInt(newBookPages, 10);
      } 

      let series = newBookSeries;
      if (newBookSeries === undefined) {
        series = "";
      }

      let rating = 0;
      if (newBookRating != undefined) {
        // Converts inputted string to a number
        rating = parseInt(newBookRating, 10);
      } 
      
      // Builds a new book object to be added to the book list
      const newBook = {
        id: Date.now(),
        title: newBookTitle,
        author: newBookAuthor,
        series: series,
        pages: pageCount,
        rating: rating,
      };

      setBooks([...books, newBook]);
      saveBooks([...books, newBook]);

      setNewBookTitle('');
      setNewBookAuthor('');
      setNewBookSeries('');
      setNewBookPages('');
      setNewBookRating('');
    } else {alert("Book title and author required")};
  };

  // Deletes a book from the book list
  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  // Updates a book in the book list based on information given by user
  // Refer to Book.js for more information
  const updateBook = (updatedBook) => {
    const updatedBooks = books.map((book) => (book.id === updatedBook.id ? updatedBook : book));
    setBooks(updatedBooks);
    saveBooks(updatedBooks);
  };

  /************ Sorting Functions *************/
  const sortBooksByTitle = () => {
    const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));
    setBooks(sortedBooks);
    saveBooks(sortedBooks);
  };

  const sortBooksByAuthor = () => {
    const sortedBooks = [...books].sort((a, b) => a.author.localeCompare(b.author));
    setBooks(sortedBooks);
    saveBooks(sortedBooks);
  };

  const sortBooksByRatings = () => {
    const sortedBooks = [...books].sort((a, b) => a.rating - b.rating);
    setBooks(sortedBooks);
    saveBooks(sortedBooks);
  };

  const sortBooksByEntry = () => {
    const sortedBooks = [...books].sort((a, b) => a.id - b.id);
    setBooks(sortedBooks);
    saveBooks(sortedBooks);
  };

  // Where screen is rendered...
  return (
    <SafeAreaView style={styles.parent}>
      <View style={styles.header}>
        <Text 
          style={{ 
            color: 'white',
            fontSize: 24,
          }}
        >
          My Library
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input}
            value={newBookTitle}
            onChangeText={setNewBookTitle}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={newBookAuthor}
            onChangeText={setNewBookAuthor}
            placeholder="Author"
          />
          <TextInput
            style={styles.input}
            value={newBookSeries}
            onChangeText={setNewBookSeries}
            placeholder="Series"
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input}
            value={newBookPages}
            onChangeText={setNewBookPages}
            placeholder="Number of pages"
          />
          <TextInput
            style={styles.input}
            value={newBookRating}
            onChangeText={setNewBookRating}
            placeholder="Rating"
          />
        </View>
        
        
        <TouchableOpacity onPress={addBook}>
          <Text style={styles.button}>Add Book</Text>
        </TouchableOpacity>

        <View style={styles.rowContainer}>
          <TouchableOpacity onPress={sortBooksByTitle}>
            <Text style={styles.button}>Sort by Title</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sortBooksByAuthor}>
            <Text style={styles.button}>Sort by Author</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sortBooksByRatings}>
            <Text style={styles.button}>Sort by Rating</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sortBooksByEntry}>
            <Text style={styles.button}>Original Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView>
        {books.map((book) => (
          <Book key={book.id} book={book} onDelete={deleteBook} onUpdate={updateBook} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Style Sheet that stores styles for different components
const styles = StyleSheet.create({
  parent: {
    backgroundColor: '#EFF1ED',
    flex: 1,
  },
  header: {
    backgroundColor: '#4B5620',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B5620',
    marginBottom: 10,
    marginHorizontal: 5,
    padding: 10,
    flex: 200
  },
  button: {
    color: 'white',
    backgroundColor: '#717744',
    margin: 5,
    padding: 10,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
  }
});

export default App;
