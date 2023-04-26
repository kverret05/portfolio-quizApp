import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

// Question array of three different types 
const questionData = [
  {
    type: "multiple-choice",
    prompt: 'What is the fluttering sound made by a cat?',
    choices: ['Roar', 'Oink', 'Purr', 'Buzzz'],
    correct: 2,
  },
  {
    type: "multiple-answer",
    prompt: 'What cat breed is my favorite...?',
    choices: ['Siamese Cat', 'Maine Coon', 'American Shorthair', 'Scottish Fold'],
    correct: [2, 3],
  },
  {
    type: "true-false",
    prompt: 'Cats are the best pets',
    choices: ['true', 'false'],
    correct: 0,
  },
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
      navigation.navigate('Summary', { score, userAnswers: selectedAnswer, questionData });
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








