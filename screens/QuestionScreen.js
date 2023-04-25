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

    export function QuestionScreen ({ navigation }) {
      const [question, setQuestion] = useState(0);
      const [score, setScore] = useState(0);
      const [selectedAnswer, setSelectedAnswer] = useState('');
    const currentQuestion = questions[question];

    const handleAnswerSelected = (index) => {
      const newSelectedAnswer = [...selectedAnswer];
      newSelectedAnswer[question] = index;
      setSelectedAnswer(newSelectedAnswer);
    };

    const handleNextQuestion = () => {
      if (question < questions.length - 1) {
        setQuestion(question + 1);
      } else {
        // sends user to Summary screen and sets score correct out of total score
        navigation.navigate('Summary', { score });
        setScore(score + 1);
      }
    };

    return (
      <View>
        <Text>Question {question + 1}</Text>
        <Text>{currentQuestion.prompt}</Text>
        <ButtonGroup
          buttons={currentQuestion.choices}
          onPress={handleAnswerSelected}
          selectedIndex={selectedAnswer[question]}
          testid='choices'
          vertical
          // only thing that i am having problems w/ is having multiple buttons get pressed for the multiple answer array
        />
        <Button
          title="Next"
          onPress={handleNextQuestion}
          disabled={selectedAnswer[question] === undefined}
          testID="next-question"
          // this ensures that users dont go back to the previous question and disables the next question button
        />
      </View>
    );
}



