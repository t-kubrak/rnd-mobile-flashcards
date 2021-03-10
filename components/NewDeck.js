import React from 'react';
import {StyleSheet, Text, View, TextInput, Button, Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";
import {saveDeck} from "../utils/api";
import {addDeck} from "../actions/decks";

function NewDeck({dispatch, navigation}) {
    const { colors } = useTheme();
    const [title, onTitleChange] = React.useState(null);


    const onSubmit = () => {
        if (!title) {
            return;
        }

        saveDeck(title)
            .then((deck) => {
                dispatch(addDeck(deck))
                onTitleChange(null)
                return deck
            })
            .then((deck) => {
                navigation.navigate('Deck', {id: deck.id})
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>What is the title of your new deck?</Text>
            <TextInput
                style={{ height: 40, width:250,  borderColor: 'gray', borderWidth: 1, marginTop: 50 }}
                onChangeText={text => onTitleChange(text)}
                value={title}
                placeholder='Deck Title'
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

export default connect()(NewDeck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24
    }
});