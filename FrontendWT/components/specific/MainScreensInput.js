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
                style={styles.input} 
                maxLength={this.props.maxLength} 
                inputContainerStyle={styles.inputContainer} 
                placeholder={this.props.placeholder} 
                placeholderTextColor={'white'} 
                secureTextEntry={this.props.secure} 
                onChangeText={e => this.props.onChangeText(e.valueOf())}
                disabled={this.props.disabled}
                disabledInputStyle={{opacity:1}}
                value={this.props.value}
            />
        </View>
    )}
}

const styles = StyleSheet.create({
    input: {
        color:'white'
    },
    inputContainer: {
        borderWidth:2,
        borderBottomWidth:2,
        borderRadius:80,
        borderColor:'green'
    },

});

export default MainScreensInput ;
