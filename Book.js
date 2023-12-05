/**
 * Defines a "Book" component that we store and manipulate in our application.
 * This file implements how book information is rendered and how book information
 * can be edited.
 */

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  StyleSheet 
} from 'react-native';

const Book = ({ book, onDelete, onUpdate }) => {
  // Initializing states
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(book.title);
  const [editedAuthor, setEditedAuthor] = useState(book.author);
  const [editedSeries, setEditedSeries] = useState(book.series);
  const [editedPages, setEditedPages] = useState(book.pages);
  const [editedRating, setEditedRating] = useState(book.rating);

  // Communicates with application that an update has occurred
  const handleUpdate = () => {
    onUpdate({ ...book, title: editedTitle, author: editedAuthor, series: editedSeries, pages: editedPages, rating: editedRating });
    setIsEditing(false);
  };

  // Renders update form is "isEditing" is set to true, but just displays book 
  // information if set to false 
  return (
    <View style={styles.parent}>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            placeholder="Title"
          />
          <TextInput
            style={styles.input}
            value={editedAuthor}
            onChangeText={setEditedAuthor}
            placeholder="Author"
          />
          <TextInput
            style={styles.input}
            value={editedSeries}
            onChangeText={setEditedSeries}
            placeholder="Series"
          />
          <TextInput
            style={styles.input}
            value={editedPages}
            onChangeText={setEditedPages}
            placeholder="Pages"
          />
          <TextInput
            style={styles.input}
            value={editedRating}
            onChangeText={setEditedRating}
            placeholder="Rating"
          />
          <TouchableOpacity onPress={handleUpdate}>
            <Text style={styles.button}>Update</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text>Title: {book.title}</Text>
            <Text>Author: {book.author}</Text>
            <Text>Series: {book.series}</Text>
            <Text>Pages: {book.pages}</Text>
            <Text>Rating: {book.rating}</Text>
          </View>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => onDelete(book.id)}>
            <Text style={styles.button}>Delete</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer} onPress={() => setIsEditing(true)}>
            <Text style={styles.button}>Edit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Style Sheet that stores styles for different components
const styles = StyleSheet.create({
  parent: {
    borderWidth: 1,
    borderColor: '#4B5620',
    padding: 10,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4B5620',
    marginBottom: 10,
    padding: 8,
  },
  button: {
    color: 'white',
    backgroundColor: '#717744',
    margin: 10,
    padding: 10,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  info: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
  }
});

export default Book;
