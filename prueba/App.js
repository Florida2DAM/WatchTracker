/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Input, Button } from 'react-native-elements';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {            
      date:'',
      number:''
  }
  }

  getMonth() {
    var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
    return month;

  }

  receiveDate(date, number) {


    console.log(this.getMonth());
  
    /*let month = getMonth()
    if(number === '0'){
      //si la fecha actual es un mes mayor a la que ha introducido por parametro
      if (getMonth() + 1 > month.getMonth() + 1 ){
        
        alert("True");
      }else if(getMonth() + 1 < month.getMonth() + 1){
        alert("False");
      }
    }else if(number === '1'){
      //comprobar si ha pasado un año entre la fecha actual y la pasada por parametro
      if(getFullYear() > month.getFullYear()){
        alert("True");
      }else if(getFullYear() < month.getFullYear()){
        alert("False");
      }
    }
    alert(this.state.date)*/   
  }

  render() {
    return (

          <View >
          <Input placeholder='date' 
          style={styles.input}
          onTextChange={(e) => this.setState({date: e.target.value})}
          /> 
          <Input placeholder='number' 
          style={styles.input}
          onTextChange={(event) => this.setState({number: event.number})}
          /> 
          <Button onPress={() => this.receiveDate(this.state.date, this.state.number)} title='ejecutar'>
          </Button>
    
        </View>

    );
  }
};

const styles = StyleSheet.create({
  container: {

  },
  input:{
    borderColor: 'red',
    borderWidth: 4,
    top: 10,

  },
});

export default App;
