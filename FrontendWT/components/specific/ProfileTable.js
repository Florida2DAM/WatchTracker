import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{backgroundColor:'transparent', width:'100%', padding:10}}>
                <View style={{display:'flex', flexDirection:'row'}}>
                    <View style={styles.emptyCell}><Icon name="eye" size={30} color="white"/></View>
                    <View style={styles.emptyCell}><Icon name="check" size={30} color="white"/></View>
                    <View style={styles.emptyCell}><Icon name="eye-slash" size={30} color="white"/></View>
                </View>
                <View style={{display:'flex', flexDirection:'row'}}>
                    <View style={styles.titleCell}><Text style={styles.cellText}>Watching </Text></View>
                    <View style={styles.titleCell}><Text style={styles.cellText}>Finished </Text></View>
                    <View style={styles.titleCell}><Text style={styles.cellText}>Pending </Text></View>
                </View>
                <View style={{display:'flex', flexDirection:'row'}}>
                    <View style={styles.resultCell}>
                        <Text>{this.props.watching}</Text>
                    </View>
                    <View style={styles.resultCell}>
                        <Text>{this.props.finished}</Text>
                    </View>
                    <View style={styles.resultCell}>
                        <Text>{this.props.pending}</Text>
                    </View>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    emptyCell: {
        width:'33%', height:40, backgroundColor:'transparent', justifyContent:'center', alignItems:'center'
    },
    titleCell: {
        width:'33%', height:30, backgroundColor:'#24B24A', borderWidth:1, justifyContent:'center', alignItems:'center'
    },
    resultCell: {
        width:'33%', height:30, backgroundColor:'white', borderWidth:1, justifyContent:'center', alignItems:'center'
    },
    cellText: {
        color: 'white', fontSize: 16, fontWeight: 'bold'
    }
});