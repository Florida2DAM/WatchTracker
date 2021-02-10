import {Component, Fragment} from "react";
import {DataTable} from 'primereact/components/datatable/DataTable';
import {Column} from 'primereact/components/column/Column';
import {Button} from "primereact/button";
import './../../node_modules/primeicons/primeicons.css';
import axios from 'axios';
import {InputText} from "primereact/inputtext";
import {RadioButton} from "primereact/radiobutton";
import './Views.css';

class UsersView extends Component {

    URL = 'http://localhost:44399/api/';

    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            userFilteredText: '',
            userOption: '1'
        };
    }

    render() {
        return (
            <div className={'mainContainer'}>
                <div className={'secondContainer'}>
                    <div className={'searchContent'}>
                        <InputText type={'text'} value={this.state.userFilteredText} placeholder={'Buscar...'}
                                   maxLength={60} onChange={this.handleTextChange}/>
                        <RadioButton inputId='opUsername' name='filterUser' value='1'
                                     onChange={this.handleUserOption}
                                     checked={this.state.userOption === '1' ? true : false}/>
                        <label htmlFor='opUsername'> Username </label>
                        <RadioButton inputId='opMail' name='filterUser' value='2'
                                     onChange={this.handleUserOption}
                                     checked={this.state.userOption === '2' ? true : false}/>
                        <label htmlFor='opMail'> Email </label>
                        <RadioButton inputId='opName' name='filterUser' value='3'
                                     onChange={this.handleUserOption}
                                     checked={this.state.userOption === '3' ? true : false}/>
                        <label htmlFor='opName'> Name </label>
                    </div>

                    <DataTable value={this.state.usersList} className={'myTable'}>
                        <Column sortable={true} className={'normalCell'} field='UserId' header='Username'/>
                        <Column sortable={true} className={'longCell'} field='Email' header='Email'/>
                        <Column sortable={true} className={'normalCell'} field='Name' header='Name'/>
                        <Column sortable={true} className={'normalCell'} field='Surname' header='Surname'/>
                        <Column sortable={true} className={'normalCell'} field='RegisterDate' header='Register Date'/>
                        <Column className={'shortCell'} body={this.createResetPasswordButton} header='Reset Password'/>
                        <Column className={'shortCell'} body={this.createActiveButton} header='Active'/>
                    </DataTable>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getUsers();
    }

    handleUserOption = (e) => this.setState({userOption: e.target.value}, () => this.state.userFilteredText !== '' && this.filterUsers());

    handleTextChange = (e) => this.setState({userFilteredText: e.target.value}, () => this.filterUsers());

    getUsers = () => {
        const URL = `${this.URL}Users/GetAllUsers`;
        const PROMISE = axios.get(URL);
        PROMISE.then(response => {
            response.data.forEach(e => e.RegisterDate = (e.RegisterDate.substring(0, 10)));
            this.setState({usersList: response.data}, () => console.log(this.state.usersList))
        }).catch(() =>  console.log('Error connecting to server.'));
    }

    filterUsers = () => {
        const URL = `${this.URL}Users/GetAllUsers`;
        axios.get(URL).then((response) => {
            response.data.forEach(e => e.RegisterDate = (e.RegisterDate.substring(0, 10)));
            let tempArray = [];
            switch (this.state.userOption) {
                case '1':
                    response.data.forEach(u => u.UserId.includes(this.state.userFilteredText) && tempArray.push(u));
                    break;
                case '2':
                    response.data.forEach(u => u.Email.includes(this.state.userFilteredText) && tempArray.push(u));
                    break;
                case '3':
                    response.data.forEach(u => u.Name.includes(this.state.userFilteredText) && tempArray.push(u));
                    break;
                default:
                    break;
            }
            this.setState({usersList: tempArray});
        });
    }

    createActiveButton = (data) => {
        const ICON = data.Active ? 'pi pi-unlock' : 'pi pi-lock';
        return (
            <Fragment>
                <center>
                    <Button onClick={() => {
                        let message = data.Active ? `Are you sure to block ${data.UserId}?` : `Are you sure to unblock ${data.UserId}?`;
                        this.confirm(data, message) && this.activeUser(data);
                    }} className={'blockBtn'} icon={ICON}
                            style={{backgroundColor: data.Active ? '#24B24A' : '#EA392F', width:'80%'}}/>
                </center>
            </Fragment>);
    }

    confirm = (data, message) => {
        // eslint-disable-next-line no-restricted-globals
        let result = confirm(message);
        return result;
    }

    activeUser = (data) => {
        const PROMISE = axios.put(`${this.URL}Users/ChangeUserActive?userId=${data.UserId}`);
        PROMISE.then(() => this.getUsers()).catch(() =>  console.log('Error connecting to server.'));
    }

    createResetPasswordButton = (data) => {
        return (
            <Fragment>
                <center>
                    <Button onClick={() => {
                        let message = `Are you sure to reset ${data.UserId}'s password?`;
                        this.confirm(data, message) && this.resetUserPassword(data);
                    }} className={'blockBtn'} icon={'pi pi-replay'}
                            style={{backgroundColor: '#24B24A', width:'80%'}}/>
                </center>
            </Fragment>);
    }

    resetUserPassword = (data) => {
        const PROMISE = axios.put(`${this.URL}Users/GeneratePassword?userId=${data.UserId}`);
        PROMISE.then((r) => r && alert('Password has been reset successfully')).catch(() =>  console.log('Error connecting to server.'));
    }

}

export default UsersView;
