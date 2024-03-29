import React from 'react';
import {StyleSheet, ScrollView, View, Text, Image, TouchableOpacity, FlatList, ToastAndroid, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import NumberPickerDialog from 'react-native-numberpicker-dialog';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
import axios from 'axios';
import Constants from '../common/Constants';

const STATUS_ITEMS = [
    {label: 'Undefined Status', value: 'Undefined Status', icon: () => <Icon name="times" size={18} color="#EA392F" />},
    {label: 'Plan to Watch', value: 'Plan to Watch', icon: () => <Icon name="pencil" size={18} color="black" />, hidden: false},
    {label: 'Watching', value: 'Watching', icon: () => <Icon name="eye" size={18} color="black" />},
    {label: 'Watched', value: 'Watched', icon: () => <Icon name="check" size={18} color="green" />},
];

class Details extends React.Component {

    SCORE_VALUES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header title={'Details'} username={this.state.username} profileImage={this.state.profileImage} showReturn={true} onBack={() => this.props.navigation.goBack()}
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <ScrollView>
                    <Image source={require('./../assets/img/WTDiagonal.png')} style={styles.imageDiagonal}/>
                    <View style={styles.mainBody}>
                        <View style={styles.mainResultsContainer}>
                            <Image source={{ uri: this.state.Poster }} style={styles.imageLogo}/>
                            <View style={styles.mainResultsContainerRight}>
                                <View style={styles.averageScore}>
                                    <Text style={styles.titleOptions}>Score</Text>
                                    <Text style={styles.resultScore}>{this.state.VoteAverage} </Text>
                                </View>
                                <View style={styles.releaseDate}>
                                    <Text style={styles.titleOptions}>Release date</Text>
                                    <Text style={styles.txtSection}>{this.state.ReleaseDate} </Text>
                                </View>
                                <View style={styles.streamPlatforms}>
                                    <Text style={styles.titleOptions}>Stream platforms</Text>
                                </View>
                                <View style={styles.streamPlatformsLogos}>
                                    <View style={styles.streamPlatformsLogoContainer}>
                                        <FlatList data={this.state.Providers} keyExtractor={(item, index) => index.toString()} horizontal={true} 
                                        ItemSeparatorComponent={() => <View style={{width: 3}}/>} renderItem={(item) => this.renderProviders(item)}/>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputsContainer}>
                            <View style={styles.statusContainer}>
                                <Text style={styles.txtSection}>Watch Status </Text>
                                <DropDownPicker
                                    items={STATUS_ITEMS}
                                    containerStyle={styles.statusDropMenu}
                                    defaultValue={this.state.UserStatus}
                                    placeholder={'Status...'}
                                    placeholderStyle={{color:'black'}}
                                    selectedLabelStyle={{color:'black', fontWeight:'normal', fontSize:18}}
                                    itemStyle={{ justifyContent: 'flex-start' }}
                                    onChangeItem={item => this.setState({UserStatus: item.value})}/>
                            </View>
                            <View style={styles.secondInputsContainer}>
                                <View style={styles.dateContainer}>
                                    <Text style={styles.txtSection}>Watch Date </Text>
                                    <TouchableOpacity onPress={() => this.setState({visible: true})} style={styles.dateButton}>
                                        <Text style={styles.secondInputsResultText}>{this.state.UserDate}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.dateContainer}>
                                    <Text style={styles.txtSection}>Your score </Text>
                                    <TouchableOpacity style={styles.scoreButton} onPress={() => this.selectScore()}>
                                        <Text style={styles.secondInputsResultText}>{this.state.UserVote !== -1 ? this.state.UserVote : '---'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.resultsContainer}>
                            <Text style={styles.title}>{this.state.Title}</Text>
                            <Text style={styles.txtSection}>Synopsis: </Text>
                            <Text style={styles.synopsis}>{this.state.Overview}</Text>
                            <View style={styles.extraResultsContainer}>
                                <View>
                                    <Text style={styles.txtSection}>Popularity </Text>
                                    <Text style={styles.txtResults}>{this.state.Popularity}</Text>
                                </View>
                                <View>
                                    <Text style={styles.txtSection}>Vote Count </Text>
                                    <Text style={styles.txtResults}>{this.state.VoteCount}</Text>
                                </View>
                                <View>
                                    <Text style={styles.txtSection}>Runtime </Text>
                                    <Text style={styles.txtResults}>{this.state.Runtime} min</Text>
                                </View>
                            </View>
                        </View>
                        {this.listManageButtons(this.canEditAndRemove())}
                    </View>
                </ScrollView>
                <FooterMenu selectedScreen={-1}
                    onSearchPress={() => this.props.navigation.navigate('Search', { username: this.state.username, profileImage: this.state.profileImage })}
                    onMyListPress={() => this.props.navigation.replace('MyList', { username: this.state.username, profileImage: this.state.profileImage })}
                    onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username, profileImage: this.state.profileImage })}
                    onSubscriptionsPress={() => this.props.navigation.replace('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}
                    onProfilePress={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <DateTimePickerModal testID="dateTimePicker" value={new Date()} mode={'date'} display='spinner' maximumDate={new Date()}
                    onConfirm={(date) => this.selectDate(date)}
                    onCancel={() => this.setState({visible: false})} isVisible={this.state.visible}/>
            </View>
        );
    }

    componentDidMount() {
        const {username, profileImage, movieId} = this.props.route.params;
        this.setState({username: username, profileImage: profileImage, MovieId: movieId}, () => this.getMovieDetails());
    }

    selectScore = () => {
        NumberPickerDialog.show({
            values: this.SCORE_VALUES,
            positiveButtonLabel: 'Ok',
            negativeButtonLabel: 'Cancel',
            title: 'Select your score:',
        }).then((id) => this.setState({UserVote: id}));
    }

    selectDate = (date) => {
        let month = (parseInt(date.getMonth()) + 1).toString();
        month = month.length === 1 ? "0" + month : month;
        let day = parseInt(date.getDate()).toString();
        day = day.length === 1 ? "0" + day : day;
        let selectedDate = date.getFullYear() + "-" + month + "-" + day;
        this.setState({UserDate: selectedDate, visible: false});
    }

    canEditAndRemove = () => {
        if (this.state.UserStatus !== 'Undefined Status' && this.state.UserDate !== '----/--/--' && this.state.UserVote !== -1)
            return true;
        else
            return false;
    }

    listManageButtons = (canEditAndRemove) => {
        let user = this.state.UserId;
        return (
            <View style={{marginTop:30, alignItems:'center'}}>
                <TouchableOpacity style={{width:'70%', height:50, backgroundColor: canEditAndRemove ? '#60AFDD' : '#9A9D9B',
                    borderRadius:10, justifyContent:'center', alignItems:'center'}} disabled={!canEditAndRemove}
                                  onPress={() => this.state.UserId === null ? this.addMovie() : this.editMovie()}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>  SAVE TO LIST  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{width:'70%', height:50, backgroundColor: user === null ? '#9A9D9B' : '#EA392F', borderRadius:10,
                    justifyContent:'center', alignItems:'center', marginTop:10}} disabled={user === null ? true : false}
                                  onPress={() => this.confirmDelete()}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>REMOVE FROM LIST </Text>
                </TouchableOpacity>
            </View>
        );
    }

    renderProviders = ({item}) => <Image source={{ uri: item.toString() }} style={{width: 30, height: 30, resizeMode: 'stretch'}}/>

    getMovieDetails = () => {
        let url = `${Constants.BASE_URL}Movies?movieId=${this.state.MovieId}&userId=${this.state.username}`;
        axios.get(url).then(response => {
            let d = response.data;
            d.Providers = d.Providers.slice(0, 5);//Just allow 5 provider logos.
            d.UserDate = d.UserDate.substring(0, 10);//Get date formated to yyyy-mm-dd
            if (d.UserDate === '0001-01-01')
                d.UserDate = '----/--/--'
            if (d.UserStatus === null) //Check if null to assign undefined status
                d.UserStatus = 'Undefined Status';
       
            this.setState({MovieId: d.MovieId, Overview: d.Overview, Popularity: d.Popularity, Poster: d.Poster, ReleaseDate: d.ReleaseDate,
                Providers: d.Providers, Runtime: d.Runtime, Title: d.Title, UserDate: d.UserDate, UserId: d.UserId, 
                UserStatus: d.UserStatus,  UserVote: d.UserVote,  VoteAverage: d.VoteAverage,  VoteCount: d.VoteCount});
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    addMovie = () => {
        let url = `${Constants.BASE_URL}Movies`;
        let data = {
            movieId: this.state.MovieId,
            userStatus: this.state.UserStatus,
            userDate: this.state.UserDate,
            userVote: this.state.UserVote,
            userId: this.state.username,
        }
        axios.post(url, data).then(() => {
            ToastAndroid.show('Movie added to the list', ToastAndroid.SHORT);
            this.getMovieDetails();
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    editMovie = () => {//field named 'userSatus' in DB for some bug.
        let url = `${Constants.BASE_URL}Movies?movieId=${this.state.MovieId}&userId=${this.state.username}&userSatus=${this.state.UserStatus}&userDate=${this.state.UserDate}&userVote=${this.state.UserVote}`;
        axios.put(url).then(() => {
            ToastAndroid.show('Movie edited', ToastAndroid.SHORT);
            this.getMovieDetails();
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    confirmDelete = () => {
        Alert.alert('Remove movie', `Do you want to remove '${this.state.Title}' from your list?`,
        [
          { text: 'Cancel', style: 'cancel', onPress: () => {} },
          { text: 'OK', onPress: () => this.deleteMovie() }
        ],
        {cancelable: true},
      );
    }

    deleteMovie = () => {
        axios.delete(`${Constants.BASE_URL}Movies?movieId=${this.state.MovieId}&userId=${this.state.username}`).then(() => {
            ToastAndroid.show('Movie deleted from list', ToastAndroid.SHORT);
            this.getMovieDetails();
        }).catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

};

const styles = StyleSheet.create({
    statusContainer: {
        justifyContent:'center', alignItems:'center', width:'100%', display:'flex', alignSelf:'center'
    },
    statusDropMenu: {
        height: 40, width:'100%'
    },
    secondInputsContainer: {
        display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:10
    },
    secondInputsResultText: {
        fontSize:18, textAlign:'center'
    },
    dateContainer: {
        justifyContent:'center', alignItems:'center', width:'49%', display:'flex'
    },
    dateButton: {
        width:'100%', height:40, backgroundColor:'#FAFAFA', justifyContent:'center', borderRadius:5
    },
    scoreButton: {
        width:'100%', height:40, backgroundColor: '#FAFAFA', borderRadius:5, justifyContent:'center', alignItems:'center', alignSelf:'center'
    },
    titleOptions: {
        color: 'white',
    },
    txtSection: {
        color: 'white', fontWeight: 'bold', fontSize: 18
    },
    resultScore: {
        color: 'white', fontWeight: 'bold', fontSize: 30
    },
    title: {
        color: 'white', fontWeight: 'bold', fontSize: 30, textAlign: 'center'
    },
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#212121'
    },
    imageDiagonal: {
        width: '100%', height: 100, resizeMode: 'stretch', position: 'absolute'
    },
    mainBody: {
        height: '100%', width: '100%', backgroundColor: 'transparent', padding: 15, display: 'flex', flexDirection: 'column'
    },
    mainResultsContainer: {
        display: 'flex', flexDirection: 'row', backgroundColor:'transparent'
    },
    mainResultsContainerRight: {
        backgroundColor: 'transparent', height: 250, flexGrow: 100, alignItems: 'flex-end'
    },
    imageLogo: {
        width: 180, height: 250, resizeMode: 'stretch'
    },
    averageScore: {
        marginTop: 15, display: 'flex', alignItems: 'flex-end'
    },
    releaseDate: {
        marginTop: 25, display: 'flex', alignItems: 'flex-end'
    },
    streamPlatforms: {
        marginTop: 35, display: 'flex', alignItems: 'flex-end', flexDirection: 'column'
    },
    streamPlatformsLogos: {
        backgroundColor: 'transparent', width: '100%', padding: 5, paddingRight: 0
    },
    streamPlatformsLogoContainer: {
        backgroundColor: '#6E6E6E', flexGrow: 100, borderRadius: 5, padding:5, display:'flex', flexDirection:'row', justifyContent:'space-around', height:45, alignItems:'center'
    },
    inputsContainer: {
        marginRight:10, marginLeft:10
    },
    resultsContainer: {
        width: '100%', padding: 15
    },
    extraResultsContainer: {
        display:'flex', flexDirection:'row', justifyContent:'space-between', marginTop:25
    },
    synopsis: {
        color: 'white', textAlign: 'justify'
    },
    txtResults: {
        color: 'white', textAlign: 'center'
    }
});

export default Details;
