import React from 'react';
import { StyleSheet, View, Image, Text, Alert, ToastAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Pressable } from 'react-native';
import Constants from './../../common/Constants';
import axios from 'axios';

export default class UserSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uSub: [],//uSub: UserSubscriptionsId, ProviderId , UserId, ProviderName, ProviderLogo, PaymentDate, BillingPeriod, Price
            visible: false,
        }
    }

    render() {
        return (
            <Pressable onLongPress={() => this.removeSubscription(this.props.p.item.ProviderName)} 
            onPress={() => this.props.editCallback(this.state.uSub, this.props.p.item.PaymentDate, this.props.p.item.BillingPeriod, this.props.p.item.Price)}>
                <TouchableOpacity style={styles.subscriptionCard}>
                    <View>
                        <Image style={styles.cardImage} source={{uri : 'data:image/png;base64,' + this.props.p.item.ProviderLogo}}/>
                    </View>
                    <View style={styles.cardRight}>
                        <View style={styles.cardRightTop}>
                            <Text style={styles.providerName}>{this.props.p.item.ProviderName}</Text>
                            <Text style={styles.textInfoB}>{this.props.p.item.Price} €</Text>
                        </View>
                        <View style={styles.cardRightBottom}>
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
        Alert.alert('Remove Subscription', `Do you want to cancel your subscription with ${providerName}?`,
            [
              { text: 'Cancel', style: 'cancel', onPress: () => {} },
              { text: 'OK', onPress: () => this.deleteSubscriptionFromDB() }
            ],
            {cancelable: true},
          );
    }

    deleteSubscriptionFromDB = () => {
        axios.delete(`${Constants.BASE_URL}UsersSubscriptions?userId=${this.props.p.item.UserId}&providerId=${this.props.p.item.ProviderId}`).then(response => {
            if (response.data) {
                this.props.refreshCallback();
            }
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
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
        let daysLeft = Math.round((payDate-Date.now())/(1000*60*60*24));
        return daysLeft >= 0 ? daysLeft : 0;
    }

};

const styles = StyleSheet.create({
    subscriptionCard: {
        width: '100%', height: 150, backgroundColor:'#212121', display:'flex', flexDirection:'row', alignItems:'center', padding: 10
    },
    cardImage: {
        width:90, height:90, borderRadius:50, marginRight:10
    },
    cardRight: {
        height: 150, backgroundColor:'transparent', flex:1, marginLeft:10
    },
    cardRightTop: {
        width: '100%', height: 50, backgroundColor:'transparent', alignItems:'center', justifyContent:'space-between', display:'flex', flexDirection:'row'
    },
    cardRightBottom: {
        width: '100%', height: 100, backgroundColor:'transparent', justifyContent:'center'
    },
    providerName: {
        fontSize:25,color:'#24B24A',fontWeight:'bold'
    },
    textInfo: {
        fontSize:18,color:'white'
    },
    textInfoB: {
        fontSize:18,color:'white',fontWeight:'bold'
    },
    btnStyle: {
        backgroundColor: '#24B24A', borderRadius: 5
    },
    btnTxtStyle: {
        fontWeight: 'bold', fontSize:14
    }
});