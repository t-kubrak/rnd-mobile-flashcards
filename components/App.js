import * as React from 'react';
import {StatusBar, StyleSheet, Button, Text, View } from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";
import Deck from "./Deck";
import {createStore} from "redux";
import middleware from '../middleware'
import reducer from "../reducers"
import {Provider} from "react-redux";
import NewCard from "./NewCard";

const DeckListStack = createStackNavigator();

function DeckListScreen() {
    return (
        <DeckListStack.Navigator>
            <DeckListStack.Screen name="Decks" component={DeckList} />
            <DeckListStack.Screen name="Deck" component={Deck} />
            <DeckListStack.Screen name="Add Card" component={NewCard} />
        </DeckListStack.Navigator>
    );
}

const NewDeckStack = createStackNavigator();

function NewDeckScreen() {
    return (
        <NewDeckStack.Navigator>
            <NewDeckStack.Screen name="New Deck" component={NewDeck} />
        </NewDeckStack.Navigator>
    );
}

const Tab = Platform.OS === 'ios'
    ? createBottomTabNavigator()
    : createMaterialTopTabNavigator()

const store = createStore(reducer, middleware)

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#387d51',
        background: '#fff'
    },
};

export default function App() {
    return (
        <Provider store={store}>
            <View style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
                <NavigationContainer theme={MyTheme}>
                    <Tab.Navigator>
                        <Tab.Screen name="Decks" component={DeckListScreen} />
                        <Tab.Screen name="New Deck" component={NewDeckScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        </Provider>
    );
}