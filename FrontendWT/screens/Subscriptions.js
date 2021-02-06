import React from 'react';
import { StyleSheet, View } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { FlatList } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import UserSubscription from './../components/specific/UserSubscription';
import TouchableButton from './../components/general/TouchableButton';

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
            <View style={styles.mainView}>
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                
                <View style={styles.mainBody}>
                    <View style={styles.btnMargin}>
                        <TouchableButton btnWidth={'100%'} btnHeight={40} btnBgColor={'#24B24A'} borderRadius={5} btnTxt={'Add Subscriptions'} 
                            onPress={() => this.props.navigation.navigate('Providers', {username: 'jolame'})}/>
                    </View>
                    <FlatList data={this.state.userSubscriptions} keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={<View style={styles.separatorBar}/>} ListFooterComponent={<View style={styles.separatorBar}/>}
                        ItemSeparatorComponent={() => <View style={styles.separatorBar}/>} style={{padding: 0}} renderItem={item => <UserSubscription p={item}
                        refreshCallback={this.getChildRefreshResponse.bind(this)} editCallback={this.getChildEditResponse.bind(this)}/>}/>
                </View>
                <FooterMenu selectedScreen={2} onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', { username: username })}/>
            </View>
        );
    }

    componentDidMount() {
        const {username} = this.props.route.params;
        this.setState({username, username});
        this.getUserSubscriptions(username);
    }

    getChildRefreshResponse = () => {
        this.getUserSubscriptions(this.state.username);
    }

    getChildEditResponse = (uSub, paymentDate, paymentPeriod, price) => {
        this.props.navigation.navigate('AddSubscription', 
            { addSub: false, paymentDate: paymentDate, paymentPeriod: paymentPeriod, price: price, 
            username: uSub.UserId, providerId: uSub.ProviderId, providerName: uSub.ProviderName, providerLogo: uSub.ProviderLogo, uSubId: uSub.UserSubscriptionsId });
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
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    mainBody: {
        paddingTop:25, backgroundColor:'transparent', flex:1
    },
    btnMargin: {
        marginLeft: 30, marginRight: 30, marginBottom: 25
    },
    textInfo: {
        fontSize:18,color:'white'
    },
    textInfoB: {
        fontSize:18,color:'white',fontWeight:'bold'
    },
    separatorBar: {
        width:'100%', height: 1, backgroundColor: '#727272'
    }
});