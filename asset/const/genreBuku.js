import React from 'react';
import { View, Text, Image, TouchableOpacity} from 'react-native';
import { NativeBaseProvider, HStack, VStack, Center } from 'native-base';

export default class GenreBuku extends React.Component{
    render(){
        return(
            <TouchableOpacity
                activeOpacity={0.6}
            >
                <View 
                width={100}
                height={60}
                style={{
                    backgroundColor: this.props.bgColor,
                    marginVertical:10,
                    marginHorizontal: 10,
                    marginBottom:4,
                    borderRadius:5,
                }}
                >
                    <Center>
                        <Text style={{fontSize:25,color:this.props.textColor}}> {this.props.genre} </Text>
                        <Text style={{fontSize:15,color:this.props.textColor}}> {this.props.total} </Text>
                    </Center>
                </View>

            </TouchableOpacity>
        );
    }
}

