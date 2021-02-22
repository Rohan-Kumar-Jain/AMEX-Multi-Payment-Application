import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  ToastAndroid,
  TextInput,
} from 'react-native';

import {Component} from 'react';
import { SCREEN_HEIGHT } from './constant';

const onChange1 = (textValue) => {
  n = textValue;
};
const onChange2 = (textValue) => {
  p = textValue;
};
const onChange3 = (textValue) => {
  u = textValue;
};

let n = '',
  p = '',
  u = '';

export default class ManualBill extends Component {
  constructor(props) {
    super(props);
    this.hold1 = React.createRef();
    this.hold2 = React.createRef();
    this.hold3 = React.createRef();
  }

  state = {
    data: [
      // {
      //   billName: 'grocery bill',
      //   upi: 'abc@icici',
      //   amount: 1200,
      // },
      // {
      //   billName: 'screw bill',
      //   upi: 'abc@icici',
      //   amount: 500,
      // },
      // {
      //   billName: 'grocery bill',
      //   upi: 'abc@icici',
      //   amount: 1200,
      // },
      // {
      //   billName: 'screw bill',
      //   upi: 'abc@icici',
      //   amount: 500,
      // },
    ],
  };

  //remove from todo!!!
  remove = (item,i) => {
    this.setState((prevState) => {
      let data = prevState.data.slice();
      data.splice(i, 1);
  
      if (this.props.route.params.set.has(item)) {
        this.props.route.params.set.delete(item);
      }
      return {data};
    });
  };

  //adding to todo!!!
  AddPdf = () => {
    if (n != '' && p != '' && u != '') {
      // let todos = [{descritpion: n, upi: u, amount: p,email:""}, ...this.state.data];
      // this.setState({
      //   data: todos,
      // });
      var res={"description":n,"upi":u, "email":"" ,"amount":p};
      this.props.route.params.set.add(res);
      let todos = [res,...this.state.data, ];
      this.setState({
        data: todos,
      });
      (n = ''), (p = ''), (u = '');
      this.hold1.current.clear();
      this.hold2.current.clear();
      this.hold3.current.clear();
    } else {
      Alert.alert('OOPS', 'Fill all three values', [
        {text: 'Understood', onPress: () => console.log('alert closed')},
      ]);
    }
   
   
  };

  check() {
    if (this.state.data[0] == undefined) {
      console.log("ffff");
      return (
        <View>
          {/* <Image
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
            source={require('../images/back.png')}
          /> */}
        </View>
      );
    }
  }


  render() {
    return (
      
      <View style={{margin: 30, flex: 1}}>
   {this.check()}
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'differentFont',
              marginVertical: 20,
              marginHorizontal: 5,
              alignSelf: 'center',
            }}>
            Manual Bills
          </Text>
        </View>

        <View
          style={{
            margin: 5,
            padding:10,
            height: SCREEN_HEIGHT/6,
            backgroundColor: '#DCDCDC',
            borderRadius: 10,
          }}>
          <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 5}}>
            <View >
              <TextInput
                placeholder="Bill name"
                onChangeText={onChange1}
                ref={this.hold1}
                style={{
                  // margin: 10,
                  width: 150,
                  height: 40,
                  borderWidth: 1,
                  fontSize: 14,
                  borderRadius: 10,
                }}></TextInput>
            </View>
            <View >
              <TextInput
                placeholder="Bill value"
                onChangeText={onChange2}
                ref={this.hold2}
                style={{
                  marginHorizontal: 10,
                  width: 100,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                }}></TextInput>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', margin: 5}}>
            <View >
              <TextInput
                placeholder="UPI"
                onChangeText={onChange3}
                ref={this.hold3}
                style={{
                  // margin: 10,
                  width: 200,
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 10,
                }}></TextInput>
            </View>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
                // marginVertical: 20,
                borderColor: '#32CD32',
              }}
              onPress={() => this.AddPdf()}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  // borderRadius: 10,
                  alignSelf: 'center',
                }}
                source={require('../images/add.png')}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView >
          <FlatList
            data={this.state.data}
            style={{height:SCREEN_HEIGHT/2.5}}
            renderItem={({item, index}) => (
              <View style={{margin: 10, flex: 1}}>
                <View style={{flex: 1, flexDirection: 'row', margin: 5}}>
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 280,
                      flex: 1,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{margin: 5, width: 200, overflow: 'hidden'}}>
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 280,
                      flex: 1,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{margin: 5, width: 200, overflow: 'hidden'}}>
                      {item.amount}
                    </Text>
                  </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', margin: 5}}>
                  <View
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      width: 280,
                      flex: 1,
                      borderRadius: 10,
                      flexDirection: 'row',
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{margin: 5, width: 200, overflow: 'hidden'}}>
                      {item.upi}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      borderRadius: 5,
                      borderColor: '#32CD32',
                    }}
                    onPress={() => this.remove(item,index)}>
                    <Image
                      style={{
                        width: 20,
                        height: 20,
                        alignSelf: 'center',
                      }}
                      source={require('../images/delete.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Document');
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>UploadBill</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CheckOut', {set: this.props.route.params.set});
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>CheckOut</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    width: 150,
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
