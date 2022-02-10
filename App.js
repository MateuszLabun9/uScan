import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Ocr from './ocr';
import Aparat from './Aparat';
import ZdjeciaContextProvider, {ZdjContext} from './Zdjecia';
import NotatkiContextProvider, {NotatContext} from './Notatki';

const Stack = createStackNavigator();

/**
 *Ekran startowy
 *
 * @param {*} {navigation} nawigacja 
 * @returns wyświetla ekran główny z logo i przyciskami
 *
 */
function HomeScreen({navigation}) { 
  return (
    <View style={styles.widok}>
      <Image source={require('./assets/nowe.png')} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Aparat')}>
        <Text style={styles.text}>Zrób zdjęcie</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Galeria')}>
        <Text style={styles.text}>Wybierz zdjęcie</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ZapisaneNotatki')}>
        <Text style={styles.text}>Przeglądaj Notatki</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 *Wyswietlanie zapisanych notatek
 *
 * @param {*} {navigation} nawigacja 
 * @returns wyświetla zapisane foldery
 *
 */

function ZapisaneNotatki({navigation}) {
  const [notatki, dodajNotatke] = useContext(NotatContext);
  return (
    <View style={styles.widok}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Powrót</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ZawartoscFolderu')}>
        <Text style={styles.text}>Mikroprocesory</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ZawartoscFolderu')}>
        <Text style={styles.text}>Technika Cyfrowa</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 *Przegladanie notatek
 *
 * @param {*} {navigation} nawigacja 
 * @returns wyświetla zawartosc folderu
 *
 */


function ZawartoscFolderu({navigation}) {
  return (
    <View style={styles.widok}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OdczytanyTekst')}>
        <Text style={styles.text}>12.12.2020.txt</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OdczytanyTekst')}>
        <Text style={styles.text}>09.11.txt</Text>
      </TouchableOpacity>
    </View>
  );
}

/**
 *Przegladanie wybranej notatki
 *
 * @param {*} {navigation} nawigacja 
 * @returns wyświetla zawartosc pliku tekstowego
 *
 */


function OdczytanyTekst({navigation}) {
  return (
    <View style={styles.widok}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sollicitudin lacus enim, ac molestie justo blandit eu. Donec gravida mauris et molestie congue. Suspendisse dapibus ipsum sit amet rutrum vehicula. Morbi posuere vestibulum lacus viverra tincidunt.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.text}>Powrót do menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00cc7a',
    color: '#29bc5f',
    padding: 15,
    height: '8%',
    width: '65%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 25,
    elevation: 15,
  },
  widok: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});






/**
 *System nawigacji 
 *
 * @export Ekran
 * @returns wyswietlanie ekranow
 */
export default function Ekrany() {
  return (
    <NotatkiContextProvider>
    <ZdjeciaContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ZapisaneNotatki" component={ZapisaneNotatki} />
          <Stack.Screen
            name="OdczytanyTekst"
            component={OdczytanyTekst}
          />
          <Stack.Screen
            name="ZawartoscFolderu"
            component={ZawartoscFolderu}
          />
          <Stack.Screen name="Galeria" component={Ocr} />
          <Stack.Screen name="TextDetectionComponent" component={Ocr} />
          <Stack.Screen name="Aparat" component={Aparat} />
        </Stack.Navigator>
      </NavigationContainer>
    </ZdjeciaContextProvider>
    </NotatkiContextProvider>
   
  );
}
