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

const numColumns = 3;

export default class AddSubscription extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userSubscriptions: [],

            
            visible: false,

            PaymentDate: 'XXXX-XX-XX',
            BillingPeriod: 'Monthly',
            Price: 0
        }
    }

    render() {
        const {username} = this.props.route.params;
        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#1A1A1A' }}>
                <Header title={'Subscriptions'} name={username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>
                {/* marginBottom: 20 */}
                <ScrollView style={{padding: 25, backgroundColor:'transparent', flex:1, backgroundColor:'pink'}}>
                    <Text style={styles.providerName}>Netflix</Text>
                    <View style={{width:'100%', height:192, backgroundColor:'yellow', justifyContent:'center', alignItems:'center'}}>
                        <Image style={{width: 128, height: 128, borderRadius:25}} source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Netflix-new-icon.png/480px-Netflix-new-icon.png'}}/>
                    </View>
                    <View style={{width:'100%', backgroundColor:'brown', alignItems:'center', display:'flex'}}>
                        <Text style={styles.titleText}>Next Payment</Text>
                        <View style={{width: '90%', height: 50, marginTop: 5}}>
                            <TouchableOpacity style={{width: '100%', height: 50, backgroundColor:'#797979', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}
                            onPress={() => this.setState({visible: true})}>
                                <Text style={styles.btnText}>{this.state.PaymentDate}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleText}>Payment Period</Text>
                        <View style={{width: '90%', height: 50, marginTop: 5}}>
                            <TouchableOpacity style={{width: '100%', height: 50, backgroundColor:'#797979', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.btnText}>{this.state.BillingPeriod}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.titleText}>Price</Text>
                        <View style={{width: '90%', height: 50, marginTop: 5}}>
                            <TouchableOpacity style={{width: '100%', height: 50, backgroundColor:'#797979', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.btnText}>{this.state.Price} €</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'100%', backgroundColor:'blue', alignItems:'center', display:'flex'}}>
                        <Button title={'Add Subscription'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30}}
                            titleStyle={{ fontWeight: 'bold' }} onPress={() => this.props.navigation.navigate('Providers', {username: 'jolame'})}/>
                    </View>
                    {/*<Button title={'Add Subscriptions'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30}}
                        titleStyle={{ fontWeight: 'bold' }} onPress={() => this.props.navigation.navigate('Providers', {username: 'jolame'})}/>*/}
                </ScrollView>
                <FooterMenu selectedScreen={2} onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', {username: 'jolame'})}/>



                <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' minimumDate={new Date()}
                                             onConfirm={(date) => this.selectDate(date)} onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>
            </View>
        );
    }

    componentDidMount() {
        const {username} = this.props.route.params;
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

};

const styles = StyleSheet.create({
    providerName: {
        fontSize:32, 
        color:'#24B24A',
        fontWeight:'bold',
        textAlign:'center'
    },
    btnText: {
        fontSize:22, 
        color:'white',
        fontWeight:'bold'
    },
    titleText: {
        fontSize:22, 
        color:'white',
        fontWeight:'bold',
        marginTop: 15
    }
});