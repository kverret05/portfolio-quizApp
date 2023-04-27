import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { styles } from '../App';


function Summary({ route }) {
  let calculateCorrect = (userSelected, correct, type) => {
    let userCorrect = false;
    if (type === "multiple-answer") {
      userCorrect = userSelected.sort().toString()
      === correct.sort().toString()
    } else {
      userCorrect = userSelected == correct;
    }
    return userCorrect;
  };
  
  let calculateCorrectSet = (userSelected, correct, type) => {
    let userCorrect = false;
    if (type === "multiple-answer") {
      userCorrect =
        correct.every((item) => userSelected.includes(item)) &&
        userSelected.every((item) => correct.includes(item));
    } else {
      userCorrect = userSelected == correct;
    }
    return userCorrect;
  };
  
  let totalScore = 0;
  for (let i = 0; i < route.params.data.length; i++) {
    if (
      calculateCorrect(
        route.params.userChoices[i],
        route.params.data[i].correct,
        route.params.data[i].type 
      )
    ) {
      totalScore++
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={route.params.data}
        renderItem={({ item, index }) => {
          let { choices, prompt, type, correct } = item;
          let userSelected = route.params.userChoices[index];
          let userCorrect = calculateCorrect(
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
                  incorrect = userSelected !== choiceIndex;
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
                      textDecorationLine: incorrect
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
      <Text> Score: {totalScore} </Text>
    </View>
  );
}

export default Summary;

