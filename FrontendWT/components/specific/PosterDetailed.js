import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

class PosterDetailed extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
        <TouchableOpacity style={styles.posterContainer} onPress={() => this.props.callback(this.props.e.item.MovieId)}>
            <Image source={{ uri: this.props.e.item.Poster !== null ? this.props.e.item.Poster : 'http://www.morrocel.com/images/producto/jryoy.jpg' }} style={styles.posterImage} />
            <View style={styles.rightContainer}>
                <View style={styles.rightTopContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title} ellipsizeMode={'tail'} numberOfLines={this.TITLE_MAX_LINES}>{this.props.e.item.Title}</Text>
                    </View>
                    <View style={styles.voteAverageContainer}>
                        <Text style={styles.voteAverage}>{this.props.e.item.VoteAverage}</Text>
                    </View>
                </View>
                <Text style={styles.overview} ellipsizeMode={'tail'} numberOfLines={this.OVERVIEW_MAX_LINES}>{this.props.e.item.Overview}</Text>
            </View>
        </TouchableOpacity>
    )}

    TITLE_MAX_LINES = 2;
    OVERVIEW_MAX_LINES = 6;
}

const styles = StyleSheet.create({
    posterContainer: {
        display: 'flex', flexDirection: 'row'
    },
    posterImage: {
        width: 110, height: 170, resizeMode: 'stretch', borderTopLeftRadius:5, borderBottomLeftRadius:5
    },
    rightContainer: {
        backgroundColor:'#212121', flex:1, borderBottomRightRadius:5, borderTopRightRadius:5
    },
    rightTopContainer: {
        display:'flex', flexDirection:'row',  backgroundColor:'transparent', height:50, borderTopRightRadius:5, justifyContent:'space-between'
    },
    titleContainer: {/* Modify 88% for a 100% responsive way */
        width:'88%'
    },
    title: {
        color:'white', fontSize:20, fontWeight:'bold', marginLeft:10
    },
    voteAverageContainer: {
        width:30, height:35, backgroundColor:'#0B0B0B', justifyContent:'center', alignItems:'center', borderTopRightRadius:5
    },
    voteAverage: {
        color: '#24B34A', fontWeight: 'bold', fontSize:18
    },
    overview: {
        color:'white', textAlign:'justify', margin:10
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

export { PosterDetailed };