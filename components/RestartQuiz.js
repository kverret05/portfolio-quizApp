
import { useState } from "react";
import { Modal, View } from "react-native";
import { Button, Text } from "react-native-elements";
import { styles } from "../App";

function RestartQuiz(setQuizState) {
    const [confirmRestart, setConfirmRestart] = useState[false];

    let handleRestart = () => {
        setConfirmRestart = true;
    }

    let handleConfirmRestart = (confirmed) => {
        if (confirmed) {
            setQuizState({
                currentQuestions: 0,
                userChoices,
                showSummary: false
            })
            setConfirmRestart = false;
        }

            return (
                <View style={styles.container}>
                    <Modal>
                        visible={confirmRestart}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => handleConfirmRestart(false)}
                        <View style={{ flex: 1, justifyContent: center, alignItems: center }}>
                            <View style={{ backgroundColor: 'white', padding: 20 }}>
                                <Text style={{ marginBottom: 10 }}>Are you sure you want to restart the quiz?</Text>
                                <Button title="Yes" onPress={() => handleConfirmRestart(true)} />
                                <Button title="No" onPress={() => handleConfirmRestart(false)} />
                            </View>
                        </View>
                    </Modal>
                    <Button title="Restart Quiz" onPress={handleRestart} />
                </View>
            )
        }
    }

export default RestartQuiz;