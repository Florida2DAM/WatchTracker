import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
//import SeparatorBar from './SeparatorBar';



class FooterMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View style={structureStyles.footerStyles}>
            <View style={{borderWidth:1, borderColor:'#9A9D9B',  width:'100%', marginTop: 0, marginBottom: 0}}/>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                backgroundColor:'#24B34A', height:60, margin:'auto', width:'100%'}}>
                <Button icon={<Icon name="search" size={40} color={this.props.selectedScreen === 0 ? 'white' : 'black'}/>} buttonStyle={structureStyles.buttonStyle}/>
                <Button icon={<Icon name="list-ul" size={40} color={this.props.selectedScreen === 1 ? 'white' : 'black'}/>} buttonStyle={structureStyles.buttonStyle}/>
                <TouchableOpacity style={{ backgroundColor: '#1A1A1A', borderRadius: 30, borderColor:'white', borderWidth:1,
                    width: 60, height: 60, justifyContent: 'center', alignItems: 'center', marginBottom:30 }} onPress={() => console.log('Main')}>
                    <Image source={require('./../../assets/img/WT_Logo.png')} style={{width: 40, height: 40, resizeMode: 'stretch'}} />
                </TouchableOpacity>
                <Button icon={<Icon name="calendar" size={40} color={this.props.selectedScreen === 2 ? 'white' : 'black'}/>} buttonStyle={structureStyles.buttonStyle}
                onPress={e => this.props.onSubscriptionsPress(e.valueOf())}/>
                <Button icon={<Icon name="user" size={40} color={this.props.selectedScreen === 3 ? 'white' : 'black'}/>} buttonStyle={structureStyles.buttonStyle}/>
            </View>
        </View>
    )}
}

const structureStyles = StyleSheet.create({
    footerStyles: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        backgroundColor:'transparent',
        paddingLeft:20,
        paddingRight: 20
    }
});

export { FooterMenu };
