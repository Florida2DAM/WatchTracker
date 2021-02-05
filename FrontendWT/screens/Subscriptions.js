import { Button } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const numColumns = 3;

export default class Subscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userSubscriptions: []
        }
    }

    render() {
        const {username} = this.props.route.params;
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#1A1A1A' }}>
                {/*<View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.3, position: 'absolute' }} />*/}
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                
                <View style={{padding: 15, paddingTop:25, backgroundColor:'transparent', flex:1}}>
                    <Button title={'Add Subscriptions'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30}}
                        titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>

                    <View style={{marginTop:25}}/>


                    <View style={{width: '100%', height: 170, backgroundColor:'gray', borderRadius:10}}>
                        <View style={{width:'100%', height:50, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'transparent'}}>
                            <Image style={{width:50, height:50, borderRadius:5}} source={{uri : 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg'}}/>
                            <Text style={{fontSize:30, fontWeight:'bold', color:'white', marginLeft:10}}>Youtube Premium</Text>
                        </View>

                        <View style={{width:'100%', height:80, display:'flex', flexDirection:'row', backgroundColor:'transparent'}}>
                            <View style={{width:'33%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Payment</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={'2020-20-24'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5}} titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>
                                </View>
                            </View>
                            <View style={{width:'34%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Period</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={'Monthly'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5}} titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>
                                </View>
                            </View>
                            <View style={{width:'33%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Price</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={'10€'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5}} titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'100%', height:40, display:'flex', flexDirection:'row', backgroundColor:'transparent'}}>
                            <View style={{width:'50%', justifyContent:'center', alignItems:'center', backgroundColor:'#EA392F', borderBottomLeftRadius: 10}}>
                                <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={styles.textInfoB}>Remove</Text>
                                    <View style={{width:10}}/>
                                    <Icon size={30} name='times' color='white' onPress={() => console.log('')}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%', justifyContent:'center', alignItems:'center', backgroundColor:'#24B24A', borderBottomRightRadius: 10}}>
                                <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                                    <Text style={styles.textInfoB}>Renew</Text>
                                    <View style={{width:10}}/>
                                    <Icon size={30} name='retweet' color='white' onPress={() => console.log('')}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>



                </View>
                <FooterMenu selectedScreen={2}/>
            </View>
        );
    }

    componentDidMount() {
        const {username} = this.props.route.params;
        this.getUserSubscriptions(username);
    }

    getUserSubscriptions = (username) => {
         let url = `${Constants.BASE_URL}UsersSubscriptions?userId=${username}`;
         axios.get(url).then(response => { 
             console.log(response.data[0].ProviderId);
          }).catch(error => console.log(error.response.request._response));
    }

};

const styles = StyleSheet.create({
    textInfo: {
        fontSize:18, 
        color:'white'
    },
    textInfoB: {
        fontSize:18, 
        color:'white',
        fontWeight:'bold'
    }
});