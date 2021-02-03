import { Button, colors, Icon, Text, Input } from 'react-native-elements';
import React from 'react';
import { ImageBackground, StyleSheet, View, Header, Image, ScrollView } from 'react-native';



export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            name: null,
            surname: null,
            birthday: null
        }
    }

    render() {
        return (
            <View style={{ height: '100%', width: '100%' }}>
                <ImageBackground style={{ width: '100%', height: '100%', resizeMode: 'cover' }} source={require('../assets/img/ImagenBackground.jpeg')}>
                    {/*Apply general opacity*/}
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute' }} />
                    <View style={{ height: 100, width: '100%' }}>
                        <View style={styles.loginHeader} />
                        <Image style={styles.logoHeader} source={require('../assets/img/Logo1.png')} />
                    </View>
                    <ScrollView>
                        <View style={styles.userBox}>
                            <View style={{
                                height: '100%', width: '100%', backgroundColor: 'black', position: 'absolute',
                                borderRadius: 10, opacity: 0.75
                            }} />
                            <View style={{ padding: 20 }}>
                                <Text style={styles.text}>Username</Text>
                                <Input style={styles.input} inputContainerStyle={styles.inputContainer} maxLength={15}
                                    onChangeText={r => this.setState({ username: r })} />

                                <Text style={styles.text}>Password</Text>
                                <Input style={styles.input} maxLength={20} inputContainerStyle={styles.inputContainer}
                                    secureTextEntry={true} onChangeText={r => this.setState({ password: r })} />

                                <Text style={styles.text}>Email</Text>
                                <Input style={styles.input} maxLength={20} inputContainerStyle={styles.inputContainer}
                                    onChangeText={r => this.setState({ email: r })} />

                                <Text style={styles.text}>Name</Text>
                                <Input style={styles.input} maxLength={20} inputContainerStyle={styles.inputContainer}
                                    onChangeText={r => this.setState({ name: r })} />

                                <Text style={styles.text}>Surname</Text>
                                <Input style={styles.input} maxLength={20} inputContainerStyle={styles.inputContainer}
                                    onChangeText={r => this.setState({ surname: r })} />
                                
                                <Text style={styles.text}>Date of Birth</Text>
                                <Input style={styles.input} maxLength={20} inputContainerStyle={styles.inputContainer}
                                    onChangeText={r => this.setState({ birthday: r })} />

                                <Button title={'Sing up'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 10, marginRight: 10 }}
                                    titleStyle={{ fontWeight: 'bold' }} onPress={this.checkUser} />
                                <Text style={styles.registerText} onPress={() => console.log('Register...')}>Return to login</Text>
                                {/*Forgot Password no implementado por ahora*/}
                                {/*<Text style={styles.registerText} onPress={() => console.log('Register...')}>Forgot Password?</Text>*/}
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        );
    }

    checkUser = () => {
        console.log('Check username and password...');
        // let url = `${this.BASE_URL}Users?userId=${this.state.username}&password=${this.state.password}`;
        // axios.get(url).then(response => { console.log(response.data); })
        //     .catch(error => console.log(error.response.request._response));
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
    input: {
        color: 'white'
    },
    inputContainer: {
        borderWidth: 2,
        borderBottomWidth: 2,
        borderRadius: 80,
        borderColor: 'green'
    },
    registerText: {
        fontSize: 18,
        textAlign: 'right',
        color: 'white',
        marginTop: 20
    }
});
