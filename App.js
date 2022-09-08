import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Linking, FlatList, Button } from 'react-native';
import { instance } from './Api/axios';
import RNApkInstallerN from 'react-native-apk-installer-n';



import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen({ navigation }) {
  const [data, setData] = useState("")
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    try {
      const response = await instance.get("apiG0")
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderCard = (item, i) => {
    console.log(item)
    return (
      <View key={i} style={styles.cardVeiw}>

<TouchableOpacity  onPress={() => {

// navigation.navigate('Details')

          { item.item.app_download == "" || item.item.app_download == undefined ? Linking.openURL(`http://play.google.com/store/apps/details?id=${item.item.package_name}`) : Linking.openURL(item.item.app_download) }
        }}>
          <Image source={item.item.app_name?{ uri: item.item.app_icon }:require('../apkDownload/assets/apk.png')} style={{ width: 70, height: 70,alignSelf:'center',marginTop:10 }} />
          <View style={{ alignItems: 'center', width: 110,backgroundColor:'#093f46',borderRadius:2 }}>
            <Text style={styles.appName}>{item.item.app_name}</Text>
            <Text style={styles.appVersion}>{item.item.app_version}</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    )
  }

  return (
      <View style={styles.container}>
        {data == "" || data == undefined ?
          <ActivityIndicator
            size="small"
            color="white"
          /> :

          <FlatList
          data={data}
          numColumns={3}
          renderItem={renderCard}
        />
        //  data.map(renderCard)
               }
        {/* {renderCard()} */}
        <StatusBar style="auto" />
      </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',

  },
  cardVeiw: {
    marginHorizontal: '2%',
    marginVertical: '10%',
    height:'80%',
    width:'30%',
    backgroundColor: 'transparent',
    alignItems: 'center',
    alignContent:'center',
  },
  appName: {
    fontSize: 14,
    color: 'white',
    fontWeight: '400'
  },
  appVersion: {
    fontSize: 10,
    color: 'white',
    fontWeight: '300'
  }
});
