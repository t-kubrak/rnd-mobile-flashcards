import React from 'react';
import {StyleSheet, Text, View, TextInput, Button} from "react-native";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {saveCardToDeck} from "../utils/data";
import {addCard} from "../actions/decks";

function NewCard({deck, dispatch, navigation}) {
    const { colors } = useTheme();
    const [question, onQuestionChange] = React.useState(null);
    const [answer, onAnswerChange] = React.useState(null);
    const card = {question, answer}
    console.log(deck);

    const onSubmit = () => {
        saveCardToDeck(deck.id, card)
            .then(() => {
                dispatch(addCard(deck.id, card))
            })
            .then(() => {
                navigation.navigate('Deck', { id: deck.id })
            })
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={{ height: 40, width:250,  borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => onQuestionChange(text)}
                value={question}
                placeholder='Question...'
            />
            <TextInput
                style={{ height: 40, width:250,  borderColor: 'gray', borderWidth: 1, marginTop: 50 }}
                onChangeText={text => onAnswerChange(text)}
                value={answer}
                placeholder='Answer...'
            />
            <View style={{marginTop: 50}}>
                <Button
                    onPress={onSubmit}
                    title="Submit"
                    color={colors.primary}
                />
            </View>
        </View>
    );
}

function mapStateToProps({decks}, {route}) {
    return {
        deck: decks[route.params.id]
    }
}

export default connect(mapStateToProps)(NewCard)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});