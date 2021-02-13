import React from 'react';
import {StyleSheet, View, Text, FlatList, ToastAndroid} from 'react-native';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
import {PosterDetailed} from '../components/specific/PosterDetailed';
import {Input} from 'react-native-elements';
import axios from 'axios';
import Constants from '../common/Constants';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedTitle: '',
            movies:[],
        };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header title={'Search'} username={this.state.username} profileImage={this.state.profileImage} showReturn={true} onBack={() => this.props.navigation.goBack()}
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <View style={styles.searchContainer}>
                    <Input style={styles.input} placeholder={'Search for a title...'}
                           onChangeText={value => this.setState({searchedTitle: value}, () => this.getMovies())}/>
                    <Text style={styles.inputText}>Results of: '{this.state.searchedTitle}'</Text>
                </View>
                <FlatList data={this.state.movies} keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                          style={{padding: 15}} renderItem={item => <PosterDetailed e={item} callback={this.goToDetails.bind(this)}/>}/>
                <FooterMenu selectedScreen={0}
                    onSearchPress={() => this.props.navigation.navigate('Search', { username: this.state.username, profileImage: this.state.profileImage })}
                    onMyListPress={() => this.props.navigation.replace('MyList', { username: this.state.username, profileImage: this.state.profileImage })}
                    onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username, profileImage: this.state.profileImage })}
                    onSubscriptionsPress={() => this.props.navigation.replace('Subscriptions', { username: this.state.username, profileImage: this.state.profileImage })}
                    onProfilePress={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
            </View>
        );
    }

    componentDidMount() {
        const {username, profileImage} = this.props.route.params;
        this.setState({username: username, profileImage: profileImage});
    }

    getMovies = () => {
            let url = `${Constants.BASE_URL}Movies?movieName=${this.state.searchedTitle}`;
            axios.get(url).then(response => this.setState({movies: response.data}))
                .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    goToDetails = (movieId) => this.props.navigation.replace('Details', { username: this.state.username, movieId: movieId, profileImage: this.state.profileImage });
};

const styles = StyleSheet.create({
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    searchContainer: {
        padding: 15
    },
    input: {
        backgroundColor: 'white', height: 10, marginBottom: -15
    },
    inputText: {
        color: 'white', fontWeight: 'bold', fontSize: 18
    },
});

export default Search;
