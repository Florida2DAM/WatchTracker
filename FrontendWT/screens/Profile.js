import React from 'react';
import {StyleSheet, View, Text, Image, Alert, ToastAndroid, Modal} from 'react-native';
import { Input } from 'react-native-elements';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import TouchableButton from './../components/general/TouchableButton';
import ProfileTable from './../components/specific/ProfileTable';
import Constants from '../common/Constants';
import axios from 'axios';
import md5 from 'md5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            name: 'Name',
            tempName: '',
            surname: 'Surname',
            tempSurname: '',
            email: 'example@gmail.com',
            profileImage: null,
            tempImage: null,
            birthday: '',
            watchingNumber: 0,
            finishedNumber: 0,
            pendingNumber: 2,

            oldPassword: '',
            newPassword: '',

            passwordModalVisible: false,
            dataModalVisible: false
        };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header title={'Profile'} username={this.state.username} profileImage={this.state.profileImage} showReturn={true} onBack={() => this.props.navigation.goBack()}
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <ScrollView>
                    {/*<Text style={styles.text}>{this.state.username}'s profile:</Text>*/}
                    <View style={{backgroundColor:'#212121', margin:10, borderRadius:10}}>
                        <View style={{display:'flex', flexDirection:'row', padding:15}}>
                            <TouchableOpacity style={{display:'flex', flexDirection:'column'}} onPress={() => this.pickImage()}>
                                {this.state.tempImage === null && <Image source={{uri: `data:image/jpeg;base64, ${this.state.profileImage}`}} style={{height:100, width:100, borderRadius:50}}/>}
                                {this.state.tempImage !== null && <Image source={{uri: `data:image/jpeg;base64, ${this.state.tempImage}`}} style={{height:100, width:100, borderRadius:50}}/>}
                                <View style={{backgroundColor:'#24B24A', height:30, width:100, borderRadius: 5, marginTop:-15, justifyContent:'center', alignItems:'center'}}>
                                <TouchableButton borderRadius={5} btnTxt={'Change'}/>
                                </View>
                            </TouchableOpacity>
                            <View style={{backgroundColor:'transparent', height:115, marginLeft:20}}>
                                <Text style={styles.text}>{this.state.name} {this.state.surname}</Text>
                                <Text style={styles.text}>{this.state.email}</Text>{/* Revisar width numberOfLines={1} ellipsizeMode={'tail'} */}
                            </View>
                        </View>
                        <ProfileTable watching={this.state.watchingNumber} finished={this.state.finishedNumber} pending={this.state.pendingNumber}/>
                    </View>
                    <View style={{backgroundColor:'#212121', margin:10, borderRadius:10, padding:15}}>
                        <TouchableButton btnWidth={'100%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={10} btnTxt={'Change Password'} onPress={() => this.openPasswordModal()}/>
                        <View style={{height:20}}/>
                        <TouchableButton btnWidth={'100%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={10} btnTxt={'Edit Profile'} onPress={() => this.openDataModal()}/>
                    </View>
                    <View style={{backgroundColor:'#212121', margin:10, borderRadius:10, padding:15}}>
                        <TouchableButton btnWidth={'100%'} btnHeight={50} btnBgColor={'#EA392F'} borderRadius={10} btnTxt={'Logout'} onPress={() => this.logout()}/>
                    </View>
                    <View style={{backgroundColor:'#212121', margin:10, borderRadius:10, padding:15}}>
                        <TouchableButton btnWidth={'100%'} btnHeight={50} btnBgColor={'#EA392F'} borderRadius={10} btnTxt={'Delete my Account'} onPress={() => this.deleteAccount()}/>
                    </View>
                </ScrollView>
                <FooterMenu selectedScreen={3}
                    onSearchPress={() => this.props.navigation.navigate('Search', { username: this.state.username, profileImage: this.state.profileImage })}
                    onMyListPress={() => this.props.navigation.replace('MyList', { username: this.state.username, profileImage: this.state.profileImage })}
                    onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username, profileImage: this.state.profileImage })}
                    onSubscriptionsPress={() => this.props.navigation.replace('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}
                    onProfilePress={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>

                    {/* MODALS */}
                    <Modal visible={this.state.passwordModalVisible}>
                        <ScrollView style={styles.mainModalView}>
                            <Text style={styles.modalText}>Old password</Text>
                            <Input style={{color: 'white'}} secureTextEntry={true} maxLength={20} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:15}} placeholder={'password'} placeholderTextColor={'white'} 
                                onChangeText={oldPassword => this.setState({oldPassword})}/>

                            <Text style={styles.modalText}>New password</Text>
                            <Input style={{color: 'white'}} secureTextEntry={true} maxLength={20} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:15}} placeholder={'password'} placeholderTextColor={'white'} 
                                onChangeText={newPassword => this.setState({newPassword})}/>

                            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableButton btnWidth={'48%'} btnHeight={50} btnBgColor={'#EA392F'} borderRadius={10} btnTxt={'Cancel'} onPress={() => this.setState({passwordModalVisible: false})}/>
                                <TouchableButton btnWidth={'48%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={10} btnTxt={'Change password'} onPress={() => this.editPassword()}/>
                            </View>
                        </ScrollView>
                    </Modal>

                    <Modal visible={this.state.dataModalVisible}>
                        <ScrollView style={styles.mainModalView}>
                            <Text style={styles.modalText}>Name</Text>
                            <Input value={this.state.tempName} style={{color: 'white'}} maxLength={20} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:15}} placeholder={'Name'} placeholderTextColor={'white'} 
                                onChangeText={tempName => this.setState({tempName})}/>

                            <Text style={styles.modalText}>Surname</Text>
                            <Input value={this.state.tempSurname} style={{color: 'white'}} maxLength={20} disabledInputStyle={{opacity:1}}
                                inputContainerStyle={{borderWidth:2,borderBottomWidth:2,borderRadius:15}} placeholder={'Surname'} placeholderTextColor={'white'} 
                                onChangeText={tempSurname => this.setState({tempSurname})}/>

                            <View style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableButton btnWidth={'48%'} btnHeight={50} btnBgColor={'#EA392F'} borderRadius={10} btnTxt={'Cancel'} onPress={() => this.setState({dataModalVisible: false})}/>
                                <TouchableButton btnWidth={'48%'} btnHeight={50} btnBgColor={'#24B24A'} borderRadius={10} btnTxt={'Save'} onPress={() => this.editProfile()}/>
                            </View>
                        </ScrollView>
                    </Modal>
            </View>
        );
    }

    componentDidMount() {
        const {username, profileImage} = this.props.route.params;
        this.setState({username: username, profileImage: profileImage}, () => this.getUserData());
        this.getUserStatusCount(username);
    }

    pickImage = () => {
        this.setState({tempImage: null});
        launchImageLibrary('Pick', callbackResponse => {//Gestión de errores, cancelar, etc.
            if (!callbackResponse.didCancel) {
                ImgToBase64.getBase64String(callbackResponse.uri).then(r => 
                    this.setState({tempImage: r}));
                Alert.alert('Change profile image', `Do you want to change your profile image?`,
                [
                { text: 'Cancel', style: 'cancel', onPress: () => this.setState({tempImage: null}) },
                { text: 'OK', onPress: () => this.transformToB64DB(callbackResponse.uri)}//Mandar a base de datos...
                ],
                {cancelable: false});
            }
        })
    }

    transformToB64 = (uri) => {
        ImgToBase64.getBase64String(uri)
            .then(r => this.setState({profileImage: r}));
    }

    transformToB64DB = (uri) => {
        ImgToBase64.getBase64String(uri)
            .then(r => this.setState({profileImage: r}, () => this.changeImageDB(r)));
    }

    getUserData = () => {
        const url = `${Constants.BASE_URL}Users/UserData?userId=${this.state.username}`;//user.UserId, user.Email, user.Name, user.Surname, user.Birthday, user.Image); BIRTHDAY not formated
        axios.get(url).then(r => {
            this.setState({name: r.data.Name, surname: r.data.Surname, email: r.data.Email, birthday: r.data.Birthday, 
                profileImage: r.data.Image});
        }).catch(() => {
                ToastAndroid.show('Server Error', ToastAndroid.SHORT);//this.transformToB64(Constants.NO_IMAGE_URL)
            });
    }

    getUserStatusCount = (username) => {
        const url = `${Constants.BASE_URL}Users/UserStatusCount?userId=${username}`;
        axios.get(url).then(r => this.setState({watchingNumber: r.data[0], finishedNumber: r.data[1], pendingNumber: r.data[2]}))
            .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    changeImageDB = (imageB64) => {
        const url = `${Constants.BASE_URL}Users?userId=${this.state.username}`;
        let data = { Image: imageB64 } //UserId, Password, Email, Name, Surname, Birthday passed as null
        axios.put(url, data).then(response => {
            if (response.data)
                ToastAndroid.show('Image changed successfully!', ToastAndroid.SHORT);
            else
                ToastAndroid.show('Error changing the image. Try again.', ToastAndroid.SHORT);
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    openPasswordModal = () => {
        this.setState({passwordModalVisible: true, oldPassword: '', newPassword: ''});
    }

    editPassword = () => {
        if (this.state.oldPassword.length > 4 && this.state.newPassword.length > 4) {
            const url = `${Constants.BASE_URL}Users?userId=${this.state.username}&oldPassword=${md5(this.state.oldPassword)}&newPassword=${md5(this.state.newPassword)}`;
            axios.put(url).then(response => {
                if (response.data) {
                    this.setKeys(this.state.username, this.state.newPassword);
                    ToastAndroid.show('Password changed successfully!', ToastAndroid.SHORT);
                    this.setState({passwordModalVisible: false});
                } else {
                    ToastAndroid.show('Password is incorrect. Try again.', ToastAndroid.SHORT);
                }
            }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
        } else {
            ToastAndroid.show('The passwords has to have at least 5 characters.', ToastAndroid.SHORT);
        }
    }

    setKeys = async (username, password) => {
        let userKeys = {
            username: username,
            password: password
        }
        await AsyncStorage.setItem(Constants.LOGIN_KEY, JSON.stringify(userKeys));
    }

    openDataModal = () => {
        this.setState({dataModalVisible: true, tempName: this.state.name, tempSurname: this.state.surname});
    }

    editProfile = () => {
        if (this.state.tempName.length > 0 && this.state.tempSurname.length > 0) {
            const url = `${Constants.BASE_URL}Users/ChangeData?userId=${this.state.username}`;
            let data = {//UserId: null, Password: null, Email: null, Image: null, Birthday: this.state.birthday
                    Name: this.state.tempName,
                    Surname: this.state.tempSurname,
            };
            axios.put(url, data).then(response => {
                if (response.data) {
                    this.setState({name: data.Name, surname: data.Surname, dataModalVisible: false})
                    ToastAndroid.show('Data changed successfully!', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Error. Try again.', ToastAndroid.SHORT);
                }
            }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
        } else {
            ToastAndroid.show('Inputs can\'t be empty.', ToastAndroid.SHORT);
        }
    }

    logout = () => {
        Alert.alert('Logout', `Do you want to logout?`,
        [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        { text: 'OK', onPress: () => {
            this.removeKeys();
        }}
        ],
        {cancelable: false});
    }

    removeKeys = async () => {
        await AsyncStorage.removeItem(Constants.LOGIN_KEY, () => this.props.navigation.replace('Login'));
    }

    deleteAccount = () => {
        Alert.alert('Delete Account', `Do you want to delete your acount forever?`,
        [
        { text: 'Cancel', style: 'cancel', onPress: () =>  {} },
        { text: 'OK', onPress: () => {
            const url = `${Constants.BASE_URL}Users?userId=${this.state.username}`;
            axios.delete(url).then(response => {
                if (response.data) {
                    this.props.navigation.replace('Login');
                    ToastAndroid.show('Account deleted.', ToastAndroid.SHORT);
                } else {
                    ToastAndroid.show('Error. Try again.', ToastAndroid.SHORT);
                }
            }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
        }}//Mandar a base de datos...
        ],
        {cancelable: false});
    }

};

const styles = StyleSheet.create({
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    mainBody: {
        paddingTop:25, flex:1
    },
    text: {
        color: 'white', fontWeight: 'bold', fontSize: 18
    },

    mainModalView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A', padding:15
    },
    modalText: {
        color: 'white', fontWeight: 'bold', fontSize: 18, marginLeft: 10, marginBottom: 15
    }
});

export default Profile;
