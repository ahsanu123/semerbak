import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Spinner} from 'native-base';
import {Actions, ActionConst } from 'react-native-router-flux';
import axios from 'axios';

import GLOBAL from '../Global/global';

export default class SearchConst extends React.Component{

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
            <View style={{flexDirection:'row', height:85, marginVertical:10, borderBottomColor:'grey', borderBottomWidth:1}} >
                <View style={{flex:0.3, marginHorizontal:4, marginVertical:2}} >
                    {
                        this.state.loading && 
                        <Spinner size={40} style={{marginTop:20}} />
                    }
                    <Image
                    source={{uri:this.props.cover}}
                    style={{
                        flex:1,
                        width: null,
                        height: null,
                    }}
                    onLoad={()=>this.setState({loading:false})}
                    />
                </View>

                <View style={{flex:1, paddingHorizontal:5,}} >
                    <TouchableOpacity
                    onPress={()=>{
                        Actions.BookView({ onBack: ()=> console.log("Back to before screen") ,urel:this.props.bookuri, title: this.props.title});
                        this.addHistory();
                    }}
                    >
                        <Text style={{fontSize:18, marginTop:5}} numberOfLines={1} ellipsizeMode="middle" >{this.props.title}</Text>
                        <Text style={{fontSize:13, marginTop:5}} numberOfLines={1} ellipsizeMode="tail" >{this.props.date}</Text>
                        <Text style={{fontSize:13, marginTop:5, }} numberOfLines={1} ellipsizeMode="tail" >kategory: {this.props.genre}</Text>
                    </TouchableOpacity>

                </View>

                <View style={{flex:0.15, alignItems:'center'}} >
                    <TouchableOpacity
                    onPress={()=>this.changeBukuFavorit()}
                    >
                        <Icon name="heart" size={25} style={{marginTop:28, color: this.state.favorit? 'red':'grey'}} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}