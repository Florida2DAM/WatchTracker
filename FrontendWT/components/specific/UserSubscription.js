import React from 'react';
import { StyleSheet, View, Image, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import Constants from './../../common/Constants';
import axios from 'axios';

export default class UserSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uSub: [],
            visible: false,
        }
    }

    render() {//providerLogo, providerName, paymentPeriod, paymentDate, price
        return (
            <Pressable onLongPress={() => console.log(this.removeSubscription(this.props.p.item.ProviderName))} onPress={() => console.log('Short')}>
                <TouchableOpacity style={{width: '100%', height: 150, backgroundColor:'#212121', display:'flex', flexDirection:'row', alignItems:'center', padding: 10}}>
                    <View>
                        <Image style={{width:90, height:90, borderRadius:50, marginRight:10}} source={{uri : 'data:image/png;base64,' + this.props.p.item.ProviderLogo}}/>
                    </View>
                    <View style={{height: 150, backgroundColor:'transparent', flex:1, marginLeft:10}}>
                        <View style={{width: '100%', height: 50, backgroundColor:'transparent', alignItems:'center', justifyContent:'space-between', display:'flex', flexDirection:'row'}}>
                            <Text style={styles.providerName}>{this.props.p.item.ProviderName}</Text>
                            <Text style={styles.textInfoB}>{this.props.p.item.Price} €</Text>
                        </View>
                        <View style={{width: '100%', height: 100, backgroundColor:'transparent', justifyContent:'center'}}>
                            <Text style={styles.textInfoB}>Period: {this.props.p.item.BillingPeriod}</Text>
                            <Text style={styles.textInfoB}>Payment: {this.props.p.item.PaymentDate}</Text>
                            <Text style={styles.textInfoB}>Days left: {this.state.daysLeft}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Pressable>
        );
    }

    removeSubscription = (providerName) => {
        Alert.alert('Remove Subscription', `Do you want to cancel your subscription with ${this.props.p.item.ProviderName}?`,
            [
              { text: 'Cancel', style: 'cancel', onPress: () => {} },
              { text: 'OK', onPress: () => this.deleteSubscriptionFromDB() }
            ],
            {cancelable: true},
          );
    }

    deleteSubscriptionFromDB = () => {
        //DELETE api/UsersSubscriptions?userId={userId}&providerId={providerId}
        axios.delete(`${Constants.BASE_URL}UsersSubscriptions?userId=${this.props.p.item.UserId}&providerId=${this.props.p.item.ProviderId}`).then(response => {
            if (response.data) {
                this.props.callback();
            }
        }).catch(error => console.log(error.response.request._response));
    }

    componentDidMount() {
        this.setState({uSub: this.props.p.item}, () => this.setState({daysLeft: this.daysLeft()}));
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;

        let uSub = Object.assign({}, this.state.uSub);
        uSub.PaymentDate = selectedDate;

        this.setState({uSub});
        this.setState({visible: false});
    }

    daysLeft = () => {
        const [year, month, day] = this.state.uSub.PaymentDate.split("-");
        let payDate = new Date(year, month - 1, day);
        //let daysLeft = Math.round((payDate-Date.now())/(1000*60*60*24)) + 1;
        let daysLeft = Math.round((payDate-Date.now())/(1000*60*60*24));
        return daysLeft >= 0 ? daysLeft : 0;
    }

};

const styles = StyleSheet.create({
    providerName: {
        fontSize:25, 
        color:'#24B24A',
        fontWeight:'bold'
    },
    textInfo: {
        fontSize:18, 
        color:'white'
    },
    textInfoB: {
        fontSize:18, 
        color:'white',
        fontWeight:'bold'
    },

    btnStyle: {
        backgroundColor: '#24B24A', 
        borderRadius: 5
    },
    btnTxtStyle: {
        fontWeight: 'bold', 
        fontSize:14
    }
});