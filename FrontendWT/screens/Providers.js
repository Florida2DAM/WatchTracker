import React from 'react';
import { StyleSheet, View, Image, ToastAndroid } from 'react-native';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from './../common/Constants';
import axios from 'axios';
import TouchableButton from './../components/general/TouchableButton';

const NUM_COLUMNS = 3;

export default class Providers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          username: '',
          providers: [ {key: 0, empty: true} ]//Needed to render the future providers
        }
    }

    render() {

        return (
            <View style={styles.mainView}>
                <Header title={'Providers'} username={this.state.username} profileImage={this.state.profileImage} showReturn={true} onBack={() => this.props.navigation.goBack()}
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>          
                <View style={styles.mainBody}>
                    <View style={styles.btnMargin}>
                        <TouchableButton btnWidth={'100%'} btnHeight={40} btnBgColor={'#24B24A'} borderRadius={5} btnTxt={'My Subscriptions'} 
                            onPress={() => this.props.navigation.replace('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}/>
                    </View>
                    <FlatList data={this.formatData(this.state.providers, NUM_COLUMNS)} style={styles.container} 
                        columnWrapperStyle={{justifyContent:'space-evenly'}} renderItem={this.renderItem} numColumns={NUM_COLUMNS}/>
                </View>
                <FooterMenu selectedScreen={2}
                    onSearchPress={() => this.props.navigation.navigate('Search', { username: this.state.username, profileImage: this.state.profileImage })}
                    onMyListPress={() => this.props.navigation.navigate('MyList', { username: this.state.username, profileImage: this.state.profileImage })}
                    onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username, profileImage: this.state.profileImage })}
                    onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}
                    onProfilePress={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
            </View>
        );
    }

    componentDidMount() {
      const {username, profileImage} = this.props.route.params;
      this.setState({username: username, profileImage: profileImage});
      this.getProviders();
    }

    getProviders = () => {
         let url = `${Constants.BASE_URL}Providers`;
         axios.get(url).then(response => { 
             for (let i = 0; i < response.data.length; i++) {
                 this.state.providers.push({key: response.data[i].ProviderId, name: response.data[i].ProviderName, img: response.data[i].ProviderLogo });
             }
          }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }


    renderItem = ({ item, index }) => {
        if (item.empty) {
          return <View style={[styles.imageContainerBox, styles.imageInvisible]} />;
        }
        return (
          <TouchableOpacity style={styles.imageContainerBox} 
            onPress={() => this.props.navigation.navigate('AddSubscription', {addSub: true, username: this.state.username, providerId: item.key, providerName: item.name, providerLogo: item.img, profileImage: this.state.profileImage})}>
            <Image style={styles.image} source={{uri: 'data:image/png;base64,' + item.img}}/>
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
    mainView: {
      height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    mainBody: {
      padding: 15, paddingTop:25, backgroundColor:'transparent', flex:1
    },
    btnMargin: {
      marginLeft: 30, marginRight: 30
    },
    container: {
      flex: 1, marginTop:25
    },
    imageContainerBox: {
      backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center', width: 110, margin: 5, padding: 5, borderRadius: 10, height: 110
    },
    image: {
      width: 100, height: 100, borderRadius:10
    },
    imageInvisible: {
      backgroundColor: 'transparent', height:0, width: 0
    },
    itemText: {
      color: '#fff',
    },
});