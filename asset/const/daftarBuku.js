import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ToastAndroid} from 'react-native';
import { NativeBaseProvider, HStack, VStack, Center } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Spinner} from 'native-base';
import axios from 'axios';


import GLOBAL from '../Global/global';
import { Actions } from 'react-native-router-flux';
import { width } from 'styled-system';

export default class DaftarBuku extends React.Component{

    constructor(props){
        super(props);
        this.state={
            loading: true,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
            landscape: false,
            favorit: (this.props.favorit==="1"),

        };
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
   

    render(){
        return(
        
            <View>
                <View 
                onLayout={()=>{
                    // this.setState({width: Dimensions.get('window').width,height: Dimensions.get('window').height});
                    if(Dimensions.get('window').height > Dimensions.get('window').width){
                        this.setState({landscape:false});
                    }
                    else {
                        this.setState({landscape:true});
                    }
                }}
                style={{
                    borderRadius:10,
                    elevation:3,
                    marginBottom:6,
                    marginHorizontal:7,
                    paddingVertical:10,
                    backgroundColor:'white',
                    borderWidth:1,
                    borderColor:'grey',
                }}
                >
                    <Text style={{ marginLeft: 10, marginTop:8}} numberOfLines={1} ellipsizeMode='tail'>
                        {/* <Icon name="pencil-outline" size={22} style={{color:'black',marginLeft:5, marginTop:8}} />  */}
                        <Text  style={{color:'black',fontSize:22, fontWeight:'bold', marginTop:8}}> {this.props.title} </Text>
                    </Text>
                    <View>
                        <View
                        style={{
                            width:120,
                            marginLeft:12,
                        }}
                        >
                            <Text 
                            adjustsFontSizeToFit={true}
                            numberOfLines={1}
                            style={{
                                borderRadius:10,
                                backgroundColor:'grey',
                                color:'white',
                                paddingLeft:10,
                                fontSize:13,
                                fontWeight:'bold',
                                paddingVertical:4,
                            }}
                             >{this.props.genre}</Text>
                        </View>
                        
                    </View>

                    <View
                        style={{
                            flexDirection:'row',
                            marginLeft: 15, 
                            marginTop:8,
                        }}
                    >
                        <Text style={{fontSize:13, marginBottom:10,}} >
                            <Icon name="calendar" size={16} style={{color:'black',marginLeft:5, }} /> 
                            <Text >{this.props.year}</Text>
                        </Text>
                    </View>
                    <HStack>
                        <View style={{
                        width:140, 
                        height:240, 
                        backgroundColor:'white',
                        marginLeft:10,
                        marginBottom:4,
                        paddingBottom: 5,
                        borderColor: 'grey',
                        borderWidth: 1,
                        }}>
                            <Image 
                            source={{uri: this.props.urel }} 
                            style={{
                                flex:1,
                                width:null,
                                height:null,
                                resizeMode:'cover',
                            }}
                            onLoad={() => this.setState({
                                loading: false
                            })}
                            />
                            {
                                this.state.loading ? 
                                <Spinner  color="#c61f73" position="absolute" px={60} py={95} size={50} />  
                                : 
                                null
                            }

                        </View>
                        
                        <VStack 
                        
                        width={this.state.landscape? 475:195}
                        height={190}
                        p={2}
                        >
                            
                            <Text  style={{textAlign: 'justify' , paddingVertical:5}} numberOfLines={6} ellipsizeMode='tail'>
                                <Icon name="semantic-web" size={22} style={{color:'black',marginLeft:5, marginTop:8}} /> 
                                <Text style={{color:'black',textAlign:'center',width:100,fontSize:14, marginTop:8}}> 
                                    {this.props.description}                                
                                </Text>
                            </Text>

                            <View 
                             style={{
                                 alignItems:'flex-end',
                             }}
                            >
                                <View>
                                    <TouchableOpacity
                                    onPress={()=> {
                                        Actions.BookView({urel:this.props.bookuri, title: this.props.title});
                                        this.addHistory();
                                    }}
                                    activeOpacity={0.6}
                                    style={{
                                        paddingVertical:5,
                                        right:0,
                                        marginRight:10,
                                        width:100,
                                        height:30,
                                        backgroundColor: GLOBAL.COLOR.PURPLE,
                                        borderRadius:10,
                                        
                                    }}
                                    >
                                        <View style={{alignItems:'center'}} >
                                            <Text style={{fontSize:16, fontWeight:'bold', color:'white'}} >BACA</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </VStack>


                    </HStack>
                    {
                        (this.state.favorit)?
                        <TouchableOpacity 
                        style={{position:'absolute', right:20,top:20, }} 
                        onPress={()=>this.changeBukuFavorit()} 
                        >
                            <Icon name="heart" size={30} style={{color:'red'}} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity 
                        style={{position:'absolute', right:20,top:20, }}
                        onPress={()=>this.changeBukuFavorit()} 
                        >
                            <Icon name="heart-outline" size={30} style={{color:'grey'}} />
                        </TouchableOpacity>
                    }
                    
                </View>
                
            </View>
        
        );
    }
}
