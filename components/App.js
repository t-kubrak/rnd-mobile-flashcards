import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";
import Deck from "./Deck";

function DetailsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Details!</Text>
        </View>
    );
}

const DeckListStack = createStackNavigator();

function DeckListScreen() {
    return (
        <DeckListStack.Navigator>
            <DeckListStack.Screen name="Decks" component={DeckList} />
            <DeckListStack.Screen name="Deck" component={Deck} />
        </DeckListStack.Navigator>
    );
}

const NewDeckStack = createStackNavigator();

function NewDeckScreen() {
    return (
        <NewDeckStack.Navigator>
            <NewDeckStack.Screen name="Settings" component={NewDeck} />
        </NewDeckStack.Navigator>
    );
}

const Tab = Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Decks" component={DeckListScreen} />
                <Tab.Screen name="New Deck" component={NewDeckScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
