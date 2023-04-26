import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

// question array of three different types 
const questionData = [
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


export function QuestionScreen ({ navigation, route }) {
  const [question, setQuestion] = useState(route.params.currentQuestionIndex);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const currentQuestion = questionData[question];
  const { type, prompt, choices } = currentQuestion;

  const handleAnswerSelected = (index) => {
    const newSelectedAnswer = [...selectedAnswer];
    newSelectedAnswer[question] = index;
    setSelectedAnswer(newSelectedAnswer);
  };

  const handleNextQuestion = () => {
    if (question < questionData.length - 1) {
      setQuestion(question + 1);
    } else {
      setScore(score + 1);
      navigation.navigate('Summary', { score });
    }
  };

  const handleMultipleAnswerSelected = (indexes) => {
    const newSelectedAnswer = [...selectedAnswer];
    newSelectedAnswer[question] = indexes;
    setSelectedAnswer(newSelectedAnswer);
  };

  return (
    <View>
      <Text>Question {question + 1}</Text>
      <Text>{prompt}</Text>
      {type === "multiple-answer" ? (
        <ButtonGroup
          testID="choices"
          buttons={choices}
          onPress={handleMultipleAnswerSelected}
          selectMultiple
          selectedIndexes={selectedAnswer[question]}
          vertical
        />
      ) : (
        <ButtonGroup
          testID="choices"
          buttons={choices}
          onPress={handleAnswerSelected}
          selectedIndex={selectedAnswer[question]}
          vertical
        />
      )}
      <Button
        title="Next"
        onPress={handleNextQuestion}
        disabled={selectedAnswer[question] === undefined}
        testID="next-question"
        // this ensures that users don't go back to the previous question and disables the next question button
      />
    </View>
  );
}








