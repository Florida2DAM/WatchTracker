import React from 'react';
import { StyleSheet, ScrollView, View, Text, Image, ImageBackground, ToastAndroid } from 'react-native';
import {Button} from 'react-native-elements';
import axios from 'axios';
import MainScreensInput from './../components/specific/MainScreensInput';
import Constants from './../common/Constants';
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FadeInView from './../components/specific/FadeInView';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            keysFound: false
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <ImageBackground style={styles.bgImg} resizeMode={'stretch'} source={require('./../assets/img/bg.jpg')}>
                    <View style={styles.screenOpacity}/>
                    <View style={styles.headerContainer}>
                        <View style={styles.loginHeader}/>
                        <FadeInView>
                            <Image style={styles.logoHeader} source={require('./../assets/img/WT_Logo_Login.png')}/>
                        </FadeInView>   
                    </View>
                    <ScrollView>
                        <View style={styles.userBox}>
                            <View style={styles.box}/>
                            <View style={{padding:20}}>
                                <Text style={styles.text}>Username</Text>
                                <MainScreensInput placeholder={'username'} secure={false} maxLength={15} onChangeText={username => this.setState({username})}/>

                                <Text style={styles.text}>Password</Text>
                                <MainScreensInput placeholder={'password'} secure={true} maxLength={20} onChangeText={password => this.setState({password})}/>

                                <Button title={'Login'} buttonStyle={styles.submitButton} titleStyle={{fontWeight:'bold'}} 
                                    onPress={() => this.login(this.state.username, this.state.password)}/>
                                <Text style={styles.registerText} onPress={() => this.props.navigation.navigate('Register')}>Register</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    componentDidMount() {
        this.getKeys();
        const userCreated = this.props.route.params;
        if (userCreated)
            ToastAndroid.show('User created!', ToastAndroid.SHORT);
    }

    login = async (username, password) => {
         let url = `${Constants.BASE_URL}Users?userId=${username}&password=${md5(password)}`;
         axios.get(url).then(response => { 
             if (response.data) {
                 if (!this.state.keysFound)
                    this.setKeys(username, password);
                 ToastAndroid.show('Logging in...', ToastAndroid.SHORT);
                 this.getUserData(username);
             } else
                 ToastAndroid.show('Username or password wrong', ToastAndroid.SHORT);
          }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    getUserData = (username) => {
        const url = `${Constants.BASE_URL}Users/UserData?userId=${username}`;
        axios.get(url).then(r => this.props.navigation.replace('Home', {username: username, profileImage: r.data.Image}))
            .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    setKeys = async (username, password) => {
        let userKeys = {
            username: username,
            password: password
        }
        await AsyncStorage.setItem(Constants.LOGIN_KEY, JSON.stringify(userKeys));
    }

    getKeys = async () => {
        let jsonString = await AsyncStorage.getItem(Constants.LOGIN_KEY);
        if (jsonString !== null) {
            this.setState({keysFound: true}, () => this.login(JSON.parse(jsonString).username, JSON.parse(jsonString).password));
        }
    }

};

const styles = StyleSheet.create({
    mainView: {
        height: '100%', width: '100%'
    },
    screenOpacity: {
        width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute'
    },
    bgImg: {
        width: '100%', height: '100%', resizeMode: 'cover'
    },
    headerContainer: {
        height: 100, width: '100%'
    },
    loginHeader: {
        opacity: 0.75, backgroundColor: '#070707', height: 100, width: '100%', position: 'absolute'
    },
    logoHeader: {
        width: 180, height: 60, margin: 20, resizeMode: 'stretch'
    },
    userBox: {
        backgroundColor: 'transparent', marginTop: 100, marginBottom: 100, width: '80%', alignSelf: 'center', borderRadius: 10,
    },
    box: {
        height: '100%', width: '100%', backgroundColor: 'black', position: 'absolute', borderRadius: 10, opacity: 0.75
    },
    text: {
        color: 'white', fontWeight: 'bold', fontSize: 22, marginLeft: 10, marginBottom: 5
    },
    registerText: {
        fontSize: 18, textAlign: 'right', color: 'white', marginTop: 20
    },
    submitButton: {
        backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 10, marginRight: 10
    }
});

export default Login;