import React, {useState, useEffect} from 'react';
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
import {ENDPOINT} from './constant';

const Login = (props) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('loggedin').then((isLoggedIn) => {
      console.log(isLoggedIn + 'aa');
      if (isLoggedIn == 'true') {
        props.navigation.navigate('Document');
      } else {
      }
    });
  });

  function validateEmail() {
    //For email validation.
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === true) {
    } else {
      ToastAndroid.show('!!Enter correct email!!', ToastAndroid.SHORT);
    }
  }

  const handlePress = async () => {
    validateEmail(email);
    await axios
      .post(ENDPOINT + '/user/login', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        ToastAndroid.show('User Login Successfully!', ToastAndroid.SHORT);
        AsyncStorage.setItem('loggedin', String(true));
        props.navigation.navigate('Document');

        AsyncStorage.setItem('userId', String(response.data.id));
        AsyncStorage.setItem('upiId', String(response.data.upi_id));
      })
      .catch((err) => {
        ToastAndroid.show(err + '', ToastAndroid.SHORT);
      })
      .finally(function () {
        console.log('final');
      });
    
  };

  const handlePressRegister = async () => {
    props.navigation.navigate('SignUp');
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
        placeholder="Email Address"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
        onChangeText={(text) => {
          setEmail(text);
        }}
      />
      <TextInput
        placeholder="Password"
        placeholderTextColor="#c4c3cb"
        style={styles.text}
        onChangeText={(text) => {
          setPassword(text);
        }}
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handlePress();
        }}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.signupTextCont}>
        <Text style={styles.signupText}>Don't have an account, yet?</Text>
        <TouchableOpacity
          onPress={() => {
            handlePressRegister();
          }}>
          <Text style={styles.signupButton}> Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
  text: {
    width: 300,
    backgroundColor: '#75715D',
    color: 'white',
    borderRadius: 25,
    marginVertical: 5,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
});
