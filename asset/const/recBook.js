import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Spinner} from 'native-base';
import {Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import GLOBAL from '../Global/global';

export default class RecBook extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            favorit: (this.props.favorit==="1"),
        };
      }

    changeBukuFavorit(){

        this.setState({favorit: !this.state.favorit});
        
        const status = () =>{
            if(this.state.favorit==true){
                return "0";
            }
            else{
                return "1";
            }
        }
        // console.log(status());
        const body = new FormData();
        body.append('command', 'changebukufavorit');
        body.append('userid', GLOBAL.USER.USERID);
        body.append('idbuku', this.props.idbuku);
        body.append('condition',status());

        // console.log("STATE: " + status());
        axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            console.log(response.data.bukufavoritstatus);
            if(response.data.bukufavoritstatus == 2){
                ToastAndroid.showWithGravity(
                    "Remove Favorit",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    );
            }
            if(response.data.bukufavoritstatus == 1){
                ToastAndroid.showWithGravity(
                    "Favorit",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    );
            }
        },
        error => {
            console.log(error);
        });
        
    }
    
    addHistory(){
        const body = new FormData();
        body.append('command', 'addhistory');
        body.append('userid', GLOBAL.USER.USERID);
        body.append('idbuku', this.props.idbuku);

        // console.log("STATE: " + status());
        axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            console.log(response.data);
        },
        error => {
            console.log(error);
        });
        
    }
    
  
    render(){
        
        return(
            <View
             
             style={{
                 borderWidth:1,
                 borderColor:'grey',
                 marginRight:5,
                 marginLeft:5,
                 borderRadius:10,
                 marginVertical:20,
                 backgroundColor:'white',
             }}
            >
                <View style={{
                    width:250, 
                    height:380, 
                    backgroundColor:'white',
                    marginVertical:10,
                    marginHorizontal: 10,
                    marginBottom:4,
                    borderRadius:5,
                    }}>
                        
                        <Image 
                        source={{uri: this.props.urel }}
                        onLoad={() => this.setState({
                            loading: false,
                        }) } 
                        style={{
                        flex:1,
                            width:null,
                            height:null,
                            resizeMode:'cover',
                            borderRadius: 10,
                        }}
                        />
                        <Text
                        style={{
                            position: 'absolute',
                            right:0,
                            marginRight:5,
                            backgroundColor: GLOBAL.COLOR.DARKPURPLE,
                            color:'white',
                            paddingHorizontal: 5,
                            paddingVertical: 3,
                            marginVertical: 310,
                            borderRadius: 5,
                        }}
                        ><Icon name="calendar" size={17}/> {this.props.years}  </Text>
                        <Text
                        style={{
                            position: 'absolute',
                            top:0,
                            right:0,
                            marginRight:5,
                            backgroundColor: GLOBAL.COLOR.DARKPURPLE,
                            color:'white',
                            fontSize:18,
                            paddingHorizontal:10,
                            paddingBottom:4,
                            marginTop:10,
                            borderRadius:10,
                            
                        }}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}
                        > {this.props.genre}  </Text>

                        <TouchableOpacity
                        activeOpacity={0.6}
                        style={{
                            position:'absolute',
                            top:5,
                            left:5,
                            paddingTop:3,
                            paddingHorizontal:2,
                            borderRadius:50,
                            backgroundColor:'black',
                        }}
                        onPress={()=>this.changeBukuFavorit()}
                        >
                            <Text
                            style={{
                                color: this.state.favorit? 'red': 'white',
                            }}
                            ><Icon name="heart" size={35} /></Text>
                        </TouchableOpacity>

                        
                        {
                            this.state.loading ? 
                            <Spinner  color="#c61f73" position="absolute" px={125} py={150} size={100} />  : 
                            null
                        }
                        <View style={{paddingHorizontal:3, paddingVertical:5,flexDirection:'row', justifyContent:'space-between'}} >
                            <View style={{width:120}} >
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ padding:3, fontSize:17, fontWeight:'bold', marginTop:2}}>{ this.props.title }</Text>
                            </View>
                            <TouchableOpacity
                                
                                onPress={ () => {
                                    Actions.BookView({ onBack: ()=> console.log("Back to before screen") ,urel:this.props.bookuri, title: this.props.title});
                                    this.addHistory();
                                } }
                                activeOpacity={0.6}
                                style={{
                                    width:100,
                                    height:30,
                                    backgroundColor: GLOBAL.COLOR.PURPLE,
                                    borderRadius:10,
                                }}
                                
                                >
                                    <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row'}} >
                                        <Text style={{ paddingLeft:15,fontSize:16, fontWeight:'bold', color:'white'}} >BACA</Text>
                                        <Icon name="arrow-right" size={25} color="white" style={{
                                            paddingRight:8,
                                            paddingTop:2
                                        }} />
                                    </View>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        );
    }
}

// {
//     this.state.loading ? 
//     <Spinner  /> 
//     : 
//     <Image 
//     source={{uri: this.props.urel }}
//     onLoad={this.setState({
//         loading: false,
//     }) } 
//     style={{
//         flex:1,
//         width:null,
//         height:null,
//         resizeMode:'cover'
//     }}
//     />
// }