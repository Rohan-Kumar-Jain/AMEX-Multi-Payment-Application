import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ToastAndroid,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import axios from 'axios';
import { ENDPOINT } from './constant';


const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [upi, setUpi] = useState('');

  const handlePress = async () => {
    //end point
   await axios
      .post(ENDPOINT + '/user/signup', {
        full_name: fullname,
        email: email,
        password: password,
        phone: phone,
        upi_id: upi,
      })
      .then(response=>{
        console.log(response.data);
        ToastAndroid.show(response.data, ToastAndroid.SHORT);
        props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err.data);
        ToastAndroid.show(err+ '', ToastAndroid.SHORT);
      })
      .finally(function () {
        console.log('final');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerr}>
        <Image
          style={{width: 40, height: 70}}
          source={require('../images/logo.jpeg')}
        />
        <Text style={styles.logoText}>Welcome to Team Extenders App!</Text>
      </View>
      <TextInput
        onChangeText={(value) => setFullName(value)}
        placeholder="FullName"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
      />
      <TextInput
        onChangeText={(value) => setEmail(value)}
        placeholder="Email Address"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
      />
      <TextInput
        onChangeText={(value) => setPassword(value)}
        placeholder="Password"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
        secureTextEntry={true}
      />

      <TextInput
        onChangeText={(value) => setPhone(value)}
        placeholder="PhoneNumber"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
        secureTextEntry={true}
      />
      <TextInput
        onChangeText={(value) => setUpi(value)}
        placeholder="UpiId"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
      />

      <TouchableOpacity style={styles.button} onPress={() => {handlePress()}}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.signupButton}> Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3a381c',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerr: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  errorText: {
    color: '#ffffff',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  text: {
    width: 300,
    backgroundColor: '#75715D',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
    color:"white"
  },
});
