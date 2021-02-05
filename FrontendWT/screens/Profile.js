import { Button, Text, Avatar, Icon } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';


export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Watching', 'Finished', 'Pending'],
            tableData: [
                ['1', '2', '3']
            ]
        }
    }

    render() {
        const state = this.state;
        return (

            <View style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute' }} />
                <View style={{ height: 100, width: '100%' }}>
                    <View style={styles.loginHeader} />
                    <Image style={styles.logoHeader} source={require('../assets/img/Logo2.png')} />
                    <Text style={styles.titleHeader}>Profile</Text>
                    <Avatar size="medium" rounded icon={{ name: 'user', type: 'font-awesome', color: '#24B24A' }} style={styles.userHeader} />
                </View>
                <ScrollView>
                    <View style={styles.profile}>
                        <View style={{ padding: 15 }}>
                            <Text style={styles.userData}>Name Surname</Text>
                            <Text style={styles.emailUser}>example@gmail.com</Text>

                            <Avatar size="xlarge" rounded icon={{ name: 'user', type: 'font-awesome', color: '#24B24A', position: 'absolute' }} style={styles.picture} />
                            <Button title={'Change'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, width: 150, marginLeft: 5, marginBottom: 5 }} titleStyle={{ fontWeight: 'bold' }} />
                            <View style={styles.container} >
                                <View style={styles.iconsContainer} >

                                    <Icon name='eye' type='entypo' color='#FFFFFF' />

 
                                    <Icon name='check-square-o' type='font-awesome' color='#FFFFFF' />

                                    
                                    <Icon name='eye-with-line' type='entypo' color='#FFFFFF' />

                                </View>
                                <Table borderStyle={{ borderWidth: 2, borderColor: 'black' }} style={{ backgroundColor: '#FFFFFF' }}>
                                    <Row data={state.tableHead} style={styles.head} textStyle={styles.textHead} />
                                    <Rows data={state.tableData} textStyle={styles.text} />
                                </Table>
                            </View>
                            <Button title={'Change Password'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 20, marginRight: 20, marginTop: 20 }} titleStyle={{ fontWeight: 'bold' }} />
                            <Button title={'Edit Profile'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 20, marginRight: 20, marginTop: 15, marginBottom: 70 }} titleStyle={{ fontWeight: 'bold' }} />
                            <Button title={'Logout'} buttonStyle={{ backgroundColor: '#EA392F', borderRadius: 5, marginLeft: 20, marginRight: 20 }} titleStyle={{ fontWeight: 'bold' }} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    profile: {
        backgroundColor: 'transparent',
        borderRadius: 10,
    },
    loginHeader: {
        backgroundColor: '#0A0A0A',
        height: 80, width: '100%',
        position: 'absolute',
        borderBottomColor: 'black',
        borderBottomWidth: 2
    },
    container: {
        padding: 16,
        paddingTop: 50

    },
    iconsContainer: {
        width: '100%', 
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 15,
        top: 15
    },
    head: {
        height: 40,
        backgroundColor: '#24B24A'
    },
    text: {
        margin: 6,
        textAlign: 'center'

    },
    textHead: {
        margin: 7,
        textAlign: 'center',
        fontWeight: 'bold'

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
    picture: {
        width: 130,
        height: 120,
        right: 5,
        borderRadius: 20,
        borderColor: '#24B24A',
        borderWidth: 2,
        margin: 15
    },
    titleHeader: {
        width: 120,
        height: 70,
        margin: 30,
        left: 100,
        fontSize: 20,
        color: '#24B24A',
        fontWeight: 'bold',
        position: 'absolute'

    },
    userData: {
        width: 120,
        height: 70,
        margin: 35,
        left: 140,
        fontSize: 17,
        color: '#FFFFFF',
        position: 'absolute'
    },
    emailUser: {
        width: 200,
        height: 100,
        margin: 60,
        left: 115,
        fontSize: 17,
        color: '#FFFFFF',
        position: 'absolute'
    }
});