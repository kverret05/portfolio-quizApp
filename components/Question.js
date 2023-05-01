import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { styles } from '../App';
import { questionData } from '../App';

function Question({ navigation, route }) {
  console.log(route.params)
  const { questionNumber, userChoices, questionData } = route.params;
  let { choices, prompt, type } = questionData[questionNumber]
  let initialSelection = 0
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

    if (nextQuestion < questionData.length) {
      console.log("Navigating to next question")
      console.log({
        questionNumber: nextQuestion,
        questionData, userChoices
      })
      navigation.navigate("Question", {
        questionNumber: nextQuestion,
        questionData,
        userChoices
      })
    } else {
      navigation.navigate("Summary", {
        questionData,
        userChoices
      })
    }
  }

  return (
    <View style={styles.container}>
      <Text>{prompt}</Text>
      {type !== "multiple-answer" ? (
        <ButtonGroup
          testID="choices"
          buttons={choices}
          vertical
          selectedIndex={selectedIndex}
          onPress={(value) => {
            console.log(value);
            console.log(selectedIndex);
            setSelectedIndex(value);
          }}
          containerStyle={{ margin: 20, width: "70%" }}
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
          containerStyle={{ margin: 20, width: "70%" }}
        />

      )}
        <Button
        testID="next-question"
        onPress={nextQuestion}
        title="Next"
      ></Button>
    </View>
  );
}

export default Question;