import {Component, Fragment} from "react";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from "primereact/button";
import './../../node_modules/primeicons/primeicons.css';
import axios from 'axios';
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";
import './Views.css';
import ProviderModal from "../components/ProviderModal";

class ProvidersView extends Component {

    URL = 'http://localhost:44399/api/';

    constructor(props) {
        super(props);
        this.state = {
            providersList: [],
            userFilteredText: '',
            userOption: '1',
            modalVisible: false,

            providerId: null,
            providerName: null,
            providerLogo: null,
            emptyImage: true,
            addProvider: true
        };
    }

    render() {
        return (
            <div className={'mainContainer'}>
                <div className={'secondContainer'}>
                    <div className={'searchContent'}>
                        <Button label="Add Provider" className={'createBtn'} onClick={() =>
                            this.setState({providerId: null, providerName: null, providerLogo: null, modalVisible: true})}
                        />
                        <InputText type={'text'} value={this.state.userFilteredText} placeholder={'Search...'}
                                   maxLength={60} onChange={this.handleTextChange}/>
                        <RadioButton inputId='opProviderId' name='filterUser' value='1'
                                     onChange={this.handleUserOption}
                                     checked={this.state.userOption === '1' ? true : false}/>
                        <label htmlFor='opProviderId'> Provider ID </label>
                        <RadioButton inputId='opName' name='filterUser' value='2'
                                     onChange={this.handleUserOption}
                                     checked={this.state.userOption === '2' ? true : false}/>
                        <label htmlFor='opName'> Name </label>
                    </div>

                    <DataTable value={this.state.providersList} className={'myTable'}>
                        <Column sortable={true} className={'shortCell'} field='ProviderId' header='Provider ID'/>
                        <Column sortable={true} className={'longCell'} field='ProviderName' header='Name'/>
                        <Column className={'normalCell'} body={this.createImage} header='Logo'/>
                        <Column className={'shortCell'} body={this.createEditButton} field='ProviderName' header='Edit'/>
                        <Column className={'shortCell'} body={this.createDeleteButton} field='ProviderName' header='Remove'/>
                    </DataTable>
                </div>
                {this.state.modalVisible && <ProviderModal id={this.state.providerId} name={this.state.providerName} logo={this.state.providerLogo}
                    onCancel={() => this.clearModalInfo()} reload={() => this.getProviders()}/>}
            </div>
        );
    }

    componentDidMount() {
        this.getProviders();
    }

    clearModalInfo = () => this.setState({providerId: null, providerName: null, providerLogo: null, modalVisible: false});

    handleUserOption = (e) => this.setState({userOption: e.target.value}, () => this.state.userFilteredText !== '' && this.filterProviders());

    handleTextChange = (e) => this.setState({userFilteredText: e.target.value}, () => this.filterProviders());

    getProviders = () => {
        const URL = `${this.URL}Providers`;
        const PROMISE = axios.get(URL);
        PROMISE.then(response => {
            this.setState({providersList: response.data}, () => console.log(this.state.providersList))
        }).catch(() =>  console.log('Error connecting to server.'));
    }

    deleteProvider = (data) => {
        let confirmResult = this.confirm(data, `Are you sure to remove ${data.ProviderName}?`);
        if (confirmResult) {
            const URL = `${this.URL}Providers?provierId=${data.ProviderId}`;
            const PROMISE = axios.delete(URL);
            PROMISE.then(response => this.getProviders()).catch(() =>  console.log('Error connecting to server.'));
        }
    }

    filterProviders = () => {
        const URL = `${this.URL}Providers`;
        axios.get(URL).then((response) => {
            let tempArray = [];
            switch (this.state.userOption) {
                case '1':
                    response.data.forEach(u => u.ProviderId.toString().includes(this.state.userFilteredText) && tempArray.push(u));
                    break;
                case '2':
                    response.data.forEach(u => u.ProviderName.includes(this.state.userFilteredText) && tempArray.push(u));
                    break;
                default:
                    break;
            }
            this.setState({providersList: tempArray});
        });
    }


    confirm = (data, message) => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm(message);
        return result;
    }

    createImage = (data) => {
        return (
            <Fragment>
                <center>
                    <img src={`data:image/jpeg;base64,${data.ProviderLogo}`} alt={''} onClick={() => console.log(data.ProviderName)} style={{width: 75, height: 75}}/>
                </center>
            </Fragment>);
    }

    createEditButton = (data) => {
        return (
            <Fragment><center>
                <Button onClick={() => this.setState({providerId: data.ProviderId, providerName: data.ProviderName, providerLogo: data.ProviderLogo,
                    modalVisible: true})} className={'blockBtn'} icon={'pi pi-pencil'}
                        style={{backgroundColor: '#F8D140', width:'80%', height: 30}}/>
            </center></Fragment>);
    }

    createDeleteButton = (data) => {
        return (
            <Fragment><center>
                <Button onClick={() => this.deleteProvider(data)} className={'blockBtn'} icon={'pi pi-times-circle'}
                        style={{backgroundColor: '#EA392F', width:'80%', height: 30}}/>
            </center></Fragment>);
    }

}

export default ProvidersView;
