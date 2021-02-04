import { Button, Text, Input } from 'react-native-elements';
import React from 'react';
import { ImageBackground, StyleSheet, View, Image, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import MainScreensInput from './../components/specific/MainScreensInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import axios from 'axios';
import Constants from './../common/Constants';
import md5 from 'md5';

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            name: '',
            surname: '',
            birthday: '',

            visible: false,

            usernameRegex: false,
            passwordRegex: false,
            emailRegex: false
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'cover' }} resizeMode={'stretch'} source={require('./../assets/img/bg.jpg')}>
                    {/*Apply general opacity*/}
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute' }} />
                    <View style={{ height: 100, width: '100%' }}>
                        <View style={styles.loginHeader} />
                        <Image style={styles.logoHeader} source={require('../assets/img/Logo1.png')} />
                    </View>
                    <ScrollView>
                        <View style={styles.userBox}>
                            <View style={{ height: '100%', width: '100%', backgroundColor: 'black', position: 'absolute',
                                borderRadius: 10, opacity: 0.75 }}/>
                            <View style={{ padding: 20 }}>
                                <Text style={styles.text}>Username</Text>
                                <Input value={this.state.username} maxLength={15} disabledInputStyle={{opacity:1}} style={{color: 'white'}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:80, borderColor: !this.state.usernameRegex && this.state.username.length > 0 ? '#EA392F' : '#24B24A'}} placeholder={'username'} placeholderTextColor={'white'} 
                                onChangeText={username => this.setState({username}, () => this.checkUsernameRegex())}/>
                                <Text style={styles.text}>Password</Text>
                                <Input value={this.state.password} style={{color: 'white'}} secureTextEntry={true} maxLength={20} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:80, borderColor: !this.state.passwordRegex && this.state.password.length > 0 ? '#EA392F' : '#24B24A'}} placeholder={'password'} placeholderTextColor={'white'} 
                                onChangeText={password => this.setState({password}, () => this.checkPasswordRegex())}/>
                                <Text style={styles.text}>Email</Text>
                                <Input value={this.state.email} style={{color:'white'}}  maxLength={40} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:80, borderColor: !this.state.emailRegex && this.state.email.length > 0 ? '#EA392F' : '#24B24A'}} placeholder={'example@gmail.com'} placeholderTextColor={'white'} 
                                onChangeText={email => this.setState({email}, () => this.checkEmailRegex())}/>
                                <Text style={styles.text}>Name</Text>
                                <MainScreensInput placeholder={'Name'} secure={false} maxLength={15} onChangeText={name => this.setState({name})}/>
                                <Text style={styles.text}>Surname</Text>
                                <MainScreensInput placeholder={'Surnames'} secure={false} maxLength={30} onChangeText={surname => this.setState({surname})}/>
                                <Text style={styles.text}>Date of birth</Text>
                                <TouchableOpacity style={{backgroundColor:'transparent', height:50}} onPress={() => this.setState({visible: true})}>
                                    <MainScreensInput placeholder={'yyyy-dd-mm'} secure={false} disabled={true} maxLength={30} value={this.state.birthday}/>
                                </TouchableOpacity>
                                <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' maximumDate={new Date()}
                                             onConfirm={(date) => this.selectDate(date)} onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>

                                <View style={{height:30}}/>
                                <Button title={'Sing up'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 10, marginRight: 10}}
                                    titleStyle={{ fontWeight: 'bold' }} onPress={() => this.signUp()} />
                                <Text style={styles.registerText} onPress={() => this.props.navigation.navigate('Login')}>Return to login</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    checkUsernameRegex = () => this.setState({usernameRegex: Constants.USERNAME_REG_EXP.test(this.state.username)});

    checkPasswordRegex = () => this.setState({passwordRegex: Constants.PASSWORD_REG_EXP.test(this.state.password)});

    checkEmailRegex = () => this.setState({emailRegex: Constants.EMAIL_REG_EXP.test(this.state.email)});

    signUp = () => {
        let usernameAvailable = false;
        let emailAvailable = false;
        let url = `${Constants.BASE_URL}Users?userId=${this.state.username}`;
        axios.get(url).then(e => {
            usernameAvailable = !e.data;
            url = `${Constants.BASE_URL}Users?email=${this.state.email}`;
            axios.get(url).then(e => {
                emailAvailable = !e.data;
                //console.log(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.name + " " + this.state.surname + " " + this.state.birthday);
                if (this.state.name.length > 0 && this.state.surname.length > 0 && this.state.birthday.length > 0 
                    && this.state.usernameRegex && this.state.passwordRegex && this.state.emailRegex && usernameAvailable && emailAvailable) {
                    this.addUser();
                } else {
                    ToastAndroid.show('Sign up error: All fields must be filled.', ToastAndroid.SHORT);
                    if (!usernameAvailable || !emailAvailable) {
                        ToastAndroid.show('Error: Username or email already exisits.', ToastAndroid.LONG);
                    }
                }
            }).catch();
        }).catch();
    }
      
    addUser = () => {
        let s = Object.assign({}, this.state);
        let url = `${Constants.BASE_URL}Users`;
        let data = { 
            UserId: this.state.username, 
            Password: md5(this.state.password),
            Email: this.state.email,
            Name: this.state.name,
            Surname: this.state.surname,
            Birthday: this.state.birthday,
            Image: null
        }
        axios.post(url, data).then(() => {
            this.props.navigation.navigate('Login', {userCreated: true});
        }).catch(() => ToastAndroid.show('Error creating the user. Try again later.', ToastAndroid.LONG));
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;

        this.setState({birthday: selectedDate});
        this.setState({visible: false});
    }

};

const styles = StyleSheet.create({
    loginHeader: {
        opacity: 0.75,
        backgroundColor: '#070707',
        height: 100, width: '100%',
        position: 'absolute'
    },
    logoHeader: {
        width: 180,
        height: 60,
        margin: 20,
        resizeMode: 'stretch'
    },
    userBox: {
        backgroundColor: 'transparent',
        marginTop: 100,
        marginBottom: 100,
        width: '80%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
        marginLeft: 10,
        marginBottom: 5
    },
    registerText: {
        fontSize: 18,
        textAlign: 'right',
        color: 'white',
        marginTop: 20
    }
});
