import React, { useEffect } from 'react';
import { RefreshControl,ScrollView ,StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, Modal, TextInput } from 'react-native';
import {
    NativeBaseProvider,
    Spinner,
    Slider,
}from 'native-base';
import Pdf from 'react-native-pdf';
import GLOBAL from '../Global/global';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';

import {ActionConst, Actions} from 'react-native-router-flux';

const DIMENSIONHEIGHT = Dimensions.get('window').height;
const DIMENSIONWIDTH = Dimensions.get('window').width;
const SHA1 = require('crypto-js/sha1');

export default class PDF extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading : true,
            percents:0,
            path: '',
            stateHeight: Dimensions.get('window').height,
            stateWidht: Dimensions.get('window').width,
            page: 0,
            totalPage: 0,
            tools: false,
            filename:'',
        }
    }

    componentDidMount(){
        this.downloadFile();
    }
    componentWillUnmount(){
        this.fileUnlink();
    }
    downloadFile(){
        const uri = this.props.urel;
        const filename = SHA1(uri) + '.pdf';
        
        RNFetchBlob
        .config({
            fileCache:true,
            path: RNFetchBlob.fs.dirs.CacheDir + filename,
        })
        .fetch('GET', uri,{
        })
        .progress((receive, total)=>{
            console.log('downloaded', receive/total);
            this.setState({percents: Math.round((receive/total)*100)});
        })
        .then(res=>{
            this.setState({path: 'file://' + res.path()});
            this.state({filename: filename});
            
            console.log(this.state.path);
        }); 
    }
    
    fileUnlink(){
        
        RNFetchBlob.fs.unlink(RNFetchBlob.fs.dirs.CacheDir );
    }

    render() {
        
        // const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};

        const source = {uri:this.state.path};

        return (
            <NativeBaseProvider>
                <View style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
                onLayout={() => {
                    if(Dimensions.get('window').height > Dimensions.get('window').width){
                        console.log("PORTRAIT");
                        this.setState({stateWidht: DIMENSIONWIDTH, stateHeight: DIMENSIONHEIGHT});
                    }
                    else{
                        console.log("LANDSCAPE");
                        this.setState({stateWidht: DIMENSIONHEIGHT, stateHeight: DIMENSIONWIDTH});
                    }
                }}
                >
                    
                    {
                        !this.loading &&
                        <Pdf
                        ref={pdf => {this.pdf = pdf;}}
                        source={source}
                        onLoadComplete={(numberOfPages,filePath)=>{
                            console.log(`number of pages: ${numberOfPages}`);
                            this.setState({loading: false, totalPage: numberOfPages});
                        }}
                        onPageChanged={(page,numberOfPages)=>{
                            console.log(`current page: ${page}`);
                            this.setState({page: page})
                        }}
                        onError={(error)=>{
                            console.log(error);
                        }}
                        onPressLink={(uri)=>{
                            console.log(`Link presse: ${uri}`)
                        }}

                        onLoadProgress={(percents)=>{
                            this.setState({percents:(Math.round(percents*1000)/10)});
                            console.log(percents);
                        }}

                        onPageSingleTap={page => {
                            console.log("Single Tap: " + page);
                            this.setState({tools: !this.state.tools});
                        }}
                        onError={(error)=>{
                            console.log("ERROR: " + error);
                            ToastAndroid.showWithGravity(
                                "MAAF, TERJADI ERROR COBA LAGI NANTI!!",
                                ToastAndroid.LONG,
                                ToastAndroid.BOTTOM,
                            );
                        }}
                        
                        maxScale={10}
                        activityIndicatorProps={{color: 'red', progressTintColor: 'blue'}}
                        
                        style={{
                        flex:1,
                        width: this.state.stateWidht,
                        height: this.state.stateHeight,
                        }}/>
                        
                    }
                    {
                        !this.state.loading && 
                        <View 
                        style={{
                            position:'absolute', 
                            backgroundColor:'black', 
                            borderRadius: 5,
                            right:10, 
                            bottom:10,
                            paddingHorizontal: 15,
                            paddingVertical: 4,
                        }} 
                        >
                            <TouchableOpacity 
                            activeOpacity={1}
                            >
                                <Text style={{color:'white'}} >{this.state.page}/{this.state.totalPage}</Text>    
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        this.state.loading && 
                        <View 
                        style={{
                            position:'absolute',
                            marginTop: (DIMENSIONHEIGHT/2)-50,
                            alignItems:'center',
                        }} >
                            <Spinner  color={GLOBAL.COLOR.PURPLE} size={60} />
                            <Text style={{fontSize:20,marginTop: 10,}} > { this.state.percents}
                            %</Text>
                            <View style={{width: this.state.percents, height:10, backgroundColor: GLOBAL.COLOR.PURPLE, marginTop:10,borderRadius:10,}} ></View>
                        </View>
                    }
                    {
                        this.state.tools && 
                        <View 
                        style={{
                            position:'absolute',
                            backgroundColor: 'white',
                            width: this.state.stateWidht,
                            elevation: 6,
                            paddingVertical: 4,
                        }}
                        > 
                            <View style={{flex:1, flexDirection:'row'}} >
                                <View
                                style={{
                                    flex:0.2
                                }}
                                >
                                    <Icon name="close" size={25} style={{marginLeft: 5}} />
                                </View>
                                <View
                                style={{
                                    flex:1
                                }}
                                >
                                    <Text numberOfLines={1} style={{width:250, fontSize: 18, marginTop: 3, fontWeight:'bold'}} >{this.props.title}</Text>
                                </View>
                                <View
                                style={{
                                    flex:0.2
                                }}
                                >
                                    <Icon name="star" size={25} />
                                </View>
                                
                            </View>
                        </View>

                    }
                    
                </View>
            
            </NativeBaseProvider>
        )
  }
}

