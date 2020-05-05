import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text, Keyboard } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';
import _ from 'lodash';

export default function App() {
  const endpointCity = "https://api.openweathermap.org/data/2.5/forecast?lang=pt_br&units=metric&q=";
  const endpointTempo = "https://api.openweathermap.org/data/2.5/onecall?lat=";
  const lon = "&lon="
  const excludeAndApi = "&exclude=hourly,daily&appid="

  const apiKey = "8b079b1d883e8111ac16b978549bef2d";

  const[cidade, setCidade] = useState('');
  const[dadosJson, setDadosJson] = useState({});
  const[dadosJson2, setDadosJson2] = useState({});

  const[feelsLike, setFeelsLike] = useState('')
  const[sunrise, setSunrise] = useState('')
  const[sunset, setSunset] = useState('')
  const[icon, setIcon] = useState('')

  const capturarCidade = (cidade) => {
    setCidade(cidade)
  }

  const obtemLatLon = () => {
    setDadosJson({});
    const target = endpointCity + cidade + "&appid=" + apiKey;
    var long, lat;
    console.log(target)
    fetch(target)
    .then(dados => dados.json())
    .then((dados) => {
      setDadosJson(dados["city"])
        long = dadosJson.coord.lon;
        lat = dadosJson.coord.lat;
        console.log(lon, lat)
       endpointBuscaNovaApi(long, lat)
      Keyboard.dismiss();
    })
  }

  const endpointBuscaNovaApi = (long, lat) => {
    setDadosJson2({})
    const target = endpointTempo + lat + lon + long + excludeAndApi + apiKey;
    console.log(target)
    fetch(target)
    .then(dados => dados.json())
    .then((dados) => {
      setDadosJson2(dados["current"])
      setFeelsLike(dadosJson2.feels_like.toString())
      setSunrise(dadosJson2.sunrise.toString())
      setSunset(dadosJson2.sunset.toString())
      setIcon(dadosJson2.weather[0].icon.toString())
      Keyboard.dismiss();
    })
  }
  
  
  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput
          style={styles.nomeCidade}
          placeholder="Digite o nome da cidade"
          onChangeText={capturarCidade}
          value={cidade}
        />
        <Button
          title="Ok"
          onPress={obtemLatLon}
        />
      </View>
      <PrevisaoItem feelsLike={feelsLike} sunrise={sunrise} icon={icon} sunset={sunset}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  }
});
