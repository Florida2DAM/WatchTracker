import {StyleSheet, View} from 'react-native';
import {Input} from 'react-native-elements';
import React from 'react';

class MainScreensInput extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View>
            <Input 
            value={this.props.value}
                style={{color: 'white'}} 
                maxLength={this.props.maxLength} 
                inputContainerStyle={styles.inputContainer} 
                placeholder={this.props.placeholder} 
                placeholderTextColor={'white'} 
                secureTextEntry={this.props.secure} 
                onChangeText={e => this.props.onChangeText(e.valueOf())}
                disabled={this.props.disabled}
                disabledInputStyle={{opacity:1}}
            />
        </View>
    )}
}

const styles = StyleSheet.create({
    inputContainer: {
        borderWidth:2,
        borderBottomWidth:2,
        borderRadius:15,
        borderColor:'#24B24A'
    },

});

export default MainScreensInput ;
