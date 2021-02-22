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
  BackHandler,
  AsyncStorage,
  BackAndroid,
} from 'react-native';
import FilePickerManager from 'react-native-file-picker';
import {Component} from 'react';
import {TouchableHighlight} from 'react-native-gesture-handler';
import TesseractOcr, {
  LANG_ENGLISH,
  useEventListener,
} from 'react-native-tesseract-ocr';
import RNPdfToImage from 'react-native-pdf-to-image';
var RNFS = require('react-native-fs');

var globalSet = new Set();

export default class Document extends Component {

  state = {
    text: '',
    data: [
      //dummy data!!!
      // {
      //   fileName: 'resume-91794a4494c211ea885f06507c922a0a.pdf',
      //   path:/
      //     '/data/user/0/com.ae/cache/resume-91794a4494c211ea885f06507c922a0a.pdf',
      //   readableSize: '50 KB',
      //   size: 52144,
      //   type: 'application/pdf',
      //   uri:
      //     'content://com.android.providers.downloads.documents/document/3227',
      // },
    ],
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  //remove from todo!!!
  remove = (item, i) => {
    this.setState((prevState) => {
      let data = prevState.data.slice();
      data.splice(i, 1);

      if (globalSet.has(item)) {
        globalSet.delete(item);
      }
      return {data};
    });
  };

  //extract upi and other data from text
  extract(str, name) {
    // const str =
    //   'Grocery Bill Invoice \nsum: Aniket InvoicsNu-nw 2001321um 3/17/2020 \n—mmm- \n_——— \n—__E_ \nTotal Rs.120 upi: abcd@paytm email: abc@gmail.com \nimg19';

    const words = str.split(/[ .:;=?!~,`"&|()<>{}\[\]\r\n/\\]+/);
    // console.log(words);
    const count = words.length;
    let position = 0;
    let a = 0;
    let upi = '';
    let email = '';
    let total = '';

    // Loop through words whilst position is less than count
    while (position < count) {
      if (
        words[position].toUpperCase() == 'UPI' ||
        words[position].toUpperCase() == 'UPIID'
      )
        upi = words[position + 1];
      if (
        words[position].toUpperCase() == 'EMAIL' ||
        words[position].toUpperCase() == 'MAILID'
      )
        email = words[position + 1];
      if (words[position].toUpperCase() == 'TOTAL')
        if (words[position + 1].toUpperCase() == 'RS')
          total = words[position + 2];
        else total = words[position + 1];
      position++;
    }

    ToastAndroid.show(upi+"   "+ email+"   "+ total, ToastAndroid.LONG);
       
    console.log('upi=' + upi);
    console.log('email=' + email + '@gmail.com');
    console.log('total=' + total);

    var res = {
      description: name,
      upi: upi,
      email: email + '@gmail.com',
      amount: total,
    };
    globalSet.add(res);
    let todos = [...this.state.data, res];
    this.setState({
      data: todos,
    });
  }

  //text to image
  recognizeTextFromImage = async (path, name) => {
    try {
      const tesseractOptions = {};
      const recognizedText = await TesseractOcr.recognize(
        path,
        LANG_ENGLISH,
        tesseractOptions,
      );
      this.setState({text: JSON.stringify(recognizedText)});
      this.extract(recognizedText, name);
    } catch (err) {
      this.setState({text: ''});
    }
  };

  //adding to todo!!!
  AddPdf = () => {
    FilePickerManager.showFilePicker(null, (response) => {
      // console.log('Response = ', response);
      if (response.didCancel === true) {
        return;
      }
      RNPdfToImage.convert(response.uri)
        .then((image) => {
          // ToastAndroid.show(image.outputFiles + '', ToastAndroid.SHORT);
          ToastAndroid.show("Take A While!!No Worries.", ToastAndroid.LONG);
          this.recognizeTextFromImage(
            'file://' + image.outputFiles,
            response.fileName,
          );
        })
        .catch((err) => {
        });
    });
  };

  //check for an empty array!
  check() {
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
  render() {
    return (
      <View style={{margin: 30, flex: 1}}>
        <View
          style={{
            position: 'absolute',
            right: 10,
            top: 20,
            borderColor: '#32CD32',
          }}>
          <TouchableHighlight
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              borderRadius: 5,
              borderColor: '#32CD32',
            }}
            onPress={() => {
              AsyncStorage.setItem('loggedin', String(false));
              this.props.navigation.navigate('Login');
            }}>
            <Image
              style={{
                width: 40,
                height: 40,
                alignSelf: 'center',
              }}
              source={require('../images/logout.png')}
            />
          </TouchableHighlight>
        </View>
        <View>
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              fontFamily: 'differentFont',
              marginVertical: 20,
              marginHorizontal: 5,
            }}>
            Documents
          </Text>
        </View>
        {this.check()}
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={({item, index}) => (
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
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                    }}
                    source={require('../images/pdf.jpg')}
                  />
                  <Text
                    numberOfLines={1}
                    style={{margin: 20, width: 200, overflow: 'hidden'}}>
                    {item.description}
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
                  onPress={() => this.remove(item, index)}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      alignSelf: 'center',
                    }}
                    source={require('../images/delete.png')}
                  />
                </TouchableOpacity>
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
            onPress={() => this.AddPdf()}>
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
            flexDirection: 'row',
            justifyContent: 'space-between',
            justifyContent: 'space-between',
            alignContent: 'space-around',
            alignContent: 'space-between',
            alignSelf: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('ManualBill', {set: globalSet});
            }}
            style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>ManualBill</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CheckOut', {set: globalSet});
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
