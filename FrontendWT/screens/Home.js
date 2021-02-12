import React from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList, ToastAndroid} from 'react-native';
import FooterMenu from './../components/general/FooterMenu';
import Header from './../components/general/Header';
import {Poster} from '../components/specific/Poster';
import Constants from '../common/Constants';
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recentMovies: [],
            upcomingMovies: [],
            topRatedMovies: []
        };
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header title={'Home'} username={this.state.username} profileImage={this.state.profileImage} showReturn={false} 
                    onResponse={() => this.props.navigation.replace('Profile', { username: this.state.username, profileImage: this.state.profileImage })}/>
                <View style={styles.apiProvidersContainer}>
                    <Text style={styles.apiProvidersText}>Powered by TMDB and JustWatch</Text>
                </View>      
                <ScrollView style={styles.mainBody}>
                    <Text style={styles.moviesSectionText}>Recent movies</Text>
                    <FlatList data={this.state.recentMovies} keyExtractor={(item, index) => index.toString()}
                              horizontal={true}
                              pagingEnabled={false}
                              showsHorizontalScrollIndicator={false}
                              ItemSeparatorComponent={() => <View style={{width: 10}}/>}
                              renderItem={item => <Poster e={item} callback={this.goToDetails.bind(this)}/>}/>

                    <Text style={styles.moviesSectionText}>Top rated movies</Text>{/* Most viewed? */}
                    <FlatList data={this.state.upcomingMovies} keyExtractor={(item, index) => index.toString()}
                              horizontal={true}
                              pagingEnabled={false}
                              showsHorizontalScrollIndicator={false}
                              ItemSeparatorComponent={() => <View style={{width: 10}}/>}
                              renderItem={item => <Poster e={item} callback={this.goToDetails.bind(this)}/>}/>

                    <Text style={styles.moviesSectionText}>Upcoming movies</Text>
                    <FlatList data={this.state.topRatedMovies} keyExtractor={(item, index) => index.toString()}
                              horizontal={true}
                              pagingEnabled={false}
                              showsHorizontalScrollIndicator={false}
                              ItemSeparatorComponent={() => <View style={{width: 10}}/>}
                              style={{marginBottom: 40}} renderItem={item => <Poster e={item} callback={this.goToDetails.bind(this)}/>}/>
                </ScrollView>
                <FooterMenu selectedScreen={-1}
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
        this.getRecentMovies();
        this.getUpcomingMovies();
        this.getTopRatedMovies();
    }

    getRecentMovies = () => {
            let url = `${Constants.BASE_URL}Movies/Recent`;
            axios.get(url).then(response => this.setState({recentMovies: response.data}))
                .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    getUpcomingMovies = () => {
        let url = `${Constants.BASE_URL}Movies/Upcoming`;
        axios.get(url).then(response => this.setState({upcomingMovies: response.data}))
            .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    getTopRatedMovies = () => {
        let url = `${Constants.BASE_URL}Movies/TopRated`;
        axios.get(url).then(r => this.setState({topRatedMovies: r.data}))
            .catch(() => ToastAndroid.show('Server Error', ToastAndroid.SHORT));
    }

    goToDetails = (movieId) => this.props.navigation.replace('Details', { username: this.state.username, movieId: movieId, profileImage: this.state.profileImage });

};

const styles = StyleSheet.create({
    mainView: {
        height: '100%', width: '100%', backgroundColor: '#1A1A1A'
    },
    mainBody: {
        paddingTop: 15, paddingBottom:15
    },
    apiProvidersContainer: {
        height:50, justifyContent:'center', alignItems:'center'
    },
    apiProvidersText: {
        color: 'white', fontWeight: 'normal', fontSize: 20, textAlign:'center'
    },
    moviesSectionText: {
        color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom:10, marginTop:20, marginLeft: 5
    }
});

export default Home;