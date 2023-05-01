import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from '../App';
import RestartQuiz from './RestartQuiz';

function Summary({ route }) {
  let calculateCorrect = (userSelected, correct, type) => {
    let userCorrect = false;
    if (type === "multiple-answer") {
      userCorrect = userSelected.sort().toString() === correct.sort().toString();
    } else {
      userCorrect = userSelected === correct;
    }
    return userCorrect;
  };

  let calculateCorrectSet = (userSelected, correct, type) => {
    let userCorrect = false;
    if (type === "multiple-answer") {
      userCorrect = correct.every((item) => userSelected.includes(item)) &&
        userSelected.every((item) => correct.includes(item));
    } else {
      userCorrect = userSelected === correct;
    }
    return userCorrect;
  };

  let totalScore = 0;
  for (let i = 0; i < route.params.questionData.length; i++) {
    let userSelected = route.params.userChoices[i];
    let correct = route.params.questionData[i].correct;
    let type = route.params.questionData[i].type;
    let userCorrect = calculateCorrect(userSelected, correct, type);

    if (userCorrect) {
      totalScore++;
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.questionData}
        renderItem={({ item, index }) => {
          let { choices, prompt, type, correct } = item;
          let userSelected = route.params.userChoices[index];
          let userCorrect = calculateCorrect(
            userSelected, correct, type)
          let userCorrectSet = calculateCorrectSet(
            userSelected, correct, type)

          return (
            <View key={index}>
              <Text>{prompt}</Text>
              {choices.map((value, choiceIndex) => {
                let incorrect = false
                let userDidSelect = false

                if (type === "multiple-answer") {
                  userDidSelect = userSelected.includes(choiceIndex);
                  incorrect =
                    userSelected &&
                    !correct.includes(choiceIndex) &&
                    userSelected.includes(choiceIndex);
                } else {
                  incorrect = userSelected !== correct;
                  incorrect = userSelected
                    && userSelected !== correct
                }
                return (
                  <CheckBox
                    containerStyle={{
                      backgroundColor: userDidSelect
                        ? incorrect === false
                          ? "green"
                          : "gray"
                        : undefined,
                    }}
                    checked={
                      type === "multiple-answer"
                        ? correct.includes(choiceIndex)
                        : correct === choiceIndex
                    }
                    textStyle={{
                      textDecorationLine: incorrect || !userCorrectSet
                        ? "line-through"
                        : undefined,
                    }}
                    key={value}
                    title={value}
                  />
                );
              })}
            </View>
          );
        }}
      />
      <View>
        <Text> Score: {totalScore} </Text>
        <RestartQuiz setQuizState={setQuizState} />
      </View>
    </View>
  );
}

export default Summary;

