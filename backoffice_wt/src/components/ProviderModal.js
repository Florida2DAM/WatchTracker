import {Component} from "react";
import {Button} from "primereact/button";
import axios from 'axios';
import {InputText} from "primereact/inputtext";
import './../Views/Views.css';
import './ProviderModal.css';

class ProviderModal extends Component {

    URL = 'http://localhost:44399/api/';

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            name: '',
            logo: null,
        };
    }

    render() {
        return (
            <div className={'modal'}>
                <p className={'modalTitle'}>{this.props.providerId !== null ? 'Add' : 'Edit'} Provider</p>

                <InputText type={'text'} placeholder={'Provider name...'} value={this.state.name}
                           onChange={e => this.setState({name: e.target.value})}
                           maxLength={20} className={'modalInput'}/>

                <input type='file' id='group_image' accept={'.jpg'} style={{marginTop: 25}} onChange={this.imageSelectedHandler}/>
                <img alt={''} src={`data:image/jpeg;base64,${this.state.logo}`} className={'modalImg'}/>


                <div className={'modalButtonsContainer'}>
                    <Button label="Cancel" className={'modalCancel'} onClick={() => this.props.onCancel()}/>
                    {this.props.id === null ?
                        <Button label="Add" className={'modalSubmit'} onClick={() => this.addProvider()}/> :
                        <Button label="Edit" className={'modalSubmit'} onClick={() => this.editProvider()}/>}
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.setState({
            id: this.props.id,
            name: this.props.name === null ? '' : this.props.name,
            logo: this.props.logo
        });
    }

    imageSelectedHandler = e => {
        let fr = new FileReader();
        let result;
        fr.readAsDataURL(e.target.files[0]);
        fr.addEventListener("load", (e) => {
            result = e.target.result;
            result = result.substring(23);
            console.log(result);
            this.setState({logo: result});
        });
    }

    addProvider = () => {
        if (this.state.name !== null && this.state.name.length > 0) {
            const URL = `${this.URL}Providers`;
            let provider = {
                ProviderName: this.state.name,
                ProviderLogo: this.state.emptyImage ? null : this.state.logo
            }
            axios.post(URL, provider).then(() => {
                alert("Provider added.");
                this.props.onCancel();
                this.props.reload();
            }).catch(r => alert(r.message));
        } else {
            alert('You have to add a value in the provider name input.')
        }
    }

    editProvider = () => {
        if (this.state.name !== null && this.state.name.length > 0) {
            const URL = `${this.URL}Providers?providerId=${this.state.id}`;
            let provider = {
                ProviderId: this.state.id,
                ProviderName: this.state.name,
                ProviderLogo: this.state.logo
            }
            axios.put(URL, provider).then(() => {
                alert("Provider edited.");
                this.props.onCancel();
                this.props.reload();
            }).catch(r => alert(r.message));
        } else {
            alert('You have to add a value in the provider name input.')
        }
    }

}

export default ProviderModal;
