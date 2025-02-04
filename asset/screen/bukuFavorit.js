import React, {useEffect} from 'react';
import {Animated,Dimensions,Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput, Button, FlatList, SafeAreaView, SectionList, LogBox, ToastAndroid  } from 'react-native';
import {Actions, ActionConst } from 'react-native-router-flux';
import { NativeBaseProvider, HStack, VStack, Center, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import RecBook from '../const/recBook';
import DaftarBuku from '../const/daftarBuku';
import GenreBuku from '../const/genreBuku';
import Tag from '../const/tag';
import GLOBAL from '../Global/global';

const bukuFavorit = [
    {title: 'google', id: '1'}
];

export default function (){
    const [loading, setloading] =React.useState(true);
    const [kosong, setkosong] = React.useState(false);

    const getBukuFavorit = () =>{

        bukuFavorit.length = 0;
        setloading(true);

        var body = new FormData();
        body.append('command', 'getbukufavorit');
        body.append('userid', GLOBAL.USER.USERID);

        const data = axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            
            response.data.forEach(item => {
                bukuFavorit.push(item);
                console.log(item);
            });
            // setloading(false);
            if(bukuFavorit[0].cover == 0 && bukuFavorit[0].date == 0 && bukuFavorit[0].description == 0){
                console.log("hasil pencarian kosong");
                setkosong(true);
                setloading(false);
            }

            else{
                //pencarian ditemukan 
                setloading(false);
                setkosong(false);
                
            }
        },
        error => {
            console.log(error);
        });
    }


    useEffect(()=>{
        getBukuFavorit();
    },[]);
    return(
        <NativeBaseProvider>
                <View style={{alignItems:'center'}} >
                    
                    {
                        !loading && !kosong &&
                        <View>
                            <FlatList                   
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            data={bukuFavorit}
                            renderItem={({item})=>(
                                
                                <RecBook
                                urel ={item.cover}
                                title={item.title}
                                years={item.date}
                                bookuri={item.uri}
                                genre={item.genre}
                                idbuku ={item.id}
                                favorit={"1"}
                                />
                            )}
                            />
                            <View 
                            style={{
                                backgroundColor:'white',
                                position: 'absolute'
                            }}
                            >
                                <Text numberOfLines={1} style={{fontSize: 25, fontWeight: 'bold'}} >Buku favorit {GLOBAL.USER.USERNAME}</Text>
                            </View>
                        </View>
                    }

                    {
                        loading && 
                        <View style={{alignItems:'center', position: 'absolute', top:Dimensions.get('window').height/2}} >
                            <Spinner  size={55}  />
                            <Text style={{fontSize: 25, }} >Loading...</Text>
                        </View>
                    }
                    {
                        kosong && 
                        <Text style={{fontSize:35, alignSelf:'center', marginTop: Dimensions.get('window').height/2-150}} >USER BELUM MEMILIKI BUKU FAVORIT</Text>
                    }

                    

            </View>
        
        </NativeBaseProvider>
    
    )
}