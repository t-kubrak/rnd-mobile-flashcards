import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";

const initialLayout = { width: Dimensions.get('window').width };

export default function Nav() {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'decks', title: 'Decks' },
        { key: 'newDeck', title: 'New Deck' },
    ]);

    const renderScene = SceneMap({
        decks: DeckList,
        newDeck: NewDeck,
    });

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
        />
    );
}

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});