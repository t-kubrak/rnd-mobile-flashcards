import React from 'react';
import {StyleSheet, Text, View, Button, Pressable} from "react-native";
import {connect} from "react-redux";
import {clearLocalNotification, setLocalNotification} from "../utils/helpers";

class Quiz extends React.Component {
    state = {
        currentQuestionId: 0,
        correctAnswersCount: 0,
        isQuestionShown: true
    }

    handleChoice = (isCorrect) => {
        const {currentQuestionId, correctAnswersCount} = this.state

        this.setState({
            correctAnswersCount: isCorrect ? correctAnswersCount + 1 : correctAnswersCount,
            currentQuestionId: currentQuestionId + 1
        })
    }

    handleFlip = () => {
        this.setState({isQuestionShown: !this.state.isQuestionShown})
    }

    restartQuiz = () => {
        this.setState({
            currentQuestionId: 0,
            correctAnswersCount: 0,
            isQuestionShown: true
        })
    }

    render() {
        const {deck, navigation} = this.props
        const {currentQuestionId, correctAnswersCount, isQuestionShown} = this.state
        const lastQuestionId = deck.questions.length - 1

        if (currentQuestionId > lastQuestionId) {
            clearLocalNotification().then(setLocalNotification)

            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Your score: {Math.floor(correctAnswersCount / deck.questions.length * 100)}%
                    </Text>

                    <View style={{marginTop: 30}}>
                        <Button
                            onPress={this.restartQuiz}
                            title="Restart Quiz"
                            color='#387d51'
                        />
                    </View>
                    <View style={{marginTop: 30}}>
                        <Button
                            onPress={() => {navigation.navigate('Deck', { id: deck.id })}}
                            title="Back to Deck"
                            color='#7d385e'
                        />
                    </View>
                </View>
            )
        }

        const question = deck.questions[currentQuestionId];

        return (
            <View style={styles.containerOuter}>
                <Text style={styles.questionCounter}>{currentQuestionId+1}/{deck.questions.length}</Text>
                <View style={styles.container}>
                    <Text style={styles.title}>{isQuestionShown ? question.question : question.answer}</Text>
                    <Pressable onPress={this.handleFlip}>
                        <Text style={styles.flip}>{isQuestionShown ? 'Answer' : 'Question'}</Text>
                    </Pressable>

                    <View style={{marginTop: 30}}>
                        <Button
                            onPress={() => this.handleChoice(true)}
                            title="Correct"
                            color='green'
                        />
                    </View>
                    <View style={{marginTop: 30}}>
                        <Button
                            onPress={() => this.handleChoice(false)}
                            title="Incorrect"
                            color='red'
                        />
                    </View>
                </View>
            </View>
        );
    }
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
        textAlign: 'center'
    },
    questionCounter: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
    },
    flip: {
        fontSize: 18,
        color: '#7d385e',
        marginTop: 15,
    }
});