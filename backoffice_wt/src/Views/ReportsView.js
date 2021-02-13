import {Component} from "react";
import { Chart } from 'primereact/components/chart/Chart';
import axios from "axios";
import './Views.css';
import Constants from './../Common/Constants';

class ReportsView extends Component {

    URL_REGISTERS_PER_DAY = `${Constants.BASE_URL}Users/Registers`;
    URL_MOST_LISTED_MOVIES = `${Constants.BASE_URL}Movies/MostListed`;

    constructor(props) {
        super(props);
        this.state = {
            registersData: { },
            listedMoviesData: { }
        }
    }

    render() {
        return (
            <div className={'mainContainer'}>
                <div className={'secondContainer'}>
                    <center>
                        <div>
                            <Chart className={'myChart'} type='line' data={this.state.registersData} options={this.state.registersData} />
                        </div>
                        <div>
                            <Chart className={'myChart'} type='bar' data={this.state.listedMoviesData} />
                        </div>
                    </center>
                </div>
            </div>);
    }

    componentDidMount() {
        this.getRegistrationsPerDay();
        this.getMostListedMovies();
    }

    getRegistrationsPerDay = () => {
        const PROMISE = axios.get(this.URL_REGISTERS_PER_DAY);
        PROMISE.then(response => {
            let registerDates = [];
            let registerCount = [];
            for (let i = 0; i < response.data.length; i++) {
                registerDates.push(response.data[i][0]);
                registerCount.push(parseInt(response.data[i][1]));
            }
            let data = {
                labels: registerDates,
                datasets: [
                    {
                        label: 'Registrations per day',
                        data: registerCount,
                        fill: true,
                        borderColor: '#24B24A'
                    }
                ]
            }
            this.setState({registersData: data});
        }).catch(() => console.log('Error connecting to the server.'));
    }

    getMostListedMovies = () => {
        const PROMISE = axios.get(this.URL_MOST_LISTED_MOVIES);
        PROMISE.then(response => {
            let movieNames = [];
            let namesCount = [];
            for (let i = 0; i < response.data.length; i++) {
                movieNames.push(response.data[i][0]);
                namesCount.push(parseInt(response.data[i][1]));
            }
            let data = {
                labels: movieNames,
                datasets: [
                    {
                        label: 'Most listed movies',
                        data: namesCount,
                        fill: true,
                        backgroundColor: '#24B24A'
                    }
                ]
            }
            this.setState({listedMoviesData: data});
        }).catch(() => console.log('Error connecting to the server'));
    }

}

export default ReportsView;
