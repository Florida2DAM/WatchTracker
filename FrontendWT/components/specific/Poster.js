import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

class Poster extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <TouchableOpacity style={styles.posterContainer} onPress={() => this.props.callback(this.props.e.item.MovieId)}>
            <Image source={{ uri: this.props.e.item.Poster }} style={styles.posterImage} />
            <View style={styles.posterTextContainer}>
                <Text style={styles.posterText} numberOfLines={1} ellipsizeMode='tail'>{this.props.e.item.Title}</Text>
            </View>
        </TouchableOpacity>
    )}
}

const styles = StyleSheet.create({
    posterContainer: {
        backgroundColor:'#797979', height:200, width:115
    },
    posterImage: {
        width: 115, height: 160, resizeMode: 'stretch'
    },
    posterTextContainer: {
        backgroundColor:'transparent', height:40, justifyContent:'center', alignItems:'center', padding:5
    },
    posterText: {
        color: 'white', fontWeight: 'bold', fontSize: 18
    }
});

export { Poster };