// export default function(){

//     const [page,setpage] = React.useState(0);
//     const [dimensionWidth, setdimensionWidth] = React.useState(Dimensions.get('window').width);
//     const [dimensionHeight, setdimensionHeight] = React.useState(Dimensions.get('window').height);
//     const [loading, setloading] = React.useState(true);
//     const [filepath, setfilepath] = React.useState('');
//     const [totalpage, settotalpage] = React.useState(0);
//     const [error, seterrors] = React.useState(false);
//     const [errorStatus, seterrorstatus] = React.useState('');
//     const [percents, setpercents] = React.useState(0);
//     const [portrait, setPortrait] = React.useState(true);
//     const [jumpWindow, setJumpWindow] = React.useState(false);
//     // const source = {uri:props.urel,cache:true};
//     const source = {uri:'http://semerbak-swag.com/storage/buku/nasmdoc.pdf',cache:true};
//     const [viewNavigation, setViewNavigation] = React.useState(false);
    
    
//     return(

//         <NativeBaseProvider>
//             <View style={{flex:1,  flexDirection:'row'}}  >
//                 <View style={{flex:1,  }} >
//                     <View style={{ flex:1}} >
//                     <Pdf
//                     source={source}
//                     cache={true}
//                     onLoadComplete={(numberOfPages,filePath)=>{
//                         console.log(`number of pages: ${numberOfPages}`);
//                         console.log(`File Location: ${filePath}`);
//                         // setloading(false);
//                         setfilepath(filepath);
//                     }}
//                     setPage={200}
//                     onPageChanged={(page,numberOfPages)=>{
//                         console.log(`current page: ${page}`);
//                         setpage(page);
//                         settotalpage(numberOfPages);
//                     }}
//                     onError={(error)=>{
//                         console.log(error);
//                         // seterrors(true);
//                         // if(error.toString() === 'Error: cannot create document: File not in PDF format or corrupted.'){
//                         //      seterrorstatus('Terjadi error di server coba buku lainnya');
//                         // }
//                         // else if(error.toString() === 'Error: No such file or directory'){
//                         //     seterrorstatus('Jangan Kebanyakan rotate, Rotate marai BUG!!, REFRESH');
//                         // }
//                         // else{
//                         //     seterrorstatus('Error Coba Refresh Halaman ini');
                            
//                         // }
//                     }}
//                     onPressLink={(uri)=>{
//                         console.log(`Link presse: ${uri}`)
//                     }}
                    
//                     onLoadProgress={(percents)=>{
                        
//                         // setpercents((Math.round(percents*1000)/10));
//                     }}

//                     style={{
//                         flex:1,
//                         width: DIMENSIONWIDTH,
//                         height: DIMENSIONHEIGHT,
//                     }}
                    
//                     />
//                         </View>

                    

//                     <View 
//                     style={{
//                         position:'absolute', 
//                         backgroundColor:'black', 
//                         borderRadius: 5,
//                         right:10, 
//                         bottom:10,
//                         paddingHorizontal: 15,
//                         paddingVertical: 4,
//                         marginRight: viewNavigation? 5: 0,
//                     }} 
//                     >
//                         <TouchableOpacity 
//                         activeOpacity={1}
//                         // onPress={()=>pdf.setPage(200)}
//                         >
//                             <Text style={{color:'white'}} >{page}/{totalpage}</Text>    
//                         </TouchableOpacity>
//                     </View>

