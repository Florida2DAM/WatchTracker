import { Button, colors, Icon, Text, Input, Avatar } from 'react-native-elements';
import React from 'react';
import { ImageBackground, StyleSheet, View, Header, Image, ScrollView } from 'react-native';



export default class Subscriptions extends React.Component {


    render() {
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute' }} />
                <View style={{ height: 100, width: '100%' }}>
                    <View style={styles.loginHeader} />
                    <Image style={styles.logoHeader} source={require('../assets/img/Logo2.png')} />
                    <Text style={styles.titleHeader}>Subscriptions</Text>
                    <Avatar size="medium" rounded icon={{name: 'user', type: 'font-awesome', color: '#24B24A' }} style={styles.userHeader}/>
                </View>
                <ScrollView>
                    <View>
                        <Button title={'Manage Subscriptions'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30 }}
                            titleStyle={{ fontWeight: 'bold' }} onPress={this.checkUser} />
                    </View>
                </ScrollView>
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
        backgroundColor: '#0A0A0A',
        height: 80, width: '100%',
        position: 'absolute',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
    },
    logoHeader: {
        width: 75,
        height: 60,
        left: 0,
        margin: 10,
        resizeMode: 'stretch',
        position: 'absolute'
    },
    userHeader: {
        width: 50,
        height: 45,
        right: 5,
        borderRadius: 20,
        borderColor: '#24B24A',
        borderWidth: 2,
        margin: 20,
        position: 'absolute'
    },
    titleHeader: {
        width: 120,
        height: 70,
        margin: 35,
        left: 100,
        fontSize: 17,
        color: '#24B24A',
        fontWeight: 'bold',
        position: 'absolute'

    },
});