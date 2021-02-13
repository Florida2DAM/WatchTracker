import {StyleSheet, Text, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return (
        <View style={styles.headerMainContainer}>
            <Text style={styles.screenTitle}>{this.props.title} </Text>
            {this.showReturnButton()}
            <View style={{display:'flex', flexDirection:'row', alignItems: 'center'}}>
                <Text style={styles.username}>{this.props.username} </Text>
                <View style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => this.props.onResponse(this.props.username)}>
                        <Image style={styles.image} source={{uri: `data:image/jpeg;base64, ${this.props.profileImage}`}}/>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )}

    showReturnButton = () => {
        if (this.props.showReturn) {
            return (
                <View style={styles.returnButtonContainer}>
                    <TouchableOpacity><Icon size={30} name='arrow-left' color='white' onPress={() => this.props.onBack()}/></TouchableOpacity>
                </View>
            );
        } else
            return <View/>;
    }
}

const styles = StyleSheet.create({
    headerMainContainer: {
        backgroundColor: '#24B34A', height: 60, display: 'flex', flexDirection: 'row', padding: 5, alignItems:'center', justifyContent:'space-between'
    },
    screenTitle: {
        color: 'white', fontWeight: 'bold', fontSize: 22, position:'absolute', textAlign:'center', width:'100%'
    },
    returnButtonContainer: {
        width: 50, height: 50, justifyContent: 'center', alignItems: 'center'
    },
    username: {
        fontWeight:'bold', color:'white', fontSize:13
    },
    imageContainer: {
        width: 50, height: 50, justifyContent: 'center', alignItems: 'center'
    },
    image: {
        width: 40, height: 40, borderRadius:50
    }
});
