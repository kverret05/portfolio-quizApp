import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import * as React from 'react';

import Question from './components/Question';
import Summary from './components/Summary';


export const Stack = createStackNavigator();

// This modified from code in Class Screenshots

export const questionData = [
  {
    type: "multiple-choice",
    prompt: 'How many signs are there in the zodiac?',
    choices: ['6', '12', '18', '24'],
    correct: 1
  },
  {
    type: "multiple-answer",
    prompt: 'What zodiac signs are considered "fixed signs"?',
    choices: ['Taurus', 'Gemini', 'Libra', 'Aquarius'],
    correct: [0, 3]
  },
  {
    type: "true-false",
    prompt: 'If you were born on September 16, you are a Virgo',
    choices: ['true', 'false'],
    correct: 0
  }
];

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          initialParams={{
            questionNumber: 0,
            questionData: questionData,
            userChoices: [],
          }}
          name="Question"
          options={{ headerShown: false }}
        >
          {(props) => <Question {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="Summary"
          initialParams={{
            questionNumber: questionData.length - 1,
            questionData: questionData,
            userChoices: [1, [0, 3], 0],
          }}
          options={{headerShown: false }}
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
