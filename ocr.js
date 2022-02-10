import React, {Component, Fragment} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNTesseractOcr from 'react-native-tesseract-ocr';
import { NavigationEvents } from 'react-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.lighter,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 0,
    height: Dimensions.get('screen').height - 128,
    width: Dimensions.get('screen').width,
    paddingHorizontal: 20,
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3,
  },
  btnParentSection: {
    alignItems: 'center',
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom: 10,
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cc7a',
    color: '#29bc5f',
    padding: 15,
    width: '65%',
    marginBottom: 10,
    marginTop: 10,
    height: 40,
    borderRadius: 25,
    elevation: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  text2: {
    color: 'black',
    fontSize: 16,
    textTransform: 'uppercase',
    
  },
});

/**
 *OCR
 *
 * @export Ocr
 * @class Ocr 
 * @extends {Component}
 * @return tekst odczytany ze zdjecia
 */
export default class Ocr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filepath: {
        data: '',
        uri: '',
      },
      fileData: '',
      fileUri: '',
    };
  }


  launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      // console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        //alert(response.customButton);
      } else {
        const tessOptions = {
          whitelist: null,
          blacklist: '1234567890\'!"#$%&/()={}[]+*-_:;<>',
        };
        console.log({...response, data: ''});
        // const path = response.uri.replace('content://', '');
        // console.log(path);
        RNTesseractOcr.recognize(response.path, 'LANG_ENGLISH', tessOptions)
          .then(result => {
            this.setState({ocrResult: result});
            console.log('OCR Result: ', result);
          })
          .catch(err => {
            console.log('OCR Error: ', err);
          })
          .done();

        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
        });
      }
    });
  };

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image source={{uri: this.state.fileUri}} style={styles.images} />;
    }
  }
  render() {
    const scrollEnabled = false;
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <ScrollView style={styles.scrollView}>
              <Text
                style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
                Wybierz zdjecie
              </Text>
              <View style={styles.ImageSections}>
                <View>
                  {this.renderFileUri()}
                  <Text style={{textAlign: 'center'}}>
                    Podgląd wybranego zdjęcia
                  </Text>
                </View>
              </View>

              <View style={styles.btnParentSection}>
                <TouchableOpacity
                  onPress={this.launchImageLibrary}
                  style={styles.button}>
                  <Text style={styles.text}>Galeria</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.text2}>{this.state.ocrResult || 'Nie wybrano zdjęcia'}</Text>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}
