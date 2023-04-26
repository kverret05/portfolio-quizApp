import React from 'react';
import { View, Text } from 'react-native';

export function SummaryScreen({ route }) {
  const { userAnswers, questionData } = route.params;
  const correctAnswers = questionData.map(question => question.correctAnswer);

  const totalScore = userAnswers.reduce((score, answer, index) => {
    if (answer === correctAnswers[index]) {
      return score + 1;
    }
    return score;
  }, 0);

  return (
    <View>
      <Text testID="total">Total score: {totalScore}/{userAnswers.length}</Text>
      <View>
        {userAnswers.map((answer, index) => (
          <View key={index}>
            <Text>Question {index + 1}</Text>
            <Text>User answer: {answer}</Text>
            <Text>Correct answer: {correctAnswers[index]}</Text>
            {answer === correctAnswers[index] ? (
              <Text style={{ color: 'green', fontWeight: 'bold' }}>Correct</Text>
            ) : (
              <Text style={{ color: 'red', textDecorationLine: 'line-through', textDecorationStyle: 'solid' }}>
                Incorrect (correct answer is {correctAnswers[index]})
              </Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}
