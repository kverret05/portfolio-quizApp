import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';
import * as React from 'react';

import Question, { data } from './components/Question';
import Summary from './components/Summary';


const Stack = createStackNavigator();

// This modified from code in Class Screenshots

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen 
        initialParams={{
          questionNumber: 0,
          data: data,
          userChoices: [],
        }}
          name="Question" 
          options= {{ headerShown: false}}
          >
            {(props) => <Question {...props}/>}
        </Stack.Screen>
        <Stack.Screen
         name="Summary" 
         initialParams={{
          questionNumber: data.length - 1,
          data: data,
          userChoices: [1, [0,2], 1],
         }}
         options= {{ headerShown: false}}
         component={Summary} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',

  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  }
});
