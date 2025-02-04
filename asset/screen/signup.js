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
// import{ NavigationContainer, CommonActions} from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import {Actions} from 'react-native-router-flux';
import GLOBAL from '../Global/global';
import axios from 'axios';
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



export default function(){
    const [email, onChangeEmail] = React.useState('');
    const [namalengkap, onChangeNamaLengkap]= React.useState('');
    const [username, onChangeUsername] = React.useState('');
    const [handphone, onChangeHandphone] = React.useState('');
    const [pass, onChangePass] =  React.useState('');
    const [loginloading, setloginloading] = React.useState(false);

    const signup = async (email, namalengkap, username, handphone, pass) => {
        //TODO: 
        //1. cek apakah username telah digunakan
        //2. jika username tesedia masukan data ke database
        //3. kembalikan user ke login page
        var isfull = (email.length >0) && (username.length > 0) && (handphone.length > 0) && (pass.length > 0);
        
        
        if(isfull){
           
            var body = new FormData();
            body.append('command', 'signup');
            body.append('signupnamalengkap', namalengkap);
            body.append('signupemail',email);
            body.append('signupusername',username.toLowerCase());
            body.append('signuppassword',pass);
            body.append('signupnohandphone',handphone);

            setloginloading(true);

            const data = await axios({
                method: 'post',
                url: 'http://semerbak-swag.com/api/',
                headers: {"Content-Type" : "multipart/form-data"},
                data: body,
            })
            .then(response => {

                setloginloading(false);
                return response.data.signupdata;
            },
            error => {
                console.log(error);
            });

            //koneksi error
            if(data.signupsucces == 0){
                alert("Koneksi error coba beberapa saat lagi!!");
            }

            //signup berhasil data telah masuk ke database
            else if(data.signupsucces == 1){
                ToastAndroid.showWithGravity(
                    "Terimakasih telah mendaftar, Silahkan Login",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
                Actions.Login({type: 'reset'});
            }

            //username telah digunakan, cari username yang lainnya
            else if(data.signupsucces == 2){
                ToastAndroid.showWithGravity(
                    "Username: " + username + " Telah digunakan, coba username yang lain!!",
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                );
            }


             


            // ToastAndroid.showWithGravity(
            //     "Terima Kasih Telah Mendaftar, Silahkan Login",
            //     ToastAndroid.LONG,
            //     ToastAndroid.BOTTOM,
            // );
        }
        else {
            ToastAndroid.showWithGravity(
                "MOHON ISI SEMUA DATA DIRI",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
            );
            
        }
        
      };

    return(
        <View style={{flex:1}}>
            <ImageBackground source={loginBg} resizeMode="cover" style={styles.image}>

                <NativeBaseProvider>
                    <View style={{flex:2, paddingTop: 1}}/> 
                    <LinearGradient colors={["#00000000", "#131723", "#090F1B"]} style={{flex:3}}>
                        <Center>
                            <Text 
                            fontSize={deviceWidth*0.1} 
                            style={{
                                color:'white', 
                                fontWeight:'bold',
                                marginTop:-120,
                                marginBottom:50,
                                }} 
                                >Daftar Gratis Selamanya</Text>
                            
                           <TextInput 
                            placeholder="Email"
                            style={styles.input}
                            value={email}
                            onChangeText={onChangeEmail}
                            />

                            <TextInput 
                            placeholder="Nama Lengkap"
                            style={styles.input}
                            value={namalengkap}
                            onChangeText={onChangeNamaLengkap}
                            />

                            <TextInput 
                            placeholder="Username"
                            style={styles.input}
                            value={username}
                            onChangeText={onChangeUsername}
                            />


                            <TextInput 
                            placeholder="Nomer Handphone"
                            style={styles.input}
                            value={handphone}
                            onChangeText={onChangeHandphone}
                            keyboardType='numeric'
                            />

                            <TextInput 
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry={true}
                            value = {pass}
                            onChangeText={onChangePass}
                            />

                            <Button
                             width={280}
                             colorScheme="secondary"
                             onPress={() => signup(email, namalengkap, username, handphone, pass)}
                             mt={6}
                            >SIGN UP</Button>

                            {
                                loginloading && <Spinner color="#00ccff" position="absolute" size={60} />
                            }

                        </Center>
                    </LinearGradient>
                </NativeBaseProvider>

            </ImageBackground>
        </View>
    
    );
}

