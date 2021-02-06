import React from 'react';
import { StyleSheet, View, Image, Text, ToastAndroid, Alert } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Picker} from '@react-native-picker/picker';
import TouchableButton from './../components/general/TouchableButton';

export default class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,

            PaymentDate: '0001-01-01',
            BillingPeriod: 'Monthly',
            Price: 0,

            priceValues: ['']
        }
    }

    render() {
        const {username, providerId, providerName, providerLogo} = this.props.route.params;
        return (
            <View style={styles.mainView}>
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                <ScrollView style={styles.mainBody} showsVerticalScrollIndicator={false}>
                    <Text style={styles.providerName}>{providerName}</Text>
                    <View style={styles.imageContainer}>
                        <Image style={styles.imageLogo} source={{uri: 'data:image/png;base64,' + providerLogo}}/>
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.inputsContainerResize}>
                            <Text style={styles.titleText}>Next Payment</Text>
                            <View style={styles.dateInputContainer}>
                                <TouchableOpacity style={styles.dateTouchableBox} onPress={() => this.setState({visible: true})}>
                                    <Text style={styles.btnText}>{this.state.PaymentDate}</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.titleText}>Payment Period</Text>
                            <View style={styles.pickersInputContainer}>
                                <View style={styles.pickersTouchableBox}>
                                    <Text style={styles.btnText}>{this.state.BillingPeriod}</Text>
                                </View>
                                <Picker selectedValue={this.state.BillingPeriod} onValueChange={(value, index) => this.setState({BillingPeriod: value})} dropdownIconColor='white'>
                                    <Picker.Item label={'Monthly'} value={'Monthly'} color='#797979'/>
                                    <Picker.Item label={'Yearly'} value={'Yearly'} color='#797979'/>
                                </Picker>
                            </View>
                            <Text style={styles.titleText}>Price</Text>
                            <View style={styles.pickersInputContainer}>
                                <View style={styles.pickersTouchableBox}>
                                    <Text style={styles.btnText}>{this.state.Price}</Text>
                                </View>
                                <Picker selectedValue={this.state.Price} onValueChange={(value, index) => this.setState({Price: value})} dropdownIconColor='white'>
                                    {this.state.priceValues.map((val, index) => <Picker.Item label={val + '€'} value={val} key={index} color='#797979'/>)}
                                </Picker>
                            </View>
                        </View>
                    </View>

                    <View style={styles.submitContainer}>
                        {this.createSubmitButtons(this.state.addSub, providerId, providerName, username, this.state.uSubId)}
                    </View>
                </ScrollView>
                <FooterMenu selectedScreen={2} onSubscriptionsPress={() => this.props.navigation.replace('Subscriptions', { username: username })}/>
                <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' minimumDate={new Date()} 
                                onConfirm={(date) => this.selectDate(date)} onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>
            </View>
        );
    }

    componentDidMount() {
        const {addSub} = this.props.route.params;
        if (addSub) {
            this.setState({addSub: addSub});
            this.setState({PaymentDate: this.setCurrentDate()});
        } else {
            const {paymentDate, paymentPeriod, price, uSubId} = this.props.route.params;
            this.setState({addSub: addSub, PaymentDate: paymentDate, BillingPeriod: paymentPeriod, Price: price, uSubId: uSubId});
        }
        this.setPriceValues();
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;
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

    createSubmitButtons = (addSub, providerId, providerName, username, uSubId) => {
        if (addSub) {
            return (
                <TouchableButton btnWidth={'50%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={5} btnTxt={'Add'} 
                    onPress={() => this.addSubscription(providerId, providerName, username,  this.state.PaymentDate,  this.state.BillingPeriod,  this.state.Price)}/>
            );
        } else {
            return (
                <>
                    <TouchableButton btnWidth={'40%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={5} btnTxt={'Save changes'} 
                        onPress={() => this.editSubscription(uSubId, this.state.PaymentDate,  this.state.BillingPeriod,  this.state.Price, username)}/>
                    <TouchableButton btnWidth={'40%'} btnHeight={50} btnBgColor={'#EA392F'} borderRadius={5} btnTxt={'Remove'} 
                        onPress={() => this.removeSubscription(providerId, username)}/>
                </>
            );
        }
    }

    removeSubscription = (providerId, username) => {
        Alert.alert('Remove Subscription', `Do you want to cancel your subscription?`,
            [
              { text: 'Cancel', style: 'cancel', onPress: () => {} },
              { text: 'OK', onPress: () => this.deleteSubscription(providerId, username) }
            ],
            {cancelable: true},
          );
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
            //console.log(response.data);
            this.responseAction(response.data, 'Error: You already have a subscription with this provider.', username);
        }).catch(() => ToastAndroid.show('Error adding the subscription. Try again later.', ToastAndroid.SHORT));
    }

    editSubscription = (uSubId, paymentDate, paymentPeriod, price, username) => {
        //console.log(uSubId + paymentDate + paymentPeriod + price + username);
        let url = `${Constants.BASE_URL}UsersSubscriptions/${uSubId}?paymentDate=${paymentDate}&billingPeriod=${paymentPeriod}&price=${price}`;
        axios.put(url).then(response => {
            this.responseAction(response.data, 'Error updating the subscription. Try again later.', username);
        }).catch(error => console.log(error.response.request._response));
    }

    deleteSubscription = (providerId, username) => {
        axios.delete(`${Constants.BASE_URL}UsersSubscriptions?userId=${username}&providerId=${providerId}`).then(response => {
            this.responseAction(response.data, 'Error deleting the subscription. Try again later.', username);
        }).catch(error => console.log(error.response.request._response));
    }

    responseAction = (responseWorked, errorMsg, username) => {
        if (responseWorked)
            this.props.navigation.replace('Subscriptions', { username: username });//Replace to: Render again Subscriptions
        else
            ToastAndroid.show(errorMsg, ToastAndroid.SHORT);
    }

};

const styles = StyleSheet.create({
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    mainBody: {
        padding: 25, flex:1, backgroundColor:'transparent'
    },
    imageContainer: {
        width:'100%', height:150, backgroundColor:'transparent', justifyContent:'center', alignItems:'center'
    },
    imageLogo: {
        width: 128, height: 128, borderRadius:25
    },
    inputsContainer: {
        width:'100%', backgroundColor:'transparent', alignItems:'center', display:'flex'
    },
    inputsContainerResize: {
        width: '90%'
    },
    dateInputContainer: {
        height: 45, marginTop: 5
    },
    dateTouchableBox: {
        width: '100%', height: 45, backgroundColor:'#797979', borderRadius: 10, justifyContent: 'center', alignItems: 'center'
    },
    pickersInputContainer: {
        height: 45, marginTop: 5, borderRadius: 10, backgroundColor:'#797979'
    },
    pickersTouchableBox: {
        width:'100%', height:45, position:'absolute', borderRadius:10, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'
    },
    submitContainer: {
        width:'100%', height: 130, backgroundColor:'transparent', alignItems:'center', justifyContent:'space-evenly', paddingBottom: 20, display:'flex', flexDirection:'row'
    },
    providerName: {
        fontSize:32, color:'#24B24A', fontWeight:'bold', textAlign:'center'
    },
    btnText: {
        fontSize:18, color:'white', fontWeight:'bold'
    },
    titleText: {
        fontSize:22, color:'white', fontWeight:'bold', marginTop: 15
    }
});