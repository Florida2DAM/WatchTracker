import { Button, colors, Icon, Text, Input } from 'react-native-elements';
import React from 'react';
import { ImageBackground, StyleSheet, View, Header, Image, ScrollView, TouchableOpacity } from 'react-native';
import MainScreensInput from './../components/specific/MainScreensInput';
import DateTimePickerModal from "react-native-modal-datetime-picker";


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

            visible: false
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
                                borderRadius: 10, opacity: 0.75 }} />
                            <View style={{ padding: 20 }}>
                                <Text style={styles.text}>Username</Text>
                                <MainScreensInput placeholder={'username'} secure={false} maxLength={15} onChangeText={username => this.setState({username})}/>
                                <Text style={styles.text}>Password</Text>
                                <MainScreensInput placeholder={'password'} secure={true} maxLength={20} onChangeText={password => this.setState({password})}/>
                                <Text style={styles.text}>Email</Text>
                                <MainScreensInput placeholder={'example@gmail.com'} secure={false} maxLength={35} onChangeText={email => this.setState({email})}/>
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
                                    titleStyle={{ fontWeight: 'bold' }} onPress={() => this.showState()} />
                                <Text style={styles.registerText} onPress={() => console.log('To Login...')}>Return to login</Text>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    showState = () => {
        console.log(this.state.username + " " + this.state.password + " " + this.state.email + " " + this.state.name + " " + this.state.surname + " " + this.state.birthday);
    }

    checkUser = () => {
        console.log('');
        // let url = `${this.BASE_URL}Users?userId=${this.state.username}&password=${this.state.password}`;
        // axios.get(url).then(response => { console.log(response.data); })
        //     .catch(error => console.log(error.response.request._response));
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
