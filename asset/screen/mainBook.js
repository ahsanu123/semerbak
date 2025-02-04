import React, {useEffect} from 'react';
import {Animated,Dimensions,Text, View, ScrollView, Image, TouchableHighlight, TouchableOpacity, TextInput, Button, FlatList, SafeAreaView, SectionList, LogBox  } from 'react-native';
import {Actions, ActionConst } from 'react-native-router-flux';
import { NativeBaseProvider, HStack, VStack, Center, Spinner } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

import RecBook from '../const/recBook';
import DaftarBuku from '../const/daftarBuku';
import GenreBuku from '../const/genreBuku';
import Tag from '../const/tag';
import GLOBAL from '../Global/global';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const databuku = [];
const datagenre = [];
const bukuRandom = [];

export default function (){
    //Animation header section
    const scrollY = new Animated.Value(0);
    const headerHeight = scrollY.interpolate({
        inputRange: [0, 260],
        outputRange: [250, 60],
        extrapolate: 'clamp',
    });
    const headerContentMargin = scrollY.interpolate({
        inputRange: [0, 260],
        outputRange: [0, -190],
        extrapolate: 'clamp',
    });
    const scrollItemHeight = scrollY.interpolate({
        inputRange: [0,160],
        outputRange: [250, 340],
        extrapolate: 'clamp',
    });

    
    const [selectedGenre, setSelectedGenre] = React.useState("all");
    const [searchKeywoard, setSearchKeywoard] = React.useState('');
    

    // const [bukuRandom, setBukuRandom] = React.useState([]);
    const [loadingMainScreen, setLoadingMainScreen] = React.useState(true);
    const [loadingGenre, setloadingGenre] = React.useState(true);
    const [searchFocus, setSearchFocus] = React.useState(false);
    
    
    const getDataBuku = () =>{

        databuku.length=0;
        datagenre.length=0;
        bukuRandom.length = 0;

        var body= new FormData();
        body.append('command', 'getdaftarbuku');
        body.append('userid', GLOBAL.USER.USERID);
        setLoadingMainScreen(true);

        const data =  axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            //console.log(response.data.databuku[1].cover);
            //setcover(response.data.databuku[1].cover);

            // const bukuku = response.data.databuku;
            // setbuku([bukuku]);

            //const bukuku = response.data;
            //setbuku({bukuku});

            //console.log(buku);
            
            //console.log(databuku);
            // databuku.push(
            //     {
            //         id: "23",
            //         title: "kesatu123",
            //     }, 
            // );
            // console.log(response.data);
            
            
            response.data.forEach((item, index) => {
                // console.log(item);
                databuku.push(item);
            });
            // console.log(databuku);
            setLoadingMainScreen(false);
            

            
            // setLoadingMainScreen(false);
            //=============WORK==================//
                // const clone = [...response.data];
                // clone.forEach(element => {
                //     // console.log("PUSSED");
                //     // databuku.push(element);
                //     console.log(element);
                //     setbuku(arr => [...arr, element]);
                // });
                // //console.log(buku);
                // setLoadingMainScreen(false);
                // console.log("out");
            //=============WORK==================//

            // databuku.push(response.data[1]);
            //console.log(buku.length);

            //console.log(JSON.stringify(databuku,null,2));
            
            // databuku.unshift(response.data);
            // console.log(databuku);
            
            //console.log(databuku);
            //console.log(bukuku);
            
            

            return response.data;
        },
        error =>{
            console.log(error);
        });
        //console.log(data[1]);
        //databuku.push(data[1]);
        //console.log(databuku);
        //console.log(databuku);
        //console.log(data);
        
        return data;
    }

    const getDataGenre = () =>{
        var body= new FormData();
        body.append('command', 'getgenre');

        setloadingGenre(true);
        const data =  axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            // console.log(response.data);
            response.data.forEach((item) =>{
                // console.log(item);
                datagenre.push(item);
            });
            setloadingGenre(false);
            // console.log(datagenre);
        },
        error => {
            console.log(error);
        });
    }

    const getBukuRandom = () =>{
        var body = new FormData();
        body.append('command', 'getbukurandom');
        body.append('userid', GLOBAL.USER.USERID);

        const data = axios({
            method: 'post',
            url: 'http://semerbak-swag.com/api/',
            headers: { "Content-Type": "multipart/form-data" },
            data: body,
        })
        .then(response => {
            response.data.forEach(item => {
                console.log("TITLE: " + item.title);
                console.log("ID: " + item.id);
                console.log("FAVORIT: " + item.favorit);
                bukuRandom.push(item);
            });
        },
        error => {
            console.log(error);
        });
    }

    const Tagcomponent = ({item}) =>{
        const textColor = item.genre===selectedGenre? 'white': 'black';
        const backgroundItem = item.genre===selectedGenre? GLOBAL.COLOR.PURPLE : 'white';
        return(
            
            <Tag 
                genre ={item.genre}
                kunci = {item.key}
                onPress = {()=> {
                    setSelectedGenre(item.genre);
                }}
                textcolor={textColor}
                backgrounditem={backgroundItem}
                
            />
        );
    }

    const displayDaftarBuku = ({item}) =>{
        if(selectedGenre === "all"){
            return(
                <DaftarBuku
                title={item.title}
                urel={item.cover}
                year={item.date}
                description={item.description}
                bookuri={item.uri}
                genre={item.genre}
                idbuku={item.id}
                favorit={item.favorit}
                />
                
            );
        }

        else if(item.genre === selectedGenre){
            return(
                <DaftarBuku
                title={item.title}
                urel={item.cover}
                year={item.date}
                description={item.description}
                bookuri={item.uri}
                genre={item.genre}
                idbuku={item.id}
                favorit={item.favorit}
                />
                
            );
        }
    }

    

    useEffect(()=>{
        
        getBukuRandom();
        getDataGenre();
        getDataBuku();
        
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        
    },[]);

    return(

        <NativeBaseProvider>
            <View style={{ flex:1 }}>

                <ScrollView
                 onScroll={Animated.event(
                     [{
                         nativeEvent: {
                             contentOffset:{
                                 y: scrollY
                             }
                         }
                     }]
                     ,{useNativeDriver: false}
                 )}
                >
                    <Animated.View
                     style={{
                         marginTop: scrollItemHeight,
                     }}
                    >
                        
                        <SafeAreaView>
                           
                            <FlatList
                                horizontal={true}                         
                                keyExtractor={item => item.key}
                                data={datagenre}
                                renderItem={Tagcomponent}
                                showsHorizontalScrollIndicator={false}
                                extraData={selectedGenre}
                            />

                            {
                                !loadingMainScreen &&
                                <Text
                                style={{
                                    paddingLeft:15,
                                    paddingVertical:5,
                                    fontSize:22,
                                    fontWeight:'bold',
                                    marginTop:15,
                                    backgroundColor: '#c61f73',
                                    color:'white',

                                }}
                                >
                                    RECOMENDED
                                </Text>
                            }

                           <FlatList 
                                
                                horizontal={true}                         
                                keyExtractor={item => item.id}
                                data={bukuRandom}
                                renderItem={({item})=>(
                                    <RecBook
                                    urel ={item.cover}
                                    title={item.title}
                                    years={item.date}
                                    bookuri={item.uri}
                                    genre={item.genre}
                                    favorit={item.favorit}
                                    idbuku ={item.id}
                                    />
                                )}
                            />

                            {
                                !loadingMainScreen &&
                                <Text
                                style={{
                                    paddingLeft:15,
                                    paddingVertical:5,
                                    fontSize:22,
                                    fontWeight:'bold',
                                    marginBottom: 15,
                                    backgroundColor: '#c61f73',
                                    color:'white',

                                }}
                                >
                                    Genre: {selectedGenre.toUpperCase()}
                                </Text>
                            }
                        
                            <FlatList
                                keyExtractor={item => item.id}
                                data={databuku}
                                renderItem={displayDaftarBuku}
                            />
                            
                        </SafeAreaView>
                        
                    </Animated.View>
                    
                </ScrollView>

                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right : 0,
                    height: searchFocus ? 70: headerHeight,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    elevation: 5,
                }} >

                    <View 
                    style={{
                        flex:1,
                        flexDirection: 'row',
                        alignContent: 'center',
                    }}>
                        <View style={{flex:1}} >
                            <Animated.View style={{marginTop: headerContentMargin}} >
                                <View style={{marginLeft:10,alignItems: 'flex-start'}} >
                                    <Text 
                                    style={{
                                        marginTop:45,
                                        fontSize:28,
                                        color: GLOBAL.COLOR.DARKBLUE,
                                        fontWeight: 'bold',
                                    }} 
                                    >Halo</Text>
                                    <Text
                                    style={{
                                        fontSize:30,
                                        
                                    }}
                                    >{GLOBAL.USER.USERNAME}</Text>
                                </View>
                            </Animated.View>
                        </View>

                        <View style={{flex:1}} >
                            <Animated.View style={{marginTop: headerContentMargin}} >
                                <View style={{alignItems: 'center'}} >
                                    <Image
                                     source={{
                                         uri: 'https://www.elmwood-jun.croydon.sch.uk/wp-content/uploads/2019/11/ReadingPNG.png'
                                     }}
                                     style={{
                                         marginTop: 15,
                                         width: 150,
                                         height:160,
                                         resizeMode: 'cover',
                                     }}
                                    />  
                                    
                                </View>
                            </Animated.View>
                        </View>
                    </View>

                    <View style={{alignItems:'center'}} >
                        <View 
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            paddingVertical:4,
                            borderRadius: 20,
                            marginBottom: 5,
                        }}
                        >
                            
                            <View style={{flex:1, flexDirection:'row'}} >
                                <Icon name="apple" size={35} style={{marginLeft:5, marginTop:0, color: GLOBAL.COLOR.DARKBLUE }} />
                                <Text 
                                style={{
                                    color:GLOBAL.COLOR.DARKBLUE,
                                    fontWeight:'bold',
                                    fontSize:40,
                                    marginTop:-5,
                                }}
                                 >Semerbak</Text>
                            </View>

                            <View style={{flex:0.2, }} >
                                <TouchableOpacity
                                onPress={()=>{
                                    Actions.search();
                                }}
                                >
                                    <Icon name="magnify" size={38} style={{marginLeft:5, marginTop:3}} />
                                </TouchableOpacity>
                            </View>
                            
                            {/* <Icon name="book-search" size={24} style={{color:GLOBAL.COLOR.DARKBLUE,paddingTop:12}} />

                            <TextInput 
                            placeholder="Baca Apa Hari Ini?"
                            // onFocus={()=>{
                            //     setSearchFocus(true);
                            //     console.log("FOCUSS");
                            // }}
                            // onEndEditing={()=>{
                            //     setSearchFocus(false);
                            //     console.log("END EDIT ");
                            // }}
                            // onKeyPress={()=>console.log("SEARCH KEY PRESSED")}
                            onChangeText={setSearchKeywoard}
                            onSubmitEditing={()=>{
                                console.log("JUMP to search.js")
                                console.log(searchKeywoard);
                                GLOBAL.SEARCH.KEYWORD = searchKeywoard;
                                Actions.search();
                            }}
                            clearButtonMode="while-editing"
                            returnKeyType="search"
                            style={{
                                height:50, 
                                width: 250, 
                                backgroundColor:'white',
                                paddingHorizontal: 20,
                                borderBottomWidth: 1.5,
                                borderBottomColor: GLOBAL.COLOR.DARKPURPLE,
                            }} 
                            
                            /> */}

                        </View>
                    </View>
                    

                </Animated.View>

                {
                    loadingMainScreen && loadingGenre && 
                    <Spinner  color="#c61f73" position="absolute" px={WIDTH/2} py={(HEIGHT/2)+50} size={100} />
                    
                }
                
            </View>
            
        </NativeBaseProvider>

    );
}

