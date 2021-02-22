import React,{Component} from 'react';
import { FlatList, TouchableOpacity, Text, View,Image,StyleSheet ,ToastAndroid,AsyncStorage } from 'react-native';
import { ENDPOINT } from './constant';

import axios from 'axios';

// or any pure javascript modules available in npm

export default class Passbook extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){

    AsyncStorage.getItem('userId')
    .then((id) => {
      
      axios.post(ENDPOINT+'/user/passbook',{
        "id":parseInt(id)
   })
   .then(
       (response)=>{
           console.log(response);
        this.setState({
            isLoading: false,
            dataSource: response.data,
          }
   )})
   .catch(err=>
     {ToastAndroid.show("Error!!", ToastAndroid.SHORT);}
   );


    });
   
    // return fetch(ENDPOINT+'/user/passbook')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("sss");
    //     this.setState({
    //       isLoading: false,
    //       dataSource: responseJson,
    //     }, function(){

    //     });

    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
  }

//item seprator
 FlatListItemSeparator = () => {
   return (
     <View
       style={{
         height: 1,
         width: "100%",
         backgroundColor: "#000",
       }}
     />
   );
 }

  render(){


    return(
      <View style={{flex: 1, paddingTop:20, paddingHorizontal:5, backgroundColor:'white'}}>
        <View
          style={{
            backgroundColor:'#f3e0be',
            width:360,
            alignSelf: 'center',
            
            
          }}>
          <TouchableOpacity
            onPress={() => {
                this.props.navigation.navigate("Views");
            }}
            style={styles.appButtonContainerBack}>
            <Text> Back</Text>
          </TouchableOpacity>
      
        </View>
        <Text style={{fontSize:20,fontStyle:"italic",color:"#2a4b7c",fontWeight: 'bold',margin:5}}>Here is your E-Passbook</Text>
      
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => 
            <View style={{flex:1, flexDirection: 'column', overflow:'scroll'}}>
    
              
            
            <Text style={styles.text}>Description:<Text style={styles.text2}>{item.description}</Text></Text>
            <Text style={styles.text}>Amount:<Text style={styles.text2}>{item.amount}</Text></Text>
            <Text style={styles.text}>Date:<Text style={styles.text2}>{item.date}</Text></Text>
            <Text style={styles.text}>UPI ID:<Text style={styles.text2}>{item.upi_id}</Text></Text>
 
            </View>
        
          }
          numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 
 
imageView: {
 
    width: '95%',
    height: 200 ,
    margin: 7,
    borderRadius : 5
 
},
text:
{ 
    fontSize: 17,
    paddingHorizontal:5,
    color:'black',
    textAlign:"left",
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    overflow:"hidden",
    
},

text2:
{ 
   fontSize: 18,
    color:'black',
    fontWeight:"bold",
    textAlign:"left",
    fontFamily: 'sans-serif',
    fontStyle: 'italic',
    overflow:"hidden",
    
},
appButtonContainerBack: {
  width:60,
  elevation: 8,
  backgroundColor: '#f3e0be',
  borderRadius: 100,
  paddingVertical: 10,
  paddingHorizontal: 12,
  margin:10,
  borderColor:'black',
},

 
 
});