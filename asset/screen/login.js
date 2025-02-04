import React, { useState, useEffect }from 'react';
import { ToastAndroid,Dimensions, ImageBackground, ScrollView, StyleSheet,TextInput,TouchableOpacity,View} from 'react-native';
import {
  NativeBaseProvider,
  Box, 
  Text, 
  HStack,
  VStack,
  Pressable,
  AspectRatio,
  Container,
  Center,
  Avatar,
  Input,
  Button,
  Spinner,
}from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
// import{ NavigationContainer, CommonActions} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {Actions, ActionConst } from 'react-native-router-flux';
import GLOBAL from '../Global/global';
//asset import 


const deviceWidth = Dimensions.get('window').width;
//Const asset section
const loginBg = require('../images/loginBg.jpg');
//const image = { uri: "https://reactjs.org/logo-og.png" };
//const section

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'green',
      },
      image: {
        flex: 1,
        justifyContent: "center"
      },
      input:{
        height:40,
        width:280,
        backgroundColor: "white",
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        fontSize: 15,
        borderColor: "pink",
        borderWidth: 2,
        
      },
      
  });

//function const section

function getlogindata(username, password){

    var body = new FormData();
    body.append('command', 'login');
    body.append('username', username);
    body.append('password', password);

    const promise = axios({
        method: 'post',
        url: 'https://semerbak.000webhostapp.com/connection.php',
        headers: { "Content-Type": "multipart/form-data" },
        data: body,
    })
    .then(response => {
        //console.log(response.data);  
        console.log(response.data.logindata);
        return response.data.logindata;
    },
    error => {
        //console.log("error: " + error);
        return error;
    });    
    
}

const showToastWithGravity = (username, pass) => {
    //TODO: 
    //1. buat fungsi untuk Fetch username/username dan password dari database
    //2. gunakan argumen username dan pass untuk mem-validasikan data dari database

    //apakah username dan password masih kosong
    var isfull = (username.length >0) && (pass.length > 0);
    var currenRegisteredUser = (username === "siah" && pass === "123") || (username === "Igo" && pass === "123") || (username === "Anton" && pass === "123");
    
    if(isfull){
        
        if(currenRegisteredUser){
            
            ToastAndroid.showWithGravity(
                "WELCOME " + login.loginsucces,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
        //     //jump to dashboard
        //     GLOBAL.USER.PEMBACA = username;
        //     Actions.Dashboard({type: 'reset'});
        }
        else{
            ToastAndroid.showWithGravity(
                "ANDA BELUM TERDAFTAR",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
            );
            
        }
    }
    else {
        ToastAndroid.showWithGravity(
            "USERNAME ATAU PASSWORD MASIH KOSONG",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
        );
        
    }
    
  };

export default function(){
    const [username, onChangeusername] = React.useState('');
    const [pass, onChangePass] =  React.useState('');
    const [loginsucces, setloginsucces] = React.useState('');
    const [loginloading, setloginloading] = React.useState(false);

    const login = async (username,pass) => {

        var body = new FormData();
        body.append('command', 'login');
        body.append('username', username.toLowerCase());
        body.append('password', pass);
        
        if(username==='' || pass === ''){
            alert("Tolong Isi username dan password terlebih dahulu!!");
        }
        else{
            setloginloading(true);

            const data = await axios({
                method: 'post',
                url: 'http://semerbak-swag.com/api/',
                headers: { "Content-Type": "multipart/form-data" },
                data: body,
            })
            .then(response => {
                //console.log(response.data);  
                
                console.log(response.data.logindata);
                setloginsucces(response.data.logindata.loginsucces);
                setloginloading(false);
                return response.data.logindata;
            },
            error => {
                //console.log("error: " + error);
                console.log(error);
            });  

            if(!loginloading){
                if(data.loginsucces == 1){
                    //alert("Username: " + username + " Sudah Terdaftar");
                    GLOBAL.USER.USERNAME = data.userfullname;
                    GLOBAL.USER.USERID = data.userid;
                    ToastAndroid.showWithGravity(
                        "HALO "+ username.toUpperCase(),
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM,
                    );
                    //Actions.Dashboard({type: 'jump'});
                    Actions.tabbar({type:'reset'});
                }
                else if(data.loginsucces == 2){
                    alert("password salah");
                }
                else{
                    alert("Username: " + username + " Belum Terdaftar silahkan daftar dulu!!");
                }

            }
        }
        
    }

    

    return(
        <View style={{flex:1}}>
            <ImageBackground source={loginBg} resizeMode="cover" style={styles.image}>

                <NativeBaseProvider>
                    <View style={{flex:2, paddingTop: 1}}/> 
                    <LinearGradient colors={["#00000000", "#131723", "#090F1B"]} style={{flex:3.5}}>
                        <Center>
                            <Text fontSize={deviceWidth*0.14} 
                            style={{
                                color:'white', 
                                fontWeight:'bold',
                                
                                }} 
                                >SEMERBAK</Text>
                            <Text fontSize={deviceWidth*0.045} style={{color:'white', marginBottom:20}}>Senang dan Gemar Membaca Buku</Text>
                            
                           <TextInput 
                            placeholder="username"
                            style={styles.input}
                            value={username}
                            onChangeText={onChangeusername}
                            />
                            <TextInput 
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry={true}
                            value = {pass}
                            onChangeText={onChangePass}
                            />
                            
                            <TouchableOpacity>
                                <Text fontSize={deviceWidth*0.04} 
                                style={{
                                    color:'#FFA733',
                                    marginTop: 10,
                                    marginBottom: 15,
                                }}
                                >
                                    Lupa Password?
                                </Text>
                            </TouchableOpacity>

                            <Button
                             width={280}
                             colorScheme="secondary"
                             onPress={() => login(username,pass)}
                            >LOGIN</Button>

                            <TouchableOpacity
                            activeOpacity={0.6}
                            onPress={()=>Actions.SignUp()}
                            >
                                <Text fontSize={deviceWidth*0.04} style={{color:'white', marginTop:5}}>
                                    Baru pertama kali?  
                                        <Text
                                        fontSize={deviceWidth*0.04} 
                                        style={{color:'#FFA733',marginTop: 40,marginBottom: 20,}}
                                        >
                                            {' '}Sign Up
                                        </Text>
                                    
                                </Text>
                            </TouchableOpacity>
                            {
                                loginloading && <Spinner  color="#00ccff" position="absolute"  size={60} />
                            }

                        </Center>
                    </LinearGradient>
                </NativeBaseProvider>

            </ImageBackground>
        </View>
    
    );
}

