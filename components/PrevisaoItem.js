import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Cartao from './Cartao';

const PrevisaoItem = (props) => {
    return (
        <Cartao estilos={estilos.cartao}>
            <View style={estilos.tela}>
                 <Image 
                    style={estilos.imagem}
                    source={{uri: 'https://openweathermap.org/img/wn/' + props.icon + ".png"}}
                />
                <View>
                    <View style={estilos.primeiraLinha}>
                        <Text>Nascer do sol : {new Date(props.sunrise * 1000).toLocaleTimeString()}</Text>
                    </View>
                    <View style={estilos.segundaLinha}>  
                        <Text style={estilos.valor}>Sensação termica: {props.feelsLike} </Text>
                    </View>
                </View>
            </View>
        </Cartao>
    )
}

const estilos = StyleSheet.create({
    valor: {
        marginHorizontal: 2
    },
    primeiraLinha: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    segundaLinha:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 4,
        borderTopWidth: 1,
        borderTopColor: '#EEE'
    },
    cartao: {
        marginBottom: 5
    },
    tela: {
        flexDirection: 'row'
    },
    imagem: {
        width: 50,
        height: 50
    },
    primeiraLinha: {

    }
})

export default PrevisaoItem;