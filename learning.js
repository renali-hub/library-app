import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Image, SafeAreaView, Button } from 'react-native';

export default function App() {
  const handlePress = () => console.log("Text pressed")

  console.log(require('./assets/icon.png'))
  
  return (
    <SafeAreaView style={styles.container}>
      <Text numberOfLines={1} onPress={handlePress}>
        Hello React Native!
      </Text>
      <TouchableHighlight onPress={() => console.log("Tapped")}>
        <Image 
          // blurRadius={10}
          source={{ 
            width: 200,
            height: 300,
            uri: "https://picsum.photos/200/300" 
          }} 
        />
      </TouchableHighlight>
      {/* <StatusBar style="auto" /> */}
      <Button color="pink" title="Click me!" onPress={() => alert("Button clicked")}/>
      <View style={{
        backgroundColor: 'dodgerblue',
        width: '100%',
        height: '30%'
      }}
      ></View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