//                     <Modal
//                     animationType="slide"
//                     transparent={true}
//                     visible={jumpWindow}
//                     onRequestClose={()=>setJumpWindow(false)}
//                     >
//                         <View 
//                         style={{
//                             flex:1,
//                             alignItems:'center',
//                             alignContent:'center',
//                             top: DIMENSIONHEIGHT/3,
//                         }}
//                         >
//                             <View
//                             style={{
//                                 backgroundColor:'white',
//                                 paddingHorizontal:20,
//                                 paddingVertical:10,
//                                 borderRadius: 5,
//                                 borderWidth: 1,
//                                 borderColor:'grey',
//                             }}
//                             >
//                                 <Text>Masukan Halaman</Text>
//                                 <TextInput />

//                                 <View style={{flexDirection:'row'}} >
//                                     <TouchableOpacity>
//                                         <Text>Cancel</Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity>
//                                         <Text>OK</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>

//                         </View>
                        
//                     </Modal>

//                     <View
//                     style={{
//                         position:'absolute',
//                         width: DIMENSIONWIDTH,
//                         height: viewNavigation? 50: 0,
//                         backgroundColor:'white',
//                         elevation: 6,
//                         top: viewNavigation? 0:-20,
//                     }}
//                     >
//                         <Text>MENU ATAS</Text>

//                     </View>

//                     <View
//                     style={{
//                         position:'absolute',
//                         top:60,
//                         right:5,
                        
//                     }} 
//                     >
//                         <TouchableOpacity 
//                         style={{
//                         width:60,
//                         height:60,
//                         borderRadius:50,
//                         backgroundColor:GLOBAL.COLOR.DARKBLUE,
//                         alignItems:'center'
//                         }}
//                         onPress={()=>setViewNavigation(!viewNavigation)}
//                         activeOpacity={1}
//                         >
//                             <View 
//                             style={{
//                                 right:0,
//                                 bottom:0,
//                             }}
//                             >
//                                 <Icon name="tools" size={35} style={{color: 'white', marginTop:10}} />
//                             </View>
                            
//                         </TouchableOpacity>
//                     </View>

                    
//                 </View>
                
                    
//                 <View 
//                 style={{
//                     flex:0.08, 
//                     marginRight: viewNavigation?  10:-30 ,
//                 }} 
//                 >
//                     <View>
//                         <Slider
//                         orientation="vertical"
//                         minValue={0}
//                         maxValue={totalpage}
//                         defaultValue={0}
//                         step={1}
//                         style={{
//                             bottom:10,
//                             top:60,
//                             height: DIMENSIONHEIGHT-90,
//                             backgroundColor:'white',
//                         }}
//                         >
//                             <Slider.Track
//                             style={{
//                                 height:500,
//                                 width:50,
//                             }}
//                             >
//                                 <Slider.FilledTrack style={{backgroundColor: 'white'}} />
//                             </Slider.Track>
//                             <Slider.Thumb>
//                                 <Icon name="tools" size={35} />
//                             </Slider.Thumb>

//                         </Slider>
                    
//                     </View>
//                 </View>
                
                
//             </View>
    
//         </NativeBaseProvider>

    
//     );
// }

// export default function(props){
    
//     const [page,setpage] = React.useState(0);
//     const [dimensionWidth, setdimensionWidth] = React.useState(Dimensions.get('window').width);
//     const [dimensionHeight, setdimensionHeight] = React.useState(Dimensions.get('window').height);
//     const [loading, setloading] = React.useState(true);
//     const [filepath, setfilepath] = React.useState('');
//     const [totalpage, settotalpage] = React.useState(0);
//     const [error, seterrors] = React.useState(false);
//     const [errorStatus, seterrorstatus] = React.useState('');
//     const [percents, setpercents] = React.useState(0);
//     const [portrait, setPortrait] = React.useState(true);
//     // const source = {uri:props.urel,cache:true};
//     const source = {uri:'http://semerbak-swag.com/storage/buku/nasmdoc.pdf',cache:true};

//     const isPortrait=()=>{
//         const dim = Dimensions.get('screen');
//         if(dim.height >= dim.width){
//             setPortrait(true);
//         }
//         else{
//             setPortrait(false);
//         }
//     };
      
//     const listenOrientation=()=>{
//         setdimensionWidth(Dimensions.get('window').width);
//         setdimensionHeight(Dimensions.get('window').height);
//     };

//     // useEffect(()=>{
//     //     return () => {
//     //         console.log("DELETE");
//     //     }
//     // });

    
//     return (
//         <NativeBaseProvider>
    