{/* <View
        style={{
            flex:1,
        }}
        >
            
             <FlatList
                keyExtractor={item => item.id}
                data={databuku}
                renderItem={({item})=>(
                    <View>
                        <Text>{item.title}</Text>
                        
                    </View>
                )}
            />

        </View> */}

{/* <FlatList
                keyExtractor={item => item.id}
                data={buku}
                renderItem={({item}) => (
                    <Text> {item.title} </Text>
            )}
            /> */}

{/* <NativeBaseProvider>
            <View style={{ flex:1 }}>

                <ScrollView
                 onScroll={Animated.event(
                     [{
                         nativeEvent: {
                             contentOffset:{
                                 y: scrollY
                             }
                         }
                     }]
                     ,{useNativeDriver: false}
                 )}
                >
                    <Animated.View
                     style={{
                         marginTop: scrollItemHeight,
                     }}
                    >
                        
                        <ScrollView
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                        >
                            
                            <RecBook
                            urel = "https://images.booksense.com/images/104/810/9780996810104.jpg"
                            title="🐑🐑DAMIEN"
                            years="21 juni 2021"
                            bookuri="http://engineering.nyu.edu/mechatronics/Control_Lab/Criag/Craig_RPI/2001/RLocus_Analysis_Design.pdf"
                            />
                            <RecBook
                            urel = "https://i.pinimg.com/originals/5f/e3/62/5fe36271a1b8fe83b22571f3b85de826.jpg"
                            title="🐑Throll Hunter Tales of Arcadia"
                            years="11 april 2021"
                            bookuri="http://engineering.nyu.edu/mechatronics/Control_Lab/Criag/Craig_RPI/2001/RLocus_Analysis_Design.pdf"
                            />
                            <RecBook
                            urel = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2L8gB-lyNm8apIwxkYRlLpPXpArw-_LVK0w&usqp=CAU"
                            title="Angel Song"
                            years="19 januari 2021"
                            bookuri="http://engineering.nyu.edu/mechatronics/Control_Lab/Criag/Craig_RPI/2001/RLocus_Analysis_Design.pdf"
                            />
                            <RecBook
                            urel = "https://i.jeded.com/i/adit-sopo-jarwo-the-movie.209312.jpg"
                            title="Adit Sopo Jarwo The Movie "
                            years="15 mei 2021"
                            bookuri="http://engineering.nyu.edu/mechatronics/Control_Lab/Criag/Craig_RPI/2001/RLocus_Analysis_Design.pdf"
                            />
                            
                            
                        </ScrollView>

                        <DaftarBuku 
                         title="fundametal of electric circuit"
                         urel = "https://images-na.ssl-images-amazon.com/images/I/41aL2bVlVRL._SX389_BO1,204,203,200_.jpg"
                         year="2020"
                         description="Then dsawe bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is 
                         Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is "
                        />
                        <DaftarBuku 
                         title="fundametal of electric circuit"
                         urel = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYS9VzpEluP3wwqgAL8QpaTwR9CKiaNE7QCg&usqp=CAU"
                         year="2020"
                         description="Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is 
                         Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is "
                        />
                        <DaftarBuku 
                         title="fundametal of electric circuit"
                         urel = "https://images-platform.99static.com//paGJZG8zlJyLmqQILK5_AQdEVjw=/0x0:2039x2039/fit-in/500x500/99designs-contests-attachments/118/118112/attachment_118112956"
                         year="2020"
                         description="Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is 
                         Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is "
                        />
                        <DaftarBuku 
                         title="fundametal of electric circuit"
                         urel = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUdaSbKzbyNiaSYuZ60C38Hken6L8ggOQC1yj_72ZUGANs8MuNel-plMRR_K33s0-Fm5M&usqp=CAU"
                         year="2020"
                         description="Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is 
                         Then we bind the animated value to the ScrollView scroll position. To do that we use an Animated.event with a mapping to the event object property that we want to bind to the animated value. In this case it is "
                        />


                    </Animated.View>
                    <TouchableOpacity
                    style={{
                        backgroundColor: GLOBAL.COLOR.DARKPURPLE,
                        paddingHorizontal: 20,
                        paddingVertical: 5,
                        marginBottom:15,
                    }}
                    onPress={()=> Actions.Home()}
                    >
                        <Text style={{color:'white'}} >LOAD</Text>
                    </TouchableOpacity>
                </ScrollView>

                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right : 0,
                    height: headerHeight,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    elevation: 5,
                }} >

                    <View 
                    style={{
                        flex:1,
                        flexDirection: 'row',
                        alignContent: 'center',
                    }}>
                        <View style={{flex:1}} >
                            <Animated.View style={{marginTop: headerContentMargin}} >
                                <View style={{marginLeft:10,alignItems: 'flex-start'}} >
                                    <Text 
                                    style={{
                                        marginTop:45,
                                        fontSize:28,
                                        color: GLOBAL.COLOR.DARKBLUE,
                                        fontWeight: 'bold',
                                    }} 
                                    >Halo</Text>
                                    <Text
                                    style={{
                                        fontSize:30,
                                        
                                    }}
                                    >{GLOBAL.USER.USERNAME}</Text>
                                </View>
                            </Animated.View>
                        </View>

                        <View style={{flex:1}} >
                            <Animated.View style={{marginTop: headerContentMargin}} >
                                <View style={{alignItems: 'center'}} >
                                    <Image
                                     source={{
                                         uri: 'https://www.elmwood-jun.croydon.sch.uk/wp-content/uploads/2019/11/ReadingPNG.png'
                                     }}
                                     style={{
                                         marginTop: 15,
                                         width: 150,
                                         height:160,
                                         resizeMode: 'cover',
                                     }}
                                    />  
                                    
                                </View>
                            </Animated.View>
                        </View>
                    </View>

                    <View style={{alignItems:'center'}} >
                        <View 
                        style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            width: 300,
                            paddingHorizontal:10,
                            paddingVertical:4,
                            borderRadius: 20,
                            marginBottom: 5,
                        }}
                        >
                            <Icon name="book-search" size={24} style={{color:GLOBAL.COLOR.DARKBLUE,paddingTop:12}} />

                            <TextInput 
                            placeholder="Baca Apa Hari Ini?"
                            returnKeyType="search"
                            style={{
                                height:50, 
                                width: 250, 
                                backgroundColor:'white',
                                paddingHorizontal: 20,
                                borderBottomWidth: 1.5,
                                borderBottomColor: GLOBAL.COLOR.DARKPURPLE,
                            }} 
                            
                            />

                        </View>
                    </View>

                </Animated.View>
                
            </View>
            
        </NativeBaseProvider> */}