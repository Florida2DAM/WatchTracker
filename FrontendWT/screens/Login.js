/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, ImageBackground, ToastAndroid } from 'react-native';
import {Button} from 'react-native-elements';
import axios from 'axios';
import MainScreensInput from './../components/specific/MainScreensInput';
import Constants from './../common/Constants';
import md5 from 'md5';

class Login extends React.Component {

    constructor(props, route) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    render() {

        const userCreated = this.props.route.params;
        if (userCreated) {
            ToastAndroid.show('User created!', ToastAndroid.LONG);
        }
        return (
            <View style={{height:'100%', width:'100%'}}>
                <ImageBackground style={{width:'100%', height:'100%', resizeMode:'cover'}} resizeMode={'stretch'} source={require('./../assets/img/bg.jpg')}>
                    {/*Apply general opacity*/}
                    <View style={{width:'100%', height:'100%', backgroundColor:'black', opacity:0.3, position:'absolute'}}/>
                    <View style={{height: 100, width:'100%'}}>
                        <View style={styles.loginHeader}/>
                        <Image style={styles.logoHeader} source={require('./../assets/img/WT_Logo_Login.png')}/>
                    </View>
                    <ScrollView>
                        <View style={styles.userBox}>
                            <View style={{height:'100%', width:'100%', backgroundColor:'black', position:'absolute',
                                borderRadius:10, opacity:0.75}}/>
                            <View style={{padding:20}}>
                                <Text style={styles.text}>Username</Text>
                                <MainScreensInput placeholder={'username'} secure={false} maxLength={15} onChangeText={username => this.setState({username})}/>

                                <Text style={styles.text}>Password</Text>
                                <MainScreensInput placeholder={'password'} secure={true} maxLength={20} onChangeText={password => this.setState({password})}/>

                                <Button title={'Login'} buttonStyle={{backgroundColor:'#24B24A', borderRadius:5, marginLeft:10, marginRight:10}}
                                        titleStyle={{fontWeight:'bold'}} onPress={() => this.login()}/>
                                <Text style={styles.registerText} onPress={() => this.props.navigation.navigate('Register')}>Register</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    componentDidMount() {
                //Auto-navigation (REMOVE WHEN ALL SCREENS ARE DONE)
                //this.props.navigation.navigate('Register');
                //this.props.navigation.navigate('Providers', {username: 'jolame'});
                //this.props.navigation.navigate('Subscriptions', {username: 'jolame'});
                this.props.navigation.navigate('AddSubscription', {username: 'jolame'});
                //Auto-navigation (REMOVE WHEN ALL SCREENS ARE DONE)
    }

    showState = () => {
        console.log(this.state.username + " " + this.state.password);
    }

    login = () => { console.log('Check username and password...');
         let url = `${Constants.BASE_URL}Users?userId=${this.state.username}&password=${md5(this.state.password)}`;
         axios.get(url).then(response => { 
             if (response.data) {
                 console.log('Logging in...');
                 ToastAndroid.show('Logging in...', ToastAndroid.SHORT);
                 this.props.navigation.navigate('Providers', {username: this.state.username});
             } else {
                 console.log('Username or password wrong');
                 ToastAndroid.show('Username or password wrong', ToastAndroid.SHORT);
             }
          })
             .catch(error => console.log(error.response.request._response));
    }

};

const styles = StyleSheet.create({
    loginHeader: {
        opacity: 0.75,
        backgroundColor: '#070707',
        height: 100, width:'100%',
        position:'absolute'
    },
    logoHeader: {
        width:180,
        height:60,
        margin:20,
        resizeMode:'stretch'
    },
    userBox: {
        backgroundColor: 'transparent',
        marginTop:100,
        marginBottom:100,
        width: '80%',
        alignSelf:'center',
        borderRadius:10,
    },
    text: {
        color:'white',
        fontWeight:'bold',
        fontSize:22,
        marginLeft: 10,
        marginBottom: 5
    },
    registerText: {
        fontSize:18,
        textAlign:'right',
        color:'white',
        marginTop:20
    }
});

export default Login;