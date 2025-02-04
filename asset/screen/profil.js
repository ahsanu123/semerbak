import axios from 'axios';
import { NativeBaseProvider, Spinner } from 'native-base';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ImageBackground, Dimensions, TextInput, ToastAndroid,Modal,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Scene, Router, TabBar,  Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';

import GLOBAL from '../Global/global';




const styles = StyleSheet.create({
    radio: {
      flexDirection: 'row',
    },
    img: {
      height: 20,
      width: 20,
      marginHorizontal: 5,
    },
    btn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: 'red',
    },
  });

const Radio = () => {
    const [checked, setChecked] = useState(0);
    var gender = ['Male', 'Female'];
    return (
      <View>
        <View style={styles.btn}>
          {gender.map((gender, key) => {
            return (
              <View key={gender}>
                {checked == key ? (
                  <TouchableOpacity 
                  style={styles.btn}>
                    <Icon name="check" size={17}/> 
                    <Text>{gender}</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setChecked(key);
                    }}
                    style={styles.btn}>
                    <Icon name="check" size={17}/> 
                    <Text>{gender}</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
        {/* <Text>{gender[checked]}</Text> */}
      </View>
    );
  };
  

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const profilHeaderBackground = require('../images/profilHeaderBackground.jpg');
const iconPubg = require('../images/iconPubg.png');
  
const LatestBook = (props) =>{
  return(
    <View 
    style={{
      marginTop:25,
    }} 
    >
      <View style={{height:460,}} >
        <ImageBackground
        source={{uri:'https://www.weiserantiquarian.com/pictures/medium/59690.jpg'}}
        resizeMode="cover"
        style={{
          flex:1,
        }}
        >

        </ImageBackground>
      </View>

      <View style={{position:'absolute', bottom:10, left:5}} >
        <Text style={{fontSize:17, backgroundColor:'grey', color:'white', paddingHorizontal:15,paddingVertical:3, borderRadius:5}} >{props.title}</Text>
      </View>

      <View style={{position:'absolute', top:5, left:5}} >
        <Text style={{fontSize:17, backgroundColor:'grey', color:'white', paddingHorizontal:15,paddingVertical:3, borderRadius:5}} >Dibaca: {props.date}</Text>
      </View>

    </View>
  );
}
  

export default function (){

    const [dbFullname, setDbFullname] = React.useState('');
    const [dbnohandphone, setdbnohandphone] = React.useState('');
    const [username, setusername] = React.useState('');
    const [fullname, onChangeFullName] = React.useState('');
    const [nohandphone, onChangeNoHandphone] = React.useState('');
    const [email, setemail] = React.useState("");
    const [point, setpoint] = React.useState();
    const [edit, setedit] = React.useState(false);
    const [loading, setloading] = React.useState(true);
    const [loadingupdate, setloadingupdate] = React.useState(false);
    const [editVisible, seteditVisible] = React.useState(false);
    const [cacheprofile, setcacheprofile] = React.useState(0);
    const [profile, selectedProfile] = React.useState(0);
    

    const showIcon =(profil)=>{
      if(profil === "0"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-king" size={45} style={{marginTop:5}} />
          </View>
        )
      }
      if(profil === "1"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-queen" size={45} style={{marginTop:5}} />
          </View>
        )
      }
      if(profil === "2"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-pawn" size={45} style={{marginTop:5}}/>
          </View>
        )
      }
      if(profil === "3"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-bishop" size={45} style={{marginTop:5}}/>
          </View>
        )
      }
      if(profil === "4"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-knight" size={45} style={{marginTop:5}}/>
          </View>
        )
      }
      if(profil === "5"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="chess-rook" size={45} style={{marginTop:5}}/>
          </View>
        )
      }
      if(profil === "6"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="horseshoe" size={40} style={{marginTop:5}}/>
          </View>
        )
      }
      if(profil === "7"){
        return (
          <View style={{backgroundColor: 'white',height:60, width:60,  borderRadius:50, alignItems:'center'}} >
            <Icon name="campfire" size={45}style={{marginTop:5}}/>
          </View>
        )
      }

    }

    const showBadge = (point) =>{
        if(point<=100){
            return (
            <View style={{flexDirection: 'row'}} >
                <View style={{ flexDirection: 'row', paddingHorizontal: 10,  borderRadius: 5, marginTop:7}} >
                        <Text style={{color: GLOBAL.COLOR.BLUE,  fontSize:13, fontWeight:'bold',}} >NOOB READER</Text>
                  </View>
                
            </View>
            );
        }
        else if(point>100 && point <=500){
            return (
                <View style={{flexDirection: 'row'}} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10,  borderRadius: 5, marginTop:7}} >
                        <Text style={{color: GLOBAL.COLOR.BLUE,  fontSize:13, fontWeight:'bold',}} >BEGINNER READER</Text>
                    </View>
                    
                </View>
                );
        }
        else if(point>500 && point <=1000){
            return (
                <View style={{flexDirection: 'row'}} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10,  borderRadius: 5, marginTop:7}} >
                        <Text style={{color: GLOBAL.COLOR.BLUE,  fontSize:13, fontWeight:'bold',}} >MANIAC READER</Text>
                    </View>
                    
                </View>
                );
        }
        else if(point>1000 ){
            return (
                <View style={{flexDirection: 'row'}} >
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10,  borderRadius: 5, marginTop:7}} >
                        <Text style={{color: GLOBAL.COLOR.BLUE,  fontSize:13, fontWeight:'bold',}} >KUTU BUKU</Text>
                    </View>
                    
                </View>
                );
        }
    }

    const notEditable =(what) =>{
      if(edit){
        ToastAndroid.showWithGravity(
          "MAAF " + what.toUpperCase() +" TIDAK BISA DIGANTI!!",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        )
      }
    }

    const getDataProfil = async(id) => {
        const body = new FormData();
        body.append("command", "getdataprofil");
        body.append("userid", id);

        const data = await axios({
          method:'post',
          url: 'http://semerbak-swag.com/api/',
          headers: { "Content-Type": "multipart/form-data" },
          data: body,
        })
        .then(response => {
          console.log(response.data);

          setemail(response.data.profildata.email);
          setusername(response.data.profildata.username);
          onChangeFullName(response.data.profildata.namalengkap);
          onChangeNoHandphone(response.data.profildata.nohandphone);
          setpoint(response.data.profildata.point);

          selectedProfile(response.data.profildata.foto);
          setcacheprofile(response.data.profildata.foto);

          setDbFullname(response.data.profildata.namalengkap);
          setdbnohandphone(response.data.profildata.nohandphone);

          setloading(false);
        },
        error =>{
          console.log("ERROR: " + error);
        }
        )
    };

    const update = (id) =>{
      setloadingupdate(true);
      const body = new FormData();
      body.append("command", "updatedataprofil");
      body.append("userid", id);
      body.append("namalengkap", fullname);
      body.append("nohandphone", nohandphone);
      body.append("foto", cacheprofile);

      const data = axios({
        method: 'post',
        url: 'http://semerbak-swag.com/api/',
        headers: {"Content-type": "multipart/form-data"},
        data: body,

      })
      .then(response => {
        console.log(response.data);
        getDataProfil(GLOBAL.USER.USERID);
        setloadingupdate(false);

        if(response.data.data.updateprofil == 1){
          ToastAndroid.showWithGravity(
            "Berhasil menyimpan ke server",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          seteditVisible(false);
        }
        else{
          ToastAndroid.showWithGravity(
            "Terjadi Error, Silahkan Coba lagi",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
        }
      }, 
      error => {
        console.log(error);
      });
    };

    const updatedata = () =>{
      setedit(!edit);

      if(edit == true){
        if(dbFullname == fullname && dbnohandphone == nohandphone && profile == cacheprofile){
          //tidak ada data yang di ganti oleh user
          ToastAndroid.showWithGravity(
            "Silahkan ganti data untuk menyimpan ke server", 
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          setedit(true);
        }
        else if(fullname === '' || nohandphone === ''){
          ToastAndroid.showWithGravity(
            "DATA TIDAK BOLEH KOSONG!!",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
          );
          setedit(true);
        }

        //jika data ada yang diganti update ke server
        else{
          //lakukan update
          GLOBAL.USER.USERNAME = fullname;
          update(GLOBAL.USER.USERID);
        }

       
      }
      
    }

    useEffect(()=>{
      getDataProfil(GLOBAL.USER.USERID);
      // getDataProfil(5);
      
    },[]);


    return(
      <NativeBaseProvider>
        <ScrollView>
        {
          !loading &&
          <View>
            {/* TOP PROFILE */}
            <View
            style={{
              flexDirection:'row',
              paddingHorizontal:20,
              paddingVertical:15,
              backgroundColor:'white'
            }}
            >
              <View style={{flex:1}}>
                <Text style={{ fontSize:27, fontWeight:'bold', marginTop:5 }} >Profile</Text>
              </View>

              <View style={{flex:1}} >
                <View style={{flexDirection:'row', marginTop:5, backgroundColor:'white', elevation:5, paddingHorizontal:15, paddingVertical:5, borderRadius:15, backgroundColor:GLOBAL.COLOR.PURPLE}} >
                  <Text style={{fontSize:18, color:'white'}} >POIN: </Text>
                  <Text style={{fontSize:18, fontWeight:'bold',color:'gold'}} >{point}</Text>
                </View>
              </View>
            </View>

            {/* DETAIL PROFILE */}
            <View style={{marginTop:20, backgroundColor:'white', paddingVertical:15, elevation:5}} >
              <View style={{flexDirection:'row'}} >
                <View 
                style={{
                  width: 60,
                  height: 60,
                  marginLeft:15,
                }}
                >
                  {
                    showIcon(profile)
                  }
                </View>

                <View style={{marginLeft:15}} >
                  <View style={{flexDirection:'row'}} >
                    <Text numberOfLines={1} style={{fontSize:20, fontWeight:'bold', width:160,}} >{dbFullname}</Text>
                    {showBadge(point)}
                  </View>
                  <View style={{flexDirection:'row', marginTop:5}} >
                    <Icon name="email" size={16} style={{color:'grey', marginTop:3}} />
                    <Text style={{fontSize:14, marginTop:2, color:'grey', paddingHorizontal:3}}>{email}</Text>
                  </View>

                  
                </View>
              </View>
              
            </View>

            <View 
            style={{ 
              width:50, 
              height:50, 
              borderRadius: 50, 
              position:'absolute', 
              top:150,
              right:10,
              elevation:8,
              backgroundColor: GLOBAL.COLOR.BLUE,
            }} 
            >
              <TouchableOpacity
              onPress={()=>{
                setcacheprofile(profile);
                seteditVisible(!editVisible);
              }}
              style={{marginTop:11,marginLeft:12,}}
              >
                <Icon name="pencil" size={27} style={{ color: 'white'}} /> 
              </TouchableOpacity>
            </View>
            
            {/* OPTION SECTION */}
            <Text style={{fontSize:18, color:'grey', marginTop:25,marginLeft:15}} >Other Activities</Text>

            <View style={{marginTop:15, backgroundColor:'white', elevation:5, paddingVertical:20,paddingBottom:35,}}>

              <TouchableOpacity
              onPress={()=>Actions.bukuFavorit()}
              activeOpacity={0.8}
              style={{
                marginHorizontal:18,
                borderBottomColor:'grey',
                borderBottomWidth:1,
                paddingVertical:15,
              }}
              >
                <View style={{flexDirection:'row'}} >
                  <View style={{flex:0.25}} >
                    <Icon name="star" size={28} style={{marginTop:2,marginHorizontal:6, color:'white', backgroundColor:GLOBAL.COLOR.BLUE, padding:5, borderRadius:5,}} />
                  </View>

                  <View style={{flex:1}} >
                    <Text style={{fontSize:25, marginTop:5, marginLeft:15,}} >Buku Favorit</Text>
                  </View>

                  <View style={{flex:0.3}} >
                  <Icon name="chevron-right" size={28} style={{marginTop:2,color:'grey', padding:5, borderRadius:5,}} />
                  </View>
                </View>
              </TouchableOpacity>
            
              <TouchableOpacity
              onPress={()=>Actions.history()}
              activeOpacity={0.8}
              style={{
                marginHorizontal:18,
                borderBottomColor:'grey',
                borderBottomWidth:1,
                paddingVertical:15,
              }}
              >
                <View style={{flexDirection:'row'}} >
                  <View style={{flex:0.25}} >
                    <Icon name="history" size={28} style={{marginTop:2,marginHorizontal:6, color:'white', backgroundColor:GLOBAL.COLOR.LIGHTGREEN, padding:5, borderRadius:5,}} />
                  </View>

                  <View style={{flex:1}} >
                    <Text style={{fontSize:25, marginTop:5, marginLeft:15,}} >History</Text>
                  </View>

                  <View style={{flex:0.3}} >
                  <Icon name="chevron-right" size={28} style={{marginTop:2,color:'grey', padding:5, borderRadius:5,}} />
                  </View>
                </View>
              </TouchableOpacity>
            

              <TouchableOpacity
              activeOpacity={0.8}
              onPress={()=>Actions.Login({type:'reset'})}
              style={{
                marginHorizontal:18,
                borderBottomColor:'grey',
                borderBottomWidth:1,
                paddingVertical:15,
              }}
              >
                <View style={{flexDirection:'row'}} >
                  <View style={{flex:0.25}} >
                    <Icon name="key-arrow-right" size={28} style={{marginTop:2,marginHorizontal:6, color:'white', backgroundColor:'red', padding:5, borderRadius:5,}} />
                  </View>

                  <View style={{flex:1}} >
                    <Text style={{fontSize:25, marginTop:5, marginLeft:15,color:'red', fontWeight:'bold'}} >Sign Out</Text>
                  </View>

                  <View style={{flex:0.3}} >
                  <Icon name="chevron-right" size={28} style={{marginTop:2,color:'grey', padding:5, borderRadius:5,}} />
                  </View>
                </View>
              </TouchableOpacity>
            
            </View>

            {/* Buku Terakhir Di Baca */}
            <Text style={{fontSize:18, color:'grey', marginTop:25, marginLeft:15}} >Buku terakhir dibaca </Text>

            <LatestBook 
            title="The Satanic Bible"
            date="29 juni 2021"
            />

            {/* COPYRIGHT SEMERBAK */}

            <View>
              <View
              style={{
                height: 120,
                marginTop:25,
                alignItems:'center',
              }}
              >
                <View>
                  <View style={{flexDirection:'row', marginTop:30}} >
                    <Icon name="death-star" size={25} style={{marginTop:2,marginHorizontal:6, color:'grey'}} />
                    <Text style={{fontSize:25, color:'grey'}} >SEMERBAK</Text>
                  </View>
                </View>

                <Text style={{fontSize:12, color:'grey', marginTop:6}} >Copyright <Icon name="copyright" size={16} style={{marginTop:5}} /> 2021 SEMERBAK. All Right Reserved </Text>
              
              </View>
              
            </View>
            
            <Modal
            animationType="slide"
            visible={editVisible}
            onRequestClose={()=>seteditVisible(false)}
            >
              <ScrollView>
                <View
                style={{
                  width: WIDTH,
                  alignItems:'center',
                  backgroundColor:'white',
                  paddingVertical:20,
                  marginBottom:20,
                }}
                >
                <View style={{flexDirection:'row',  marginRight: -200, }} >
                    
                    {
                      edit && 

                      <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={()=> setedit(false)}
                      style={{
                        backgroundColor: 'red',
                        paddingHorizontal: 4,
                        paddingTop:4,
                        borderRadius: 10,
                        left:0,

                      }}
                      >
                        <Icon name="close" size={22} style={{color: 'white'}} />
                      </TouchableOpacity>
                      }
                    <TouchableOpacity 
                    activeOpacity={0.8} 
                    onPress={()=>updatedata()}
                    style={{
                    
                    }}
                    >
                      <View style={{flexDirection: 'row', backgroundColor: GLOBAL.COLOR.DARKBLUE, paddingHorizontal:15, paddingVertical: 3, borderRadius:5,}} >
                        
                        <Text style={{fontSize:22,color:'white',fontWeight:'bold'}} > {edit? "SAVE" : "EDIT"} </Text>

                        {
                          edit? 
                          <Icon name="content-save" size={22} style={{color:'white',marginTop:2}} /> 
                          :
                          <Icon name="lead-pencil" size={22} style={{color:'white',marginTop:2}} /> 
                        }
                        
                      </View>
                    </TouchableOpacity>

                  </View>

                  <View style={{marginVertical:15,}} >
                    <View style={{flexDirection:'row'}} >
                        
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(0)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-king" size={35}  style={{color: (cacheprofile==0)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(1)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-queen" size={35} style={{color: (cacheprofile==1)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(2)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-pawn" size={35} style={{color: (cacheprofile==2)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(3)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-bishop" size={35} style={{color: (cacheprofile==3)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        
                    </View>

                    <View style={{flexDirection:'row'}} >
                        
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(4)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-knight" size={35} style={{color: (cacheprofile==4)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(5)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="chess-rook" size={35} style={{color: (cacheprofile==5)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(6)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="horseshoe" size={35} style={{color: (cacheprofile==6)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                        onPress={()=>{
                          if(edit) setcacheprofile(7)
                        }}
                        style={{
                          paddingHorizontal:15,
                          paddingVertical:10,
                        }} >
                          <Icon name="campfire" size={35} style={{color: (cacheprofile==7)? GLOBAL.COLOR.PURPLE: 'black'}} />
                        </TouchableOpacity>
                        
                    </View>
                  </View>

                  <TouchableOpacity
                  onPress={()=>seteditVisible(false)}
                    style={{
                      position:'absolute',
                      left:20,
                      top:10,
                    }}
                    >
                      <Icon name="chevron-down" size={35} />
                    </TouchableOpacity>

                  {/* EMAIL */}
                  <View 
                  style={{
                    marginVertical:10,
                    width: WIDTH-35,
                    height:70, 
                    flexDirection: 'row',
                    borderBottomWidth:3,
                    borderBottomColor: GLOBAL.COLOR.PURPLE,
                  }}
                  >

                    <View 
                    style={{
                      flex:0.3,
                      alignItems:'center',
                      paddingVertical: 10,
                    }}
                    >
                      <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
                        <Icon name="email" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
                      </View>
                    
                    </View>

                    <View
                    style={{
                      flex:1,
                      paddingLeft: 10,
                    }}
                    >
                      <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Email</Text>
                      <Text
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                      style={{
                        marginTop:8,
                        fontSize:18, 
                        color:'grey'
                      }}
                      onPress={()=>notEditable("email")}
                      >
                        {email}
                      </Text>
                    </View>

                  </View>

                  {/* USERNAME */}
                  <View 
                  style={{
                    marginVertical:10,
                    width: WIDTH-35,
                    height:70, 
                    flexDirection: 'row',
                    borderBottomWidth:3,
                    borderBottomColor: GLOBAL.COLOR.PURPLE,
                  }}
                  >

                    <View 
                    style={{
                      flex:0.3,
                      alignItems:'center',
                      paddingVertical: 10,
                    }}
                    >
                      <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
                        <Icon name="account" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
                      </View>
                    </View>

                    <View
                    style={{
                      flex:1,
                      paddingLeft: 10,
                    }}
                    >
                      <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Username</Text>
                      <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={()=>notEditable("username")}
                      >
                        <TextInput 
                        editable={false}
                        color={"grey"}
                        value={username}
                        style={{
                          fontSize: 18,
                          marginTop:-8,
                        }}
                        />
                      </TouchableOpacity>
                    </View>

                  </View>
                  
                  {/* FULL NAME */}
                  <View 
                  style={{
                    marginVertical:10,
                    width: WIDTH-35,
                    height:70, 
                    flexDirection: 'row',
                    borderBottomWidth:3,
                    borderBottomColor: GLOBAL.COLOR.PURPLE,
                  }}
                  >

                    <View 
                    style={{
                      flex:0.3,
                      alignItems:'center',
                      paddingVertical: 10,
                    }}
                    >
                      <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
                        <Icon name="account-arrow-right" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
                      </View>
                    
                    </View>

                    <View
                    style={{
                      flex:1,
                      paddingLeft: 10,
                    }}
                    >
                      <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Nama Lengkap</Text>
                      <TextInput 
                      editable={edit}
                      color={edit? "black": "grey"}
                      value={fullname}
                      onChangeText={onChangeFullName}
                      style={{
                        fontSize: 18,
                        marginTop:-8,
                      }}
                      />
                    </View>

                  </View>
                  
                  {/* NO Handphone */}
                  <View 
                  style={{
                    marginVertical:10,
                    width: WIDTH-35,
                    height:70, 
                    flexDirection: 'row',
                    borderBottomWidth:3,
                    borderBottomColor: GLOBAL.COLOR.PURPLE,
                  }}
                  >

                    <View 
                    style={{
                      flex:0.3,
                      alignItems:'center',
                      paddingVertical: 10,
                    }}
                    >
                      <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
                        <Icon name="cellphone-basic" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
                      </View>
                    
                    </View>

                    <View
                    style={{
                      flex:1,
                      paddingLeft: 10,
                    }}
                    >
                      <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Nomor Handphone</Text>
                      <TextInput 
                      editable={edit}
                      color={edit? "black": "grey"}
                      value={nohandphone}
                      onChangeText={onChangeNoHandphone}
                      keyboardType="numeric"
                      style={{
                        fontSize: 18,
                        marginTop:-8,
                      }}
                      />
                    </View>

                  </View>
            
                </View>

              </ScrollView>
            </Modal>
              
          </View>
        }
          
        {
          loadingupdate && 
          ToastAndroid.showWithGravity(
            "Menyimpan.....",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
        }
        {
          loading &&
          <Text style={{alignSelf:'center', fontSize:45, marginTop: HEIGHT/2-50, fontWeight:'bold', color:'purple'}} >Bentar....</Text> 
        }  


        </ScrollView>
      </NativeBaseProvider>
    );
}


// {/* <ScrollView>
//         { !loading &&
        
//           <View style={{alignItems: 'center'}} >
            

//           {/* Header badge VIEW */}
//           <View style={{ height:260, width: WIDTH}} >
//               <ImageBackground source={profilHeaderBackground} resizeMode="cover" style={{flex:1, alignItems: 'center', }} >
              
              
//                   <View  style={{alignItems:'center'}} >
//                       <View
//                       style={{
//                           width:100,
//                           height: 100,
//                           marginTop: 50,
                          
//                       }}
//                       >
//                           <Image 
//                           source={iconPubg}
//                           style={{
//                               flex:1,
//                               width: null,
//                               height: null,
//                               resizeMode: 'cover',
//                               borderRadius: 35,
//                               borderColor: 'white',
//                               borderWidth: 4,
//                           }}
//                           />
                          

//                       </View>

//                       <View style={{alignItems:'center', marginTop:10}} >
//                           <Text 
//                           style={{
//                               color: 'white',
//                               fontWeight: 'bold',
//                               fontSize: 23,
//                               marginBottom: 5,
//                           }} 
//                           >{fullname}</Text>

//                           {showBadge(point)}
                          
//                       </View>

//                   </View>
//               </ImageBackground>

//           </View>

//           {/* PENCAPAIAN */}
//           <View style={{ marginTop:25, width: WIDTH-15, height: 100, backgroundColor: 'white', overflow: 'hidden', elevation:8, shadowColor: 'black', marginBottom:20, alignItems:'center', flexDirection: 'row', borderRadius: 5,borderRightColor: GLOBAL.COLOR.PURPLE,borderRightWidth: 4,}} >


//                   <View style={{flex: 1, flexDirection: 'row'}} >
//                       <View 
//                       style={{
//                           backgroundColor: GLOBAL.COLOR.DARKBLUE,
//                           flex:0.55,
//                           paddingVertical: 20,
//                           alignItems: 'center',
                          
//                       }}
//                       >
//                           <Icon name="circle-multiple" size={45} style={{color: 'gold'}} />
//                           <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{color: 'white', fontWeight: 'bold', fontSize: 25}} > POIN </Text>
//                       </View>
                      
//                       <View 
//                       style={{
                          
//                           alignItems: 'center',
//                           marginLeft: 10,
                          
//                       }}
//                       >
//                           <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{fontWeight: 'bold', fontSize: 50,marginLeft:10, marginTop:25,}} >{point}</Text>
                          
                          
//                       </View>
                      
                      
//                   </View>


//               </View>

//           {/* EDIT PROFILE */}

//           <View
//           style={{
//             width: WIDTH,
//             alignItems:'center',
//             backgroundColor:'white',
//             elevation:5,
//             paddingVertical:20,
//             marginBottom:20,
//           }}
//           >
//             <View style={{flexDirection:'row',  marginRight: -200, }} >
//               {
//                 edit && 
//                 <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={()=> setedit(false)}
//                 style={{
//                   backgroundColor: 'red',
//                   paddingHorizontal: 4,
//                   paddingTop:4,
//                   borderRadius: 10,
//                   left:0,

//                 }}
//                 >
//                   <Icon name="close" size={22} style={{color: 'white'}} />
//                 </TouchableOpacity>
//                 }
//               <TouchableOpacity 
//               activeOpacity={0.8} 
//               onPress={()=>updatedata()}
//               style={{
               
//               }}
//               >
//                 <View style={{flexDirection: 'row', backgroundColor: GLOBAL.COLOR.DARKBLUE, paddingHorizontal:15, paddingVertical: 3, borderRadius:5,}} >
                  
//                   <Text style={{fontSize:22,color:'white',fontWeight:'bold'}} > {edit? "SAVE" : "EDIT"} </Text>

//                   {
//                     edit? 
//                     <Icon name="content-save" size={22} style={{color:'white',marginTop:2}} /> 
//                     :
//                     <Icon name="lead-pencil" size={22} style={{color:'white',marginTop:2}} /> 
//                   }
                  
//                 </View>
//               </TouchableOpacity>
//             </View>


//             {/* EMAIL */}
//             <View 
//             style={{
//               marginVertical:10,
//               width: WIDTH-35,
//               height:70, 
//               flexDirection: 'row',
//               borderBottomWidth:3,
//               borderBottomColor: GLOBAL.COLOR.PURPLE,
//             }}
//             >

//               <View 
//               style={{
//                 flex:0.3,
//                 alignItems:'center',
//                 paddingVertical: 10,
//               }}
//               >
//                 <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
//                   <Icon name="cellphone-basic" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
//                 </View>
              
//               </View>

//               <View
//               style={{
//                 flex:1,
//                 paddingLeft: 10,
//               }}
//               >
//                 <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Email</Text>
//                 <Text
//                 adjustsFontSizeToFit={true}
//                 numberOfLines={1}
//                 style={{
//                   marginTop:8,
//                   fontSize:18, 
//                   color:'grey'
//                 }}
//                 onPress={()=>notEditable("email")}
//                 >
//                   {email}
//                 </Text>
//               </View>

//             </View>
            


//             {/* USERNAME */}
//             <View 
//             style={{
//               marginVertical:10,
//               width: WIDTH-35,
//               height:70, 
//               flexDirection: 'row',
//               borderBottomWidth:3,
//               borderBottomColor: GLOBAL.COLOR.PURPLE,
//             }}
//             >

//               <View 
//               style={{
//                 flex:0.3,
//                 alignItems:'center',
//                 paddingVertical: 10,
//               }}
//               >
//                 <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
//                   <Icon name="account" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
//                 </View>
//               </View>

//               <View
//               style={{
//                 flex:1,
//                 paddingLeft: 10,
//               }}
//               >
//                 <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Username</Text>
//                 <TouchableOpacity
//                 activeOpacity={0.6}
//                 onPress={()=>notEditable("username")}
//                 >
//                   <TextInput 
//                   editable={false}
//                   color={"grey"}
//                   value={username}
//                   style={{
//                     fontSize: 18,
//                     marginTop:-8,
//                   }}
//                   />
//                 </TouchableOpacity>
//               </View>

//             </View>
            

//             {/* FULL NAME */}
//             <View 
//             style={{
//               marginVertical:10,
//               width: WIDTH-35,
//               height:70, 
//               flexDirection: 'row',
//               borderBottomWidth:3,
//               borderBottomColor: GLOBAL.COLOR.PURPLE,
//             }}
//             >

//               <View 
//               style={{
//                 flex:0.3,
//                 alignItems:'center',
//                 paddingVertical: 10,
//               }}
//               >
//                 <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
//                   <Icon name="account-arrow-right" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
//                 </View>
              
//               </View>

//               <View
//               style={{
//                 flex:1,
//                 paddingLeft: 10,
//               }}
//               >
//                 <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Nama Lengkap</Text>
//                 <TextInput 
//                 editable={edit}
//                 color={edit? "black": "grey"}
//                 value={fullname}
//                 onChangeText={onChangeFullName}
//                 style={{
//                   fontSize: 18,
//                   marginTop:-8,
//                 }}
//                 />
//               </View>

//             </View>
            

//             {/* NO Handphone */}
//             <View 
//             style={{
//               marginVertical:10,
//               width: WIDTH-35,
//               height:70, 
//               flexDirection: 'row',
//               borderBottomWidth:3,
//               borderBottomColor: GLOBAL.COLOR.PURPLE,
//             }}
//             >

//               <View 
//               style={{
//                 flex:0.3,
//                 alignItems:'center',
//                 paddingVertical: 10,
//               }}
//               >
//                 <View style={{backgroundColor:'white', paddingBottom: 7, paddingTop:3, paddingHorizontal:5, borderRadius: 100,elevation:5, borderWidth:0.5, borderColor:'grey', marginTop:-5}} >
//                   <Icon name="cellphone-basic" size={29} style={{color: GLOBAL.COLOR.BLUE, }} />
//                 </View>
              
//               </View>

//               <View
//               style={{
//                 flex:1,
//                 paddingLeft: 10,
//               }}
//               >
//                 <Text style={{fontSize:14, color:GLOBAL.COLOR.DARKPURPLE, marginTop:5, marginLeft:3}} >Nomor Handphone</Text>
//                 <TextInput 
//                 editable={edit}
//                 color={edit? "black": "grey"}
//                 value={nohandphone}
//                 onChangeText={onChangeNoHandphone}
//                 keyboardType="numeric"
//                 style={{
//                   fontSize: 18,
//                   marginTop:-8,
//                 }}
//                 />
//               </View>

//             </View>
            

            

//           </View>

              
//         </View>
//         }    
//         {
//           loadingupdate && 
//           ToastAndroid.showWithGravity(
//             "Menyimpan.....",
//             ToastAndroid.SHORT,
//             ToastAndroid.CENTER,
//           )
//         }
//         {
//           loading &&
//           <Text style={{alignSelf:'center', fontSize:45, marginTop: HEIGHT/2-50, fontWeight:'bold', color:'purple'}} >Bentar....</Text> 
//         }  
//         </ScrollView> */}
