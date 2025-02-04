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

const history = [
    {title: 'google', id: '1'}
];

export default function (id){
    const [loading, setloading] =React.useState(true);
    const [kosong, setkosong] = React.useState(false);

    const gethistory = (id) =>{

        history.length = 0;
        setloading(true);

        var body = new FormData();
        body.append('command', 'gethistory');
        body.append('userid', id);

        const data = axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {

            response.data.forEach(item => {
                history.push(item);
                console.log(item);
            });
            // setloading(false);
            if(history[0].cover == 0 && history[0].date == 0 && history[0].description == 0){
                console.log("user belum memiliki history");
                setloading(false);
                setkosong(true);
            }

            else{
                //user memiliki history
                setloading(false);
                setkosong(false);
            }
            
        
        },
        error => {
            console.log(error);
        });
    }
    const hapusHistory = () =>{

        history.length = 0;
        setloading(true);

        var body = new FormData();
        body.append('command', 'deletehistory');
        body.append('userid', GLOBAL.USER.USERID);

        const data = axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            console.log(response.data);
            if(response.data.data.deleteHistoryStatus == 1){
                console.log("behasil");
                setloading(false);
                setkosong(true);
                ToastAndroid.showWithGravity(
                    "Berhasil Menghapus History",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            }
            else if(response.data.data.deleteHistoryStatus == 0){
                console.log("gagal");
                setloading(false);
                setkosong(true);
                ToastAndroid.showWithGravity(
                    "Maaf terjadi error",
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER,
                );
            }
        },
        error => {
            console.log(error);
        });
    }


    useEffect(()=>{
        gethistory(GLOBAL.USER.USERID);
        // gethistory(5);
    },[]);
    return(
        <NativeBaseProvider>
                <View style={{alignItems:'center',}} >
                    
                    {
                        !loading && !kosong &&
                        <View style={{ marginTop:20,}} >
                            <FlatList                   
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                            data={history}
                            renderItem={({item})=>(
                                <DaftarBuku
                                title={item.title}
                                urel={item.cover}
                                year={item.date}
                                description={item.description}
                                bookuri={item.uri}
                                genre={item.genre}
                                />
                            )}
                            />
                            <View 
                            style={{
                                backgroundColor:'white',
                                flexDirection: 'row',
                                position:'absolute',
                                bottom:0
                            }}
                            >
                                <TouchableOpacity
                                onPress={()=>hapusHistory()}
                                style={{flex:1, backgroundColor: 'red', alignItems:'center', paddingVertical:25,}}
                                >
                                    <Text style={{fontSize:18, color:'white', fontWeight:'bold'}} >DELETE HISTORY</Text>
                                </TouchableOpacity>
                            
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
                        <View style={{alignItems:'center',  backgroundColor:'white',width:Dimensions.get('window').width, height:Dimensions.get('window').height}} >
                            <View style={{width:150,height:150, marginTop: Dimensions.get('window').height/2-150,}} >
                                <Image 
                                source={{uri: 'https://images.vexels.com/media/users/17482/106930/preview2/fcba42ccb55e21d86c6cc25078f0431e-cute-and-sad-icon-vector.png'}}
                                style={{
                                    flex:1,
                                    width:null,
                                    height:null,
                                    resizeMode: 'cover',
                                }}
                                />
                            </View>
                            <Text style={{ fontSize:30, fontWeight:'bold', color:'red'}} >USER BELUM MEMILIKI HISTORY!!, SEGERA BACA BUKU</Text>
                        </View>
                    }

                    

            </View>
        
        </NativeBaseProvider>
    
    )
}