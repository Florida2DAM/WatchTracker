import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class FooterMenu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View style={styles.footerStyles}>
            <View style={styles.topBarSeparator}/>
            <View style={styles.mainBody}>
                <Button icon={<Icon name="search" size={40} color={this.props.selectedScreen === 0 ? 'white' : 'black'}/>} buttonStyle={styles.buttonStyle}
                onPress={e => this.props.onSearchPress(e.valueOf())}/>
                <Button icon={<Icon name="list-ul" size={40} color={this.props.selectedScreen === 1 ? 'white' : 'black'}/>} buttonStyle={styles.buttonStyle}
                onPress={e => this.props.onMyListPress(e.valueOf())}/>
                <TouchableOpacity style={styles.homeButtonStyle}  onPress={e => this.props.onHomePress()}>
                    <Image source={require('./../../assets/img/WT_Logo.png')} style={styles.homeButtonImage}/>
                </TouchableOpacity>
                <Button icon={<Icon name="calendar" size={40} color={this.props.selectedScreen === 2 ? 'white' : 'black'}/>} buttonStyle={styles.buttonStyle}
                onPress={e => this.props.onSubscriptionsPress(e.valueOf())}/>
                <Button icon={<Icon name="user" size={40} color={this.props.selectedScreen === 3 ? 'white' : 'black'}/>} buttonStyle={styles.buttonStyle}
                onPress={e => this.props.onProfilePress(e.valueOf())}/>
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    footerStyles: {
        width: '100%', height: 50, justifyContent: 'center', alignItems: 'center',
    },
    topBarSeparator: {
        borderWidth:1, borderColor:'#9A9D9B',  width:'100%', marginTop: 0, marginBottom: 0
    },
    mainBody: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'#24B34A', height:60, margin:'auto', width:'100%'
    },
    buttonStyle: {
        backgroundColor:'transparent', paddingLeft:20, paddingRight: 20
    },
    homeButtonStyle: {
        backgroundColor: '#1A1A1A', borderRadius: 30, borderColor:'white', borderWidth:1,
        width: 60, height: 60, justifyContent: 'center', alignItems: 'center', marginBottom:30
    },
    homeButtonImage: {
        width: 40, height: 40, resizeMode: 'stretch'
    }
});
