import { Button } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, Text, ToastAndroid } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';

export default class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userSubscriptions: [],

            
            visible: false,

            PaymentDate: 'XXXX-XX-XX',
            BillingPeriod: 'Monthly',
            Price: 0,
            edit: false,

            priceValues: ['']
        }
    }

    render() {
        const {username, providerId, providerName, providerLogo} = this.props.route.params;
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#1A1A1A' }}>
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView style={{padding: 25, flex:1, backgroundColor:'transparent'}} showsVerticalScrollIndicator={false}>
                    <Text style={styles.providerName}>{providerName}</Text>
                    <View style={{width:'100%', height:150, backgroundColor:'transparent', justifyContent:'center', alignItems:'center'}}>
                        <Image style={{width: 128, height: 128, borderRadius:25}} source={{uri: 'data:image/png;base64,' + providerLogo}}/>
                    </View>
                    <View style={{width:'100%', backgroundColor:'transparent', alignItems:'center', display:'flex'}}>
                        <View style={{width: '90%'}}><Text style={styles.titleText}>Next Payment</Text></View>
                        <View style={{width: '90%', height: 45, marginTop: 5}}>
                            <TouchableOpacity style={{width: '100%', height: 45, backgroundColor:'#797979', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => this.setState({visible: true})}>
                                <Text style={styles.btnText}>{this.state.PaymentDate}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{width: '90%'}}><Text style={styles.titleText}>Payment Period</Text></View>
                        <View style={{width: '90%', height: 45, marginTop: 5, borderRadius: 10, backgroundColor:'#797979'}}>
                            <View style={{width:'100%', height:45, position:'absolute', borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
                                <Text style={styles.btnText}>{this.state.BillingPeriod}</Text>
                            </View>
                            <Picker selectedValue={this.state.BillingPeriod} onValueChange={(value, index) => this.setState({BillingPeriod: value})} dropdownIconColor='white'>
                                <Picker.Item label={'Monthly'} value={'Monthly'} color='#797979'/>
                                <Picker.Item label={'Yearly'} value={'Yearly'} color='#797979'/>
                            </Picker>
                        </View>
                        <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' minimumDate={new Date()} 
                            onConfirm={(date) => this.selectDate(date)} onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>
                        

                        <View style={{width: '90%'}}><Text style={styles.titleText}>Price</Text></View>
                        <View style={{width: '90%', height: 45, marginTop: 5, borderRadius: 10, backgroundColor:'#797979'}}>
                            <View style={{width:'100%', height:45, position:'absolute', borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
                                <Text style={styles.btnText}>{this.state.Price}</Text>
                            </View>
                            <Picker selectedValue={this.state.Price} onValueChange={(value, index) => this.setState({Price: value})} dropdownIconColor='white'>
                                {this.state.priceValues.map((v, i) => <Picker.Item label={v + '€'} value={v} key={i} color='#797979'/>)}
                            </Picker>
                        </View>
                    </View>
                    <View style={{width:'100%', height: 130, backgroundColor:'transparent', alignItems:'center', justifyContent:'center', paddingBottom: 20}}>
                        <View style={{width: '50%', height: 50}}>
                            <TouchableOpacity style={{backgroundColor: '#24B24A', width: '100%', height: 50, borderRadius: 5, alignItems:'center', justifyContent:'center'}}
                            onPress={() => this.addSubscription(providerId, providerName, username, this.state.PaymentDate, this.state.BillingPeriod, this.state.Price)}>
                                <Text style={styles.btnText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        {/*this.state.edit && <Button title={'Remove Subscription'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, width: '100%', height: 50}}
                            titleStyle={{ fontWeight: 'bold' }} onPress={() => this.props.navigation.navigate('Providers', {username: 'jolame'})}/>*/}
                    </View>
                </ScrollView>
                <FooterMenu selectedScreen={2} onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', {username: 'jolame'})}/>

            </View>
        );
    }

    componentDidMount() {
        const {addSub} = this.props.route.params;
        this.setState({addSub: addSub});
        this.setPriceValues();
        this.setState({PaymentDate: this.setCurrentDate()});
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;

        //let uSub = Object.assign({}, this.state.uSub);
        //uSub.PaymentDate = selectedDate;

        //this.setState({uSub});
        this.setState({PaymentDate: selectedDate});
        this.setState({visible: false});
    }

    setPriceValues = () => {
        const maxPrice = 100;
        let array = [];
        for (let i = 0; i <= maxPrice; i++) {
            array.push(i.toString());
        }
        this.setState({priceValues: array});
    }

    setCurrentDate = () => {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1;
        month = month.toString().length === 1 ? "0" + month : month;
        let day = dateObj.getUTCDate();
        day = day.toString().length === 1 ? "0" + day : day;
        let year = dateObj.getUTCFullYear();
        return year + "-" + month + "-" + day;
    }

    addSubscription = (providerId, providerName, username, paymentDate, paymentPeriod, price) => {
        let url = `${Constants.BASE_URL}UsersSubscriptions`;
        let data = { 
            ProviderName : providerName,
            PaymentDate : paymentDate,
            BillingPeriod : paymentPeriod,
            Price : price,
            UserId : username,
            ProviderId : providerId
        }
        axios.post(url, data).then((response) => {
            if (response.data) {
                this.props.navigation.replace('Subscriptions', { username: username });//Replace to: Render again Subscriptions
            } else {
                ToastAndroid.show('Error: You already have a subscription with this provider.', ToastAndroid.SHORT);
            }
        }).catch(() => ToastAndroid.show('Error adding the subscription. Try again later.', ToastAndroid.SHORT));
    }

};

const styles = StyleSheet.create({
    providerName: {
        fontSize:32, 
        color:'#24B24A',
        fontWeight:'bold',
        textAlign:'center'
    },
    btnText: {
        fontSize:18, 
        color:'white',
        fontWeight:'bold'
    },
    titleText: {
        fontSize:22, 
        color:'white',
        fontWeight:'bold',
        marginTop: 15,
    }
});