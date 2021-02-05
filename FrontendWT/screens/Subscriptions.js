import { Button } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import UserSubscription from './../components/specific/UserSubscription';

const numColumns = 3;

export default class Subscriptions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userSubscriptions: [],

            
            visible: false,
        }
    }

    render() {
        const {username} = this.props.route.params;
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#1A1A1A' }}>
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                
                <View style={{padding: 15, paddingTop:25, backgroundColor:'transparent', flex:1}}>
                    <Button title={'Add Subscriptions'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30}}
                        titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>
                    <FlatList data={this.state.userSubscriptions} keyExtractor={(item, index) => index.toString()} 
                        ItemSeparatorComponent={() => <View style={{height: 0}}/>} style={{padding: 15}} renderItem={item => <UserSubscription p={item}/>}/>
                </View>
                <FooterMenu selectedScreen={2}/>
            </View>
        );
    }

    componentDidMount() {
        const {username} = this.props.route.params;
        this.getUserSubscriptions(username);
    }

    getUserSubscriptions = (username) => {//ProviderLogo UserSubscriptionsId, ProviderName PaymentDate BillingPeriod Price UserId ProviderId
         let url = `${Constants.BASE_URL}UsersSubscriptions?userId=${username}`;
         axios.get(url).then(response => { 
             //console.log(response.data[0].ProviderName);
             for (let i = 0; i < response.data.length; i++) {
                response.data[i].PaymentDate = response.data[i].PaymentDate.substring(0, 10);//Get date formated to yyyy-mm-dd
             }
             this.setState({userSubscriptions: response.data});
          }).catch(error => console.log(error.response.request._response));
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;

        this.setState({paymentDate: selectedDate});
        this.setState({visible: false});
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