/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {FooterMenu} from './../components/general/FooterMenu';
import {Header} from './../components/general/Header';
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
                <Header title={'Home'} name={this.state.username} avatar={require('./../assets/img/DefaultAvatar.png')} showReturn={false}/>
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
                onSubscriptionsPress={() => this.props.navigation.navigate('Subscriptions', { username: this.state.username })}
                onHomePress={() => this.props.navigation.navigate('Home', { username: this.state.username })}/>
            </View>
        );
    }

    componentDidMount() {
        const {username} = this.props.route.params;
        this.setState({username, username});
        this.getRecentMovies();
        this.getUpcomingMovies();
        this.getTopRatedMovies();
    }

    getRecentMovies = () => {
            let url = `${Constants.BASE_URL}Movies/Recent`;
            axios.get(url).then(response => this.setState({recentMovies: response.data}, () => console.log(this.state.recentMoviesData)))
                .catch(error => console.log(error.response.request._response));
    }

    getUpcomingMovies = () => {
        let url = `${Constants.BASE_URL}Movies/Upcoming`;
        axios.get(url).then(response => this.setState({upcomingMovies: response.data}, () => console.log(this.state.recentMoviesData)))
            .catch(error => console.log(error.response.request._response));
    }

    getTopRatedMovies = () => {
        let url = `${Constants.BASE_URL}Movies/TopRated`;
        axios.get(url).then(r => this.setState({topRatedMovies: r.data}, () => console.log(this.state.recentMoviesData)))
            .catch(error => console.log(error.response.request._response));
    }

    goToDetails = (movieId) => this.props.navigation.navigate('Subscriptions', { username: movieId + this.state.username });

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
        color: 'white', fontWeight: 'bold', fontSize: 20, textAlign:'center'
    },
    moviesSectionText: {
        color: 'white', fontWeight: 'bold', fontSize: 18, marginBottom:10, marginTop:20, marginLeft: 5
    }
});

export default Home;
