import { Button } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
            <TouchableOpacity style={{width: '100%', height: 150, backgroundColor:'#212121', display:'flex', flexDirection:'row', alignItems:'center', padding: 10}}>{/* Padding Left? */}
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








            /*<View style={{width: '100%', height: 170, backgroundColor:'gray', borderRadius:10, marginTop:25, marginBottom:25}}>
                        <View style={{width:'100%', height:50, display:'flex', flexDirection:'row', alignItems:'center', backgroundColor:'transparent'}}>
                            <Image style={{width:50, height:50, borderRadius:5}} source={{uri : 'data:image/png;base64,' + this.props.p.item.ProviderLogo}}/>
                            <Text style={{fontSize:30, fontWeight:'bold', color:'white', marginLeft:10}}>{this.props.p.item.ProviderName}</Text>
                        </View>

                        <View style={{width:'100%', height:80, display:'flex', flexDirection:'row', backgroundColor:'transparent'}}>
                            <View style={{width:'33%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Payment</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={this.state.uSub.PaymentDate} buttonStyle={styles.btnStyle} titleStyle={styles.btnTxtStyle} 
                                    onPress={() => this.setState({visible: true})}/>
                                </View>

                                <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' minimumDate={new Date()}
                                             onConfirm={(date) => this.selectDate(date)} onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>

                            </View>
                            <View style={{width:'34%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Period</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={this.state.uSub.BillingPeriod} buttonStyle={styles.btnStyle} titleStyle={styles.btnTxtStyle} onPress={() => console.log('')}/>
                                </View>
                            </View>
                            <View style={{width:'33%', height:80, display:'flex', flexDirection:'column', backgroundColor:'transparent', alignItems:'center'}}>
                                <Text style={styles.textInfo}>Price</Text>
                                <View style={{marginTop:5, width:'95%', height:40, marginLeft:5, marginRight:5}}>
                                    <Button title={this.state.uSub.Price + ' €'} buttonStyle={styles.btnStyle} titleStyle={styles.btnTxtStyle} onPress={() => console.log('')}/>
                                </View>
                            </View>
                        </View>

                        <View style={{width:'100%', height:40, display:'flex', flexDirection:'row', backgroundColor:'transparent'}}>
                            <View style={{width:'50%', justifyContent:'center', alignItems:'center', backgroundColor:'#EA392F', borderBottomLeftRadius: 10}}>
                                <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}} 
                                onPress={() => console.log(`Eliminar suscripción ${this.props.p.item.UserSubscriptionsId} en ${this.props.p.item.ProviderId}`)}>
                                    <Text style={styles.textInfoB}>Remove</Text>
                                    <View style={{width:10}}/>
                                    <Icon size={30} name='times' color='white'/>
                                </TouchableOpacity>
                            </View>
                            <View style={{width:'50%', justifyContent:'center', alignItems:'center', backgroundColor:'#24B24A', borderBottomRightRadius: 10}}>
                                <TouchableOpacity style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}
                                onPress={() => console.log(this.state.uSub.PaymentDate)}>
                                <Text style={styles.textInfoB}>Renew</Text>
                                <View style={{width:10}}/>
                                <Icon size={30} name='retweet' color='white'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>*/
        );
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
        let daysLeft = Math.round((payDate-Date.now())/(1000*60*60*24)) + 1;
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