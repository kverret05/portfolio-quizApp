import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../App';

function ScoreCard({ questionData, userChoices }) {
  const [currentScore, setCurrentScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    const numQuestions = questionData.length;
    const numCorrect = userChoices.filter((choice, i) => {
      const correctChoiceIndex = questionData[i].correctChoiceIndex;
      if (Array.isArray(choice)) {
        return choice.sort().toString() === correctChoiceIndex.sort().toString();
      } else {
        return choice === correctChoiceIndex;
      }
    }).length;
    const newCurrentScore = numCorrect;
    const totalScore = numQuestions;

    setCurrentScore(newCurrentScore);
    setTotalScore(totalScore);
  }, [questionData, userChoices]);

  return (
    <View style={styles.scoreCard}>
      <Text style={styles.scoreText}>
        Score: {currentScore} / {totalScore}
      </Text>
    </View>
  );
}

export default ScoreCard;
