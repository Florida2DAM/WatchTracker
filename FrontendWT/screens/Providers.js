import { Button } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';

const numColumns = 3;

export default class Providers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          username: 'r',
          providers: [
              {key: 0, empty: true}
          ]
        }
    }

    screenWidth = Dimensions.get('window').width;

    render() {

        return (
            <View style={{ height: '100%', width: '100%', backgroundColor: '#1A1A1A' }}>
                <Header title={'Providers'} name={this.state.username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={true} onPress={() => this.props.navigation.goBack()}/>           
                <View style={{padding: 15, paddingTop:25, backgroundColor:'transparent', flex:1}}>
                    <Button title={'Manage Subscriptions'} buttonStyle={{ backgroundColor: '#24B24A', borderRadius: 5, marginLeft: 30, marginRight: 30}}
                        titleStyle={{ fontWeight: 'bold' }} onPress={() => console.log('')}/>
                    <FlatList data={this.formatData(this.state.providers, numColumns)} style={styles.container} 
                        columnWrapperStyle={{justifyContent:'space-evenly'}} renderItem={this.renderItem} numColumns={3}/>
                </View>
                <FooterMenu selectedScreen={2} onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', {username: 'jolame'})}/>
            </View>
        );
    }

    componentDidMount() {
      const {username} = this.props.route.params;
      this.setState({username: username});
        this.getProviders();
    }

    getProviders = () => {
         let url = `${Constants.BASE_URL}Providers`;
         axios.get(url).then(response => { 
             for (let i = 0; i < response.data.length; i++) {
                 //console.log(response.data[i].UserSubscriptionsId);
                 this.state.providers.push({key: response.data[i].ProviderId, name: response.data[i].ProviderName, img: response.data[i].ProviderLogo });
             }
             console.log(this.state.providers);
          }).catch(error => console.log(error.response.request._response));
    }


    renderItem = ({ item, index }) => {
        if (item.empty) {
          return <View style={[styles.itemContainerBox, styles.itemInvisible]} />;
        }
        return (
          <TouchableOpacity style={styles.itemContainerBox} 
          onPress={() => this.props.navigation.navigate('AddSubscription', {addSub: false, username: this.state.username, providerId: item.key, providerName: item.name, providerLogo: item.img})}>
            <Image style={{width: 100, height: 100, borderRadius:10}} source={{uri: 'data:image/png;base64,' + item.img}}/>
          </TouchableOpacity>
        );
      };

      formatData = (data, numColumns) => {
        const numberOfFullRows = Math.floor(data.length / numColumns);
      
        let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
        while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
            data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
          numberOfElementsLastRow++;
        }
        return data;
    }

};

//const boxWidth = Dimensions.get('window').width / numColumns - 15;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:25
    },
    itemContainerBox: {
      backgroundColor: 'gray',
      alignItems: 'center',
      justifyContent: 'center',
      width: 110,
      margin: 5,
      padding: 5,
      borderRadius: 10,
      height: 110,
    },
    itemInvisible: {
      backgroundColor: 'transparent',
      height:0,
      width: 0,
    },
    itemText: {
      color: '#fff',
    },
});