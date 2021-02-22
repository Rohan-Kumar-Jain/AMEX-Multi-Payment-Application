import Icon from "react-native-vector-icons/Ionicons"
import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text,View } from "react-native"
import ReactNativePinView from "react-native-pin-view"

import {
 
  ToastAndroid,TextInput,AsyncStorage,TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { ENDPOINT } from './constant';


const Pin = (props) => {
  const pinView = useRef(null)
  const [showRemoveButton, setShowRemoveButton] = useState(false)
  const [enteredPin, setEnteredPin] = useState("")
  const [showCompletedButton, setShowCompletedButton] = useState(false)
  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true)
    } else {
      setShowRemoveButton(false)
    }
    if (enteredPin.length === 4) {
      setShowCompletedButton(true)
    } else {
      setShowCompletedButton(false)
    }
  }, [enteredPin])
  return (
    <>
      <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#2867B2", justifyContent: "center", alignItems: "center" }}>
            <View style={{margin:20}}>
            <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('CheckOut');
            }}>
           <Text
            style={{
              paddingTop: 24,
              paddingBottom: 48,
              color: "rgba(255,255,255,0.7)",
              fontSize: 48,
              textAlign:"center"
            }}>
             Enter PIN
          </Text>
          </TouchableOpacity>
       
          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={value => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={{
              marginBottom: 24,
            }}
            inputViewEmptyStyle={{
              backgroundColor: "transparent",
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            inputViewFilledStyle={{
              backgroundColor: "#FFF",
            }}
            buttonViewStyle={{
              borderWidth: 1,
              borderColor: "#FFF",
            }}
            buttonTextStyle={{
              color: "#FFF",
            }}
            onButtonPress={key => {
              if (key === "custom_left") {
                pinView.current.clear()
              }
              if (key === "custom_right") {
                alert("Entered Pin: " + enteredPin);

                if(enteredPin=="2580"){

                AsyncStorage.getItem('userId')
                .then((id) => {
                  
                  axios.post(ENDPOINT+"/user/checkout",{
                    "id":parseInt(id),
                   "checkout":props.route.params.data
               })
               .then(function () {
                 ToastAndroid.show('Payment Done', ToastAndroid.SHORT);
                 props.navigation.navigate('Views',{data:props.route.params.data});
               })
               .catch(function () {
                 ToastAndroid.show('Error', ToastAndroid.SHORT);
               });
            
            
                });
            }
            else{
                ToastAndroid.show('Wrong Pin!What to go back press enter pin!', ToastAndroid.SHORT);
            }
              }
              // if (key === "three") {
              //   alert("You can't use 3")
              // }
            }}
            customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
            customRightButton={showCompletedButton ? <Icon name={"ios-rocket"} size={36} color={"#FFF"} /> : undefined}
          />
          </View>
        </SafeAreaView>
    </>
  )
}
export default Pin;