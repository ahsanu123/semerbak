import React, {useEffect, useRef} from 'react';
import {Animated,Dimensions,Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput, Button, FlatList, SafeAreaView, SectionList, LogBox, ToastAndroid, Keyboard  } from 'react-native';
import {Actions, ActionConst } from 'react-native-router-flux';
import { NativeBaseProvider, HStack, VStack, Center, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import RecBook from '../const/recBook';
import DaftarBuku from '../const/daftarBuku';
import GenreBuku from '../const/genreBuku';
import Tag from '../const/tag';
import SearchConst from '../const/searchConst';
import GLOBAL from '../Global/global';

const result = [];

export default function (){
    // const [result, setresult] = React.useState([]);
    const [kosong, setkosong] = React.useState(false);
    const [loading, setloading] = React.useState(false);
    const [keyword, onChangeKeyword] = React.useState('');
    const [changedResult, setChangedResult] = React.useState(true);
    const cari = useRef();
    
    const findBuku = (key) =>{
        // setresult([]);
        // result.splice(0,result.length);
        result.length=0;
        setloading(true);
        
        var body = new FormData();
        body.append('command', 'findbuku');
        body.append('titlebuku', key);
        body.append('userid', GLOBAL.USER.USERID);
        

        const data = axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            response.data.forEach(item => {
                result.push(item);
                // console.log(item);
            });
            // setloading(false);
            if(result[0].cover == 0 && result[0].date == 0 && result[0].description == 0){
                console.log("hasil pencarian kosong");
                setkosong(true);
                setloading(false);
                result.length=0;
                console.log("RESULT LENGTH nol: " + result.length);
                setChangedResult(!changedResult);
                console.log("CHANGED RESULT: " + changedResult);

                cari.current.focus();
                
            }

            else{
                //pencarian ditemukan
                console.log("RESULT LENGTH DITEMUKAN: " + result.length)
                setloading(false);
                setkosong(false);
                setChangedResult(!changedResult);
                console.log("CHANGED RESULT: " + changedResult);
                
            }
        },
        error => {
            console.log(error);
        });
        

    }
    useEffect(()=>{
        result.length=0;
    }, []);

    return(
        <NativeBaseProvider>
            <View style={{flex:1,backgroundColor:'white'}} >
                <View style={{backgroundColor:'white', marginBottom:60,}} >
                    <View style={{height:50,backgroundColor:'white', flexDirection:'row', elevation:5}} >
                        <View style={{width:50,  flex:0.15}} >
                            <TouchableOpacity
                            onPress={()=>Actions.pop()}
                            >
                                <Icon name="arrow-left" size={35} style={{color:'black', marginTop:7, marginLeft:5}} />
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1}} >
                            <TextInput
                            autoFocus={true}
                            ref={cari}
                            returnKeyType="search"
                            placeholder="Coba: 'Poin'"
                            onPressIn={()=>console.log("pressed")}
                            onChangeText={onChangeKeyword}
                            onSubmitEditing={()=>{
                                findBuku(keyword);
                                setChangedResult(!changedResult);
                            }}
                            style={{
                                backgroundColor:'white',
                                fontSize:18,
                                marginLeft:15,
                                marginVertical:2,
                            }}
                            />
                        </View>
                    
                    </View>

                    <View style={{paddingVertical:3, backgroundColor:'white'}} >
                        <Text style={{marginLeft:5, fontSize:16}} numberOfLines={1} >Search untuk mencari: <Text style={{fontSize:16, color: GLOBAL.COLOR.BLUE}} >{keyword}</Text></Text>
                    </View>

                    {
                        !kosong && !loading &&
                        <FlatList 
                        data={result}
                        keyExtractor={item => item.id}
                        extraData={changedResult}
                        ListEmptyComponent={()=>{
                            return(
                                <View>

                                </View>
                            )
                        }}
                        renderItem={({item})=>(
                            <SearchConst
                            title={item.title}
                            genre={item.genre}
                            date = {item.date}
                            favorit ={item.favorit}
                            idbuku ={item.id}
                            cover={item.cover}
                            bookuri = {item.uri}
                            />

                        )}
                        />  
                    }
                    {
                        kosong && !loading &&
                        <View style={{alignItems:'center', marginTop:Dimensions.get('window').height/2-250}} >
                            <Icon name="emoticon-sad-outline" size={105} />
                            <Text style={{ fontSize:25}} > Hasil Tidak ditemukan </Text>
                        </View>
                    }
                    {
                        loading &&
                        <Spinner size={100} style={{marginTop: Dimensions.get('window').height/2-200}} />
                    }

                    
                </View>
            
            </View>
        </NativeBaseProvider>
    )
}

// {
//     !loading && !kosong && 
//     <View style={{alignContent:'center'}} >
//         <Text style={{fontSize: 25}} numberOfLines={1} >Hasil pencarian: {GLOBAL.SEARCH.KEYWORD}</Text>
        
//         <FlatList 
//         keyExtractor={item => item.id}
//         data={result}
//         renderItem={({item})=>(
//             <DaftarBuku
//             title={item.title}
//             urel={item.cover}
//             year={item.date}
//             description={item.description}
//             bookuri={item.uri}
//             genre={item.genre}
//             idbuku={item.id}
//             />
//         )}
//     />

//     </View>
// }
// {
//     loading && 
//     <Spinner  size={55} style={{alignSelf:'center', marginTop:Dimensions.get('window').height/2-150}} />
// }
// {
//     kosong && 
//     <Text style={{fontSize: 35, marginTop: Dimensions.get('window').height/2-150, alignSelf:'center', marginHorizontal:15,}} > HASIL PENCARIAN {GLOBAL.SEARCH.KEYWORD} TIDAK DITEMUKAN </Text>
// }