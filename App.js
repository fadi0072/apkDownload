import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { instance } from './Api/axios';
import RNApkInstallerN from 'react-native-apk-installer-n';


export default function App() {
  const [data, setData] = useState("")
  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    try {
      const response = await instance.get("apiG0")
      console.log('response is', response.data)
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const renderCard = (item, i) => {
    return (
      <View style={styles.cardVeiw} key={i}>
        <TouchableOpacity style={styles.cardVeiw} onPress={() => {

          { item.app_download == "" || item.app_download == undefined ? Linking.openURL(`http://play.google.com/store/apps/details?id=${item.package_name}`) : Linking.openURL(item.app_download) }
        }}>
          <Image source={{ uri: item.app_icon }} style={{ width: 200, height: 200 }} />
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={styles.appName}>{item.app_name}</Text>
            <Text style={styles.appVersion}>{item.app_version}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {data == "" || data == undefined ?
          <ActivityIndicator
            size="small"
            color="white"
          /> :
          data.map(renderCard)
        }
        {/* {renderCard()} */}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202124',

  },
  cardVeiw: {
    marginHorizontal: '10%',
    marginVertical: '15%',
    backgroundColor: 'red',
    alignItems: 'center'
  },
  appName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '800'
  },
  appVersion: {
    fontSize: 15,
    color: 'white',
    fontWeight: '300'
  }
});
