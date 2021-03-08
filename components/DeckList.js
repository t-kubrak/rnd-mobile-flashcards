import React from 'react';
import {StyleSheet, FlatList, Text, StatusBar, View, TouchableOpacity} from "react-native";
import {handleInitialData} from "../actions/shared";
import {connect} from "react-redux"
import {receiveDecks} from "../actions/decks";

const Item = ({ item, onPress, style }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
}

class DeckList extends React.Component {
    state = {
        ready: false
    }

    componentDidMount() {
        handleInitialData()
            .then(([decks]) => {
                this.props.dispatch(receiveDecks(decks))
            })
            .then(() => this.setState(() => ({ready: true})))
    }

    renderItem = ({item}, ...rest) => {
        return (
            <Item
                item={item}
                onPress={() => {
                    this.props.navigation.navigate('Deck', { id: item.id })
                }}
            />
        );
    };

    render() {
        if (this.state.ready === false) {
            return (<Text>Loading...</Text>)
        }

        const {decks} = this.props
        const data = Object.entries(decks).map(e => e[1])
        return (
            <FlatList
                data={data}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                extraData={this.state.selectedId}
            />
        );
    }
}

function mapStateToProps({decks}) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(DeckList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});