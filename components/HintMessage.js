import React, { useState } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";

function HintMessage(props) {
  const [hintRequested, setHintRequested] = useState(false);

  return (
    <View>
      {props.hintText && hintRequested ? (
        <Modal animationType="slide" transparent={false} visible={hintRequested}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>{props.hintText}</Text>

              <TouchableHighlight onPress={() => setHintRequested(false)}>
                <Text>HIDE HINT </Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      ) : (
        <TouchableHighlight onPress={() => setHintRequested(true)}>
          <Text>SHOW HINT</Text>
        </TouchableHighlight>
      )}
    </View>
  );
}

export default HintMessage;
