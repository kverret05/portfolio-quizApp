import React, { useState } from 'react';
import { View, Text, Modal, Button } from 'react-native';

function HintMessage(props) {
  const [showHint, setShowHint] = useState(false);
  const [hintCount, setHintCount] = useState(0);

  const maxHints = 2;

  const showHintMessage = () => {
    if (hintCount < maxHints) {
      setShowHint(true);
      setHintCount(hintCount + 1);
    } else if (hintCount === maxHints) {
      setButtonDisabled(true);
    }
  };

  const hideHintMessage = () => {
    setShowHint(false);
  };

  return (
    <View>
      <Button title=" Show Hint" onPress={showHintMessage} />
      <Modal visible={showHint} onRequestClose={hideHintMessage}>
        <View>
          <Text>{props.hint}</Text>
          <Text>Number of hints used: {hintCount}</Text>
        </View>
        {hintCount >= maxHints && (
          <Text>You have used all your hints for this question.</Text>
        )}
        <Button title="Close" onPress={hideHintMessage} />
      </Modal>
    </View>
  );
}

export default HintMessage;
