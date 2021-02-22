import React, {useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ToastAndroid,TextInput,AsyncStorage
} from 'react-native';
import {Component} from 'react';

var RNFS = require('react-native-fs');

export default class CheckOut extends Component {
  state = {
    indexEditable:100,
    data: [
    ],
  };

  componentWillMount() {
    let i=0;
    for (let item of this.props.route.params.set) {
      this.state.data[i]=item;
      i++;
    }
  }

  check() {
      let a=this.props.route.params.set;
      console.log(a);
    if (this.state.data[0] == undefined) {
      return (
        <View>
          <Image
            style={{
              width: 300,
              height: 300,
              alignSelf: 'center',
            }}
            source={require('../images/back.png')}
          />
        </View>
      );
    }
  }

  editTodo (item, index) {
    this.setState({data:(
      this.state.data.map(todo => {
          if(item.fileName==todo.fileName){
          this.setState({indexEditable:index});  
          }
        return todo;
      }))
    })
  }

  editedTodo (item, index) {
    this.setState({indexEditable:100});  
  }

  editItemId (item, index,text) {
    this.setState({data:(
      this.state.data.map(todo => {
          if(item.description==todo.description){
              todo.upi=text;
          }
        return todo;
      }))
    })
  }

  editItemAmount (item, index,text) {
    this.setState({data:(
      this.state.data.map(todo => {
          if(item.description==todo.description){
              todo.amount=text;
          }
        return todo;
      }))
    })
  }

  editItemDes(item, index,text) {
    this.setState({data:(
      this.state.data.map(todo => {
          if(item.description==todo.description){
              todo.description=text;
          }
        return todo;
      }))
    })
  }

  async payment(){
    if(this.state.data[0]==undefined){
      ToastAndroid.show('Data Not Found!', ToastAndroid.SHORT);
      return;}
    this.props.navigation.navigate('Pin', {data: this.state.data});
  }

  render() {
    return (
      <View style={{margin: 30, flex: 1}}>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'differentFont',
              marginVertical: 20,
              marginHorizontal: 5,
            }}>
            Check Out
          </Text>
        </View>
        {this.check()}
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({item, index}) => (
              <View style={{flex: 1, flexDirection: 'row', margin: 5}}>
                {!(index===this.state.indexEditable) && (<TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 5,
                    borderColor: '#32CD32',
                  }}
                  onPress={() => {  this.editTodo(item,index)}}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                    }}
                    source={require('../images/pen.jpg')}
                  />
                </TouchableOpacity>)}

                { index===this.state.indexEditable && (<TouchableOpacity
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 5,
                    borderRadius: 5,
                    borderColor: '#32CD32',
                  }}
                  onPress={() => {  this.editedTodo(item,index)}}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                    }}
                    source={require('../images/right.png')}
                  />
                </TouchableOpacity>)}


                <View
                  style={{
                    width: 280,
                    flex: 1,
                    borderRadius: 10,
                    justifyContent: 'space-between',
                  }}>
                  
                  
                   <TextInput
                   numberOfLines={1}
                    style={{
                      marginHorizontal: 20,
                      padding: 5,
                      borderRadius: 5,
                      width: 220,
                      overflow: 'hidden',
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    value={item.description}
                    onChangeText={(text)=>{this.editItemDes(item,index,text)}}
                    editable = {index===this.state.indexEditable}
                  />
                  <View style={{flex:1,flexDirection:"row"}}>
                  <TextInput
                   numberOfLines={1}
                    style={{
                      marginLeft: 20,
                      padding: 5,
                      borderRadius: 5,
                      width: 160,
                      overflow: 'hidden',
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    value={item.upi}
                    onChangeText={(text)=>{this.editItemId(item,index,text)}}
                    editable = {index===this.state.indexEditable}
                  />
                  <TextInput
                    numberOfLines={1}
                    style={{
                      // marginLeft: 20,
                      padding: 5,
                      borderRadius: 5,
                      width: 60,
                      overflow: 'hidden',
                      borderColor: 'black',
                      borderWidth: 2,
                    }}
                    value={item.amount+''}
                    onChangeText={(text)=>{this.editItemAmount(item,index,text)}}
                    editable = {index===this.state.indexEditable}
                  />
                  </View>
                 
                </View>
              </View>
            )}
            keyExtractor={(item) => item.toString()}
          />
        </ScrollView>

        <View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 5,
              marginBottom: 70,
              borderColor: '#32CD32',
            }}
            onPress={() => {  this.props.navigation.navigate('Home',{set: this.props.route.params.set});}}>
            <Image
              style={{
                width: 50,
                height: 50,
                alignSelf: 'center',
              }}
              source={require('../images/add.png')}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            position: 'absolute',
            bottom: 20,
            flex: 1,
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.payment();
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Make Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appButtonContainer: {
    width: 280,
    alignSelf: 'center',
    elevation: 8,
    backgroundColor: '#FF6075',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
