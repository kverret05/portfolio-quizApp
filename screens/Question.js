import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { styles } from '../App';

export const data = [
  {
    type: "multiple-choice",
    prompt: 'This is a multiple choice question',
    choices: ['A', 'B', 'C', 'D'],
    correct: 0,
  },
  {
    type: "multiple-answer",
    prompt: 'This is a multiple answer question',
    choices: ['A', 'B', 'C', 'D'],
    correct: [0, 2]
  },
  {
    type: "true-false",
    prompt: 'This is a true or false question',
    choices: ['true', 'false'],
    correct: 1
  }
];

function Question({ navigation, route}) {
  console.log(route.params)
  const { questionNumber, userChoices, data } = route.params;
  let { choices, prompt, type } = data[questionNumber]
  let [selectedIndex, setSelectedIndex] = useState(0)
  let [selectedIndexes, setSelectedIndexes] = useState([])
  let nextQuestion = () => {
    let nextQuestion = questionNumber + 1
    console.log(selectedIndex)
    if (type !== "multiple-answer") {
      userChoices.push(selectedIndex)
    } else {
      userChoices.push(selectedIndexes)
    }
  
    if (nextQuestion < data.length) {
      console.log("Navigating to next question")
      console.log({questionNumber: nextQuestion,
        data, userChoices})
      navigation.navigate("Question", {
        questionNumber: nextQuestion,
        data, 
        userChoices
      })
    } else {
      navigation.navigate("Summary", {
        data, 
        userChoices
      })
    } 
  }

  return (
    <View style={styles.container}>
      <Text>{prompt}</Text>
      {type !== "multiple-answer" ? (
        <ButtonGroup
          textID="choices"
          buttons={choices}
          vertical
          selectedIndex={selectedIndex}
          onPress={(value) => {
            console.log(value);
            console.log(selectedIndex);
            setSelectedIndex(value);
          }}
          containerStyle={{margin:20, width: "70%"}}
        />
      ) : (
        <ButtonGroup
  testID="choices"
  buttons={choices}
  vertical
  selectMultiple
  selectedIndexes={selectedIndexes}
  onPress={(value) => {
    if (selectedIndexes.includes(value)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== value));
    } else {
      setSelectedIndexes(selectedIndexes.concat(value));
    }
  }}
  containerStyle={{margin:20, width: "70%"}}
/>

      )}
      <Button
        testID="next-question"
        onPress={nextQuestion}
        title="Submit"
      ></Button>
    </View>
  );
}

export default Question;