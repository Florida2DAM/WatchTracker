import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View style={structureStyles.headerMainContainer}>
            <Text style={structureStyles.screenTitle}>{this.props.title}</Text>

            {this.showReturnButton()}

            <View style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Text style={{fontWeight:'bold', color:'white', fontSize:13}}>{this.props.name}</Text>
                <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center', }}>
                    <Avatar style={{width: 40, height: 40}} rounded source={this.props.avatar} />
                </View>
            </View>

        </View>
    )}

    showReturnButton = () => {
        if (this.props.showReturn) {
            return (
                <View style={{ width: 50, height: 50, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity><Icon size={30} name='arrow-left' color='white' onPress={e => this.props.onPress(e.valueOf())}/></TouchableOpacity>
                </View>
            );
        } else
            return <View/>;
    }
}

const structureStyles = StyleSheet.create({
    headerMainContainer: {
        backgroundColor: '#24B34A',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        alignItems:'center',
        justifyContent:'space-between'
    },
    screenTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        position:'absolute',
        textAlign:'center',
        width:'100%'
    },

});

export { Header };
