import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,
  AsyncStorage,
} from 'react-native';
import {Component} from 'react';

var RNFS = require('react-native-fs');

export default class Home extends Component {
  
    state = {upi: ''};
  

  componentDidMount() {
    AsyncStorage.getItem('upiId').then((id) => {
      console.log(id);

      this.setState({upi: id});
    });
  }

  render() {
    return (
      <View style={{margin: 30, flex: 1, justifyContent: 'center'}}>
        {/* {this.upi()} */}
        <View
          style={{
            position: 'absolute',
            flex: 1,
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View style={{alignItems:"center"}}>
            <Text style={{color:"black"}}><Text style={{fontWeight:"bold"}}>UPI:</Text> {this.state.upi}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ManualBill',{set: this.props.route.params.set});
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>ManualBill</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Document');
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>UploadBill</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    width: 250,
    margin: 20,
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: '#FF6075',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 1,
  },
  appButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
