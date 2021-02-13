import { View, TouchableOpacity, Text} from 'react-native';
import React from 'react';

class TouchableButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View style={{width: this.props.btnWidth, height: this.props.btnHeight}}>
                <TouchableOpacity style={{backgroundColor: this.props.btnBgColor, width: '100%', height: this.props.btnHeight, 
                    borderRadius: this.props.borderRadius, alignItems:'center', justifyContent:'center'}}
                    onPress={event => this.props.onPress(event.valueOf())}>
                    <Text style={{
                        fontSize: this.props.txtSize === undefined ? 20 : this.props.txtSize, 
                        color: this.props.txtColor === undefined ? 'white' : this.props.txtColor, 
                        fontWeight: this.props.txtWeight === undefined ? 'normal' : this.props.txtWeight}}>{this.props.btnTxt}</Text>
                </TouchableOpacity>
        </View>
    )}
}

export default TouchableButton;
