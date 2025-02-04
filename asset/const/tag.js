import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity } from "react-native";
import GLOBAL from "../Global/global";

export default class tag extends React.Component {
    constructor(props){
        super(props);
        this.state={
            active: false,
            key:0,
        }
    }
    
    // changeState(){
    //     GLOBAL.STATE.GENRE = this.props.genre;
    //     if(this.props.genre == GLOBAL.STATE.GENRE){
    //         this.setState({active:true});
    //         // console.log(GLOBAL.STATE.GENRE);
    //     }
    //     else{
    //         this.setState({active:false});
    //     }
    // }

    render(){
        return(
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={this.props.onPress}
            style={{
                marginTop:25,
            }}
            >
                <View>
                    <Text style={{
                        fontSize:20,
                        paddingHorizontal: 20,
                        borderWidth:1,
                        borderColor: 'grey' ,
                        backgroundColor: this.props.backgrounditem,
                        color: this.props.textcolor,
                        marginHorizontal:5,
                        paddingVertical:5,
                        borderRadius:10,
                    }} 
                    >{this.props.genre}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}