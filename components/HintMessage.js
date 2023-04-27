import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";

function HintMessage(props) {
  const [hintRequested, setHintRequested] = useState(false);

  function handleHintRequest() {
    setHintRequested(true);
  }

  return (
    <View>
      {props.hintText && hintRequested ? (
        <Modal animationType="slide" transparent={false} visible={hintRequested}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>{props.hintText}</Text>

              <TouchableHighlight onPress={() => setHintRequested(false)}>
                <Text>Hide Hint</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : (
        <TouchableHighlight onPress={handleHintRequest}>
          <Text>Show Hint</Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

export default HintMessage;
