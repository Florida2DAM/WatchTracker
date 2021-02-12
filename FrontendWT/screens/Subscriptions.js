import React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
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
            visible: false
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header title={'Subscriptions'} username={this.state.username} profileImage={this.state.profileImage} showReturn={true} onBack={() => this.props.navigation.goBack()}
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <View style={styles.mainBody}>
                    <View style={styles.btnMargin}>
                        <TouchableButton btnWidth={'100%'} btnHeight={40} btnBgColor={'#24B24A'} borderRadius={5} btnTxt={'Add Subscriptions '} 
                            onPress={() => this.props.navigation.replace('Providers', {username: this.state.username, profileImage: this.state.profileImage})}/>
                    </View>
                    <FlatList data={this.state.userSubscriptions} keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={<View style={styles.separatorBar}/>} ListFooterComponent={<View style={styles.separatorBar}/>}
                        ItemSeparatorComponent={() => <View style={styles.separatorBar}/>} style={{padding: 0}} renderItem={item => <UserSubscription p={item}
                        refreshCallback={this.getChildRefreshResponse.bind(this)} editCallback={this.getChildEditResponse.bind(this)}/>}/>
                </View>
                
                <FooterMenu selectedScreen={2}
                    onSearchPress={() => this.props.navigation.navigate('Search', { username: this.state.username, profileImage: this.state.profileImage })}
                    onMyListPress={() => this.props.navigation.replace('MyList', { username: this.state.username, profileImage: this.state.profileImage })}
                    onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username, profileImage: this.state.profileImage })}
                    onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}
                    onProfilePress={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
            </View>
        );
    }

    componentDidMount() {
        const {username, profileImage} = this.props.route.params;
        this.setState({username: username, profileImage: profileImage});
        this.getUserSubscriptions(username);
    }

    getChildRefreshResponse = () => {
        this.getUserSubscriptions(this.state.username);
    }

    getChildEditResponse = (uSub, paymentDate, paymentPeriod, price) => {
        this.props.navigation.navigate('AddSubscription', 
            { addSub: false, paymentDate: paymentDate, paymentPeriod: paymentPeriod, price: price, 
            username: uSub.UserId, providerId: uSub.ProviderId, providerName: uSub.ProviderName, providerLogo: uSub.ProviderLogo, uSubId: uSub.UserSubscriptionsId, profileImage: this.state.profileImage });
    }

    getUserSubscriptions = (username) => {
         let url = `${Constants.BASE_URL}UsersSubscriptions?userId=${username}`;
         axios.get(url).then(response => {
             for (let i = 0; i < response.data.length; i++) {
                response.data[i].PaymentDate = response.data[i].PaymentDate.substring(0, 10);//Get date formated to yyyy-mm-dd
             }
             this.setState({userSubscriptions: response.data});
          }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
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