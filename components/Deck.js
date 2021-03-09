import React from 'react';
import {StyleSheet, Text, View, Button} from "react-native";
import {connect} from "react-redux";
import {useTheme} from "@react-navigation/native";

function Deck({deck}) {
    const { colors } = useTheme();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text>{deck.questions.length} cards</Text>
            <View style={{marginTop: 15}}>
                <Button
                    onPress={() => {}}
                    title="Add Card"
                    color={colors.primary}
                />
            </View>

            <View style={{marginTop: 15}}>
                <Button
                    onPress={() => {}}
                    title="Start Quiz"
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

export default connect(mapStateToProps)(Deck)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100
    },
    title: {
        fontSize: 24,
    },
});