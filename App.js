//import section
import React from 'react';
import { Dimensions,  ScrollView, View, Text, TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Box, 
  HStack,
  VStack,
  Pressable,
  Image,
  AspectRatio,
  Heading,
  Container,
  Center,
  Avatar,
}from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import GLOBAL from './asset/Global/global';

import { Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
//import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


import home from './asset/screen/home';
import login from './asset/screen/login';
import signup from './asset/screen/signup';
import bookview from './asset/screen/bookview';
import MainBook from './asset/screen/mainBook';
import Reward from './asset/screen/reward';
import Profile from './asset/screen/profil';
import bukuFavorit from './asset/screen/bukuFavorit';
import history from './asset/screen/history';
import search from './asset/screen/search';
//Constant section 

const HomeScreen = home;
const LoginPage = login;
const SignUp = signup;
const BookView = bookview;

const Stack = createStackNavigator();

//function section


class TabIcon extends React.Component{
    
  render(){

      if(this.props.title === "Buku"){
        return(
          <View>
             <Icon name="book" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
            <Text
            style={{
              marginLeft:-4,
              fontSize: 12,
              color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey',
              fontWeight: 'bold',
            }}
            >HOME</Text>
          </View>
        );
      }
      else if (this.props.title === "Reward"){
        return(
          <View>
             <Icon name="cash-multiple" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
            <Text
              style={{
                marginLeft:-9,
                fontSize: 12,
                color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey',
                fontWeight: 'bold',
              }}
            >REWARD</Text>
          </View>
        );
         
      }
      else if (this.props.title === "Profile"){
          return(
            <View>
              <Icon name="card-account-mail" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
              <Text
              style={{
                marginLeft:-10,
                fontSize: 12,
                color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey',
                fontWeight: 'bold',
              }}
              >ACCOUNT</Text>
            </View>
          );
      }
      else {
          return (
            <View>
              <Icon name="notebook-multiple" size={23} style={{color: this.props.focused ? 'white' :'grey'}} />
              <Text
              style={{
                marginLeft:-4,
                fontSize: 12,
                
              }}
              >HOME</Text>
            </View>
          );
      }
  }
}

function App() {
  return (
    <Router >
    
      <Scene key="root">

        <Scene key="Home" component={HomeScreen} title="Home" />
        <Scene key="Login" component={LoginPage} title="Login" initial={true} headerShown={false} />
        <Scene key="SignUp" component={SignUp} title="SignUp"  headerShown={false} />
        <Scene key="BookView" component={BookView} title="Book View" headerShown={false} onBack={()=>console.log("Back to MainBook Page") } back={true} />
        <Scene key="bukuFavorit" component={bukuFavorit} title="Buku favorit" headerShown={false} />
        <Scene key="history" component={history} title="history" headerShown={false} />
        <Scene key="search" component={search} title="search"   headerShown={false} />

        <Scene 
          
          key="tabbar" 
          tabs={true} 
          headerShown={false}
          style={{color:'pink'}} 
          showLabel={false} 
         
          // activeBackgroundColor="#062426"
          // inactiveBackgroundColor="#062426"
          >
            <Scene key="mainBook" component={MainBook} title="Buku" icon={TabIcon}  />
            <Scene key="profile" component={Profile} title="Profile"  icon={TabIcon} />
            <Scene key="reward" component={Reward}  title="Reward" icon={TabIcon} />
            
        </Scene>

      </Scene>
    
    </Router>
  );
}


//========================== CEK AXIOS FETCH ANDROID 11, 12 ===========================//

// App = () =>{
//   const [axiosResponse, setAxiosResponse] = React.useState('');
//   const [fetchResponse, setFetchResponse] = React.useState('');
//   const [jsonFetchResponse, setJsonFetchResponse] = React.useState('');

//   const axiosfetch = async () => {

//     var body = new FormData();
//     body.append('command', 'login');
//     body.append('username', "siah");
//     body.append('password', "123");

//     const data = await axios({
//         method: 'post',
//         url: 'http://semerbak-swag.com/api/',
//         headers: { "Content-Type": "multipart/form-data" },
//         data: body,
//     })
//     .then(response => {
//       setAxiosResponse(JSON.stringify(response, null, 4));
//       console.log(response.data.logindata);
//       return response.data.logindata;
//     },
//     error => {
//       setAxiosResponse(error);
//       console.log(error);
//     });  

//   };
  

//   const fetching = () => {

//     var form = new FormData();
//     form.append('command', 'login');
//     form.append('username', "siah");
//     form.append('password', "123");

//     fetch('http://semerbak-swag.com/api/', {
//       method:'POST',
//       headers: { 
//         "Content-Type": "multipart/form-data" 
//       },
//       body: form,
//     })
//     .then(response => response.json())
//     .then(json => {
//       setJsonFetchResponse(JSON.stringify(json, null, 4));
//     })
//     .catch(error => setFetchResponse(JSON.stringify(error)));

//     fetch('http://semerbak-swag.com/api/', {
//       method:'POST',
//       headers: { 
//         "Content-Type": "multipart/form-data" 
//       },
//       body: form,
//     })
//     .then(response => setFetchResponse(JSON.stringify(response, null, 4)))
//     .catch(error => setFetchResponse(JSON.stringify(error)));

//   };
  

//   return(
//     <View style={{flex:1, backgroundColor:'black'}} >
//       <View style={{flex:1}} >
//         <View>
//           <TouchableOpacity 
//           onPress={()=>axiosfetch()}
//           style={{
//             backgroundColor:'white',
//             paddingHorizontal: 15,
//             paddingVertical:2,
//           }}
//           >
//             <Text style={{fontSize:18}} >AXIOS</Text>
//           </TouchableOpacity>
//           <ScrollView>
//             <Text style={{color:'white', fontSize:16, marginBottom:25}} >AXIOS: <Text style={{color:GLOBAL.COLOR.LIGHTBLUE, fontSize:16}} >{axiosResponse}</Text></Text>
//           </ScrollView>
//         </View>
//       </View>

//       <View style={{flex:1}} >
//         <View>
//         <TouchableOpacity 
//           onPress={()=>fetching()}
//           style={{
//             backgroundColor:'white',
//             paddingHorizontal: 15,
//             paddingVertical:2,
//           }}
//           >
//             <Text style={{fontSize:18}} >FETCH</Text>
//           </TouchableOpacity>
//           <ScrollView >
//             <Text style={{color:'white', fontSize:16, marginBottom:25}} >FETCH: <Text style={{color:GLOBAL.COLOR.LIGHTBLUE, fontSize:16}} >{fetchResponse}</Text></Text>
//             <Text style={{color:'white', fontSize:16, marginBottom:25}} >JSON DATA: <Text style={{color:GLOBAL.COLOR.LIGHTBLUE, fontSize:16}} >{jsonFetchResponse}</Text></Text>
//           </ScrollView>
//         </View>

//       </View>
//     </View>
//   );
// }


//export default
export default App;


