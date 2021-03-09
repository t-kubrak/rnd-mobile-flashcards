import React from 'react';
import {StyleSheet, Text, View, Button, Pressable} from "react-native";
import {connect} from "react-redux";

function Quiz({deck, dispatch, navigation}) {
    const handleChoice = () => {

    }

    const handleQuestionAnswer = () => {

    }

    return (
        <View style={styles.containerOuter}>
            <Text style={styles.questionCounter}>1/{deck.questions.length}</Text>
            <View style={styles.container}>
                <Text style={styles.title}>{deck.questions[0].question}</Text>
                <Pressable onPress={handleQuestionAnswer}>
                    <Text>Answer</Text>
                </Pressable>

                <View style={{marginTop: 30}}>
                    <Button
                        onPress={handleChoice}
                        title="Correct"
                        color='green'
                    />
                </View>
                <View style={{marginTop: 30}}>
                    <Button
                        onPress={handleChoice}
                        title="Incorrect"
                        color='red'
                    />
                </View>
            </View>
        </View>
    );
}

function mapStateToProps({decks}, {route}) {
    return {
        deck: decks[route.params.id]
    }
}

export default connect(mapStateToProps)(Quiz)

const styles = StyleSheet.create({
    containerOuter: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
    },
    questionCounter: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
    }
});