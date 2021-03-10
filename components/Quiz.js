import React from 'react';
import {StyleSheet, Text, View, Button, Pressable} from "react-native";
import {connect} from "react-redux";

class Quiz extends React.Component {
    state = {
        currentQuestionId: 0,
        correctAnswersCount: 0
    }

    handleChoice = (isCorrect) => {
        const {currentQuestionId, correctAnswersCount} = this.state

        this.setState({
            correctAnswersCount: isCorrect ? correctAnswersCount + 1 : correctAnswersCount,
            currentQuestionId: currentQuestionId + 1
        })
    }

    handleQuestionAnswer = () => {

    }

    render() {
        const {deck} = this.props
        const {currentQuestionId, correctAnswersCount} = this.state
        const lastQuestionId = deck.questions.length - 1

        if (currentQuestionId > lastQuestionId) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Your score: {Math.floor(correctAnswersCount/deck.questions.length*100)}%</Text>
                </View>
            )
        }

        return (
            <View style={styles.containerOuter}>
                <Text style={styles.questionCounter}>{currentQuestionId+1}/{deck.questions.length}</Text>
                <View style={styles.container}>
                    <Text style={styles.title}>{deck.questions[currentQuestionId].question}</Text>
                    <Pressable onPress={this.handleQuestionAnswer}>
                        <Text>Answer</Text>
                    </Pressable>

                    <View style={{marginTop: 30}}>
                        <Button
                            onPress={() => this.handleChoice(true)}
                            title="Correct"
                            color='green'
                            value={true}
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
    },
    questionCounter: {
        fontSize: 16,
        marginTop: 10,
        marginLeft: 10,
    }
});