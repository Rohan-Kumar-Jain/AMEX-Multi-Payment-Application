import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  AsyncStorage,ToastAndroid
} from 'react-native';
import axios from 'axios';
import { ENDPOINT } from './constant';

const Views = (props) => {
  return (
    <View>
      <View>
        <View
          style={{
            position: 'absolute',
            top: 10,
            flex: 1,
            height: 60,
            // backgroundColor:'',
            width: 360,
            flexDirection: 'row',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Document');
            }}
            style={styles.appButtonContainerHome}>
            <Image
              style={{
                width: 30,
                height: 30,
                alignSelf: 'center',
              }}
              source={require('../images/home.jpeg')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 100,
          flex: 1,
          height: 60,

          width: 360,
          flexDirection: 'column',
          alignSelf: 'center',
        }}>
        <Image
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            borderRadius: 20,
          }}
          source={require('../images/right.png')}
        />
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 28,
            fontWeight: 'bold',
            fontFamily: 'differentFont',
            marginVertical: 20,
            marginHorizontal: 5,
          }}>
          Paid
        </Text>
      </View>

      <View
        style={{
          position: 'absolute',
          top: 250,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          justifyContent: 'space-between',
          alignContent: 'space-around',
          alignContent: 'space-between',
          alignSelf: 'center',
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Passbook');
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Passbook</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.getItem('userId').then((id) => {
                axios
                  .post(ENDPOINT + '/user/send_mail', {
                    id: parseInt(id),
                    checkout: props.route.params.data,
                  })
                  .then(function () {
                    ToastAndroid.show('Successfully Send!', ToastAndroid.SHORT);
                  })
                  .catch(function () {
                    ToastAndroid.show('Network Issue!', ToastAndroid.SHORT);
                  });
              });
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Send Invoice</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate("");
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Save To Drive</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    width: 300,
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: '#FF6F61',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
  },
  appButtonContainerHome: {
    width: 60,
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 10,
    borderColor: 'black',
  },
  appButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Views;