//             <View 
//             style={{
//                 flex: 1,
//                 justifyContent: 'flex-start',
//                 alignItems: 'center',
//             }}
//             onLayout={()=> isPortrait()}
//             >
                
//                 {/* <Pdf
//                     source={source}
//                     cache={true}
//                     onLoadComplete={(numberOfPages,filePath)=>{
//                         console.log(`number of pages: ${numberOfPages}`);
//                         console.log(`File Location: ${filePath}`);
//                         setloading(false);
//                         setfilepath(filepath);
//                     }}
//                     onPageChanged={(page,numberOfPages)=>{
//                         console.log(`current page: ${page}`);
//                         setpage(page);
//                         settotalpage(numberOfPages);
//                     }}
//                     onError={(error)=>{
//                         console.log(error);
//                         seterrors(true);
//                         if(error.toString() === 'Error: cannot create document: File not in PDF format or corrupted.'){
//                              seterrorstatus('Terjadi error di server coba buku lainnya');
//                         }
//                         else if(error.toString() === 'Error: No such file or directory'){
//                             seterrorstatus('Jangan Kebanyakan rotate, Rotate marai BUG!!, REFRESH');
//                         }
//                         else{
//                             seterrorstatus('Error Coba Refresh Halaman ini');
                            
//                         }
//                     }}
//                     onPressLink={(uri)=>{
//                         console.log(`Link presse: ${uri}`)
//                     }}
                    
//                     onLoadProgress={(percents)=>{
                        
//                         setpercents((Math.round(percents*1000)/10));
//                     }}

//                     style={{
//                         flex:1,
//                         width: portrait ? DIMENSIONWIDTH : DIMENSIONHEIGHT,
//                         height: portrait ? DIMENSIONHEIGHT: DIMENSIONWIDTH,
//                     }}
                    
//                     /> */}

//                     <View style={{height:DIMENSIONHEIGHT, width:DIMENSIONWIDTH}} >

//                     </View>

//                     {/* Loading Section */}
//                     { !error && loading && 
//                     <View style={{alignItems:'center', position: 'absolute', marginTop: Dimensions.get('window').height/2}}>
//                         <View>
//                             <Spinner  color={GLOBAL.COLOR.PURPLE} position="absolute"  size={50}
//                             marginTop={-10} />
//                         </View>
//                         <View style={{width:100}}>
//                             <Text
//                                 style={{
//                                     backgroundColor: GLOBAL.COLOR.PURPLE,
//                                     width: percents,
//                                     height:10,
//                                     borderRadius:2,
                                    
//                                 }}
//                             ></Text> 
//                         </View>
//                         <View>
//                             <Text style={{paddingTop:15}} >{percents}%</Text>
//                         </View>
//                     </View>

//                     }

//                     {/* Page navigator */}
//                     { 
//                         !error && !loading &&

//                         <View style={{}} >
                            
                            
//                             <Text
//                             style={{
//                                 position:'absolute',
//                                 right:0,
//                                 bottom: 0,
//                                 marginRight: 10,
//                                 marginBottom:10,
//                                 backgroundColor: '#1F112CB0',
//                                 color: 'white',
//                                 fontSize:14,
//                                 paddingVertical: 3,
//                                 paddingHorizontal: 5,
//                                 borderRadius: 5,
                                
//                             }}
//                             >{page}/{totalpage}</Text> 

//                             <View 
//                             style={{
//                                 position:'absolute'
//                             }} >
//                                 <Slider
//                                 orientation="vertical"
//                                 minValue={0}
//                                 maxValue={totalpage}
//                                 step={1}
//                                 defaultValue={0}
//                                 style={{
//                                     bottom:10,
//                                 }}
                                
//                                 >
//                                     <Slider.Track
//                                     style={{
//                                         height:500,
//                                         width:50,
//                                     }}
//                                     >
//                                         <Slider.FilledTrack 
//                                         />
//                                     </Slider.Track>
//                                     <Slider.Thumb 
//                                     />

//                                 </Slider>
//                             </View>

//                         </View>
//                     }

//                     {/* Error section */}
//                     {error && 
//                         <View>
//                             <Text 
//                             style={{
//                                 paddingVertical:5,
//                                 backgroundColor: 'red',
//                                 paddingHorizontal: 10,
//                                 marginBottom: 15,
//                                 fontSize: 15,
//                                 color: 'white',
//                                 borderRadius:10,
//                                 fontWeight: 'bold',
//                             }} 
//                             >{ errorStatus }</Text>
//                             <Button title="Refresh" onPress={()=>Actions.refresh()} />
//                         </View>
//                     }
                    
                    
                        
//             </View>
            
            
                
//         </NativeBaseProvider>
    
//     );
// }


