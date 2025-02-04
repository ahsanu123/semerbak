import React from 'react';
import {Button, Text, View} from 'react-native';
import { Stack,Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst } from 'react-native-router-flux';
import { NativeBaseProvider } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import GLOBAL from '../Global/global';

import MainBook from './mainBook';
import Reward from './reward';
import Profile from './profil';
import Home from './home';
import BookView from './bookview';

//const icon section
const mainBookIcon = <Icon name="notebook-multiple" size={24}  />;

class TabIcon extends React.Component{
    
    render(){

        if(this.props.title === "Buku"){
            return <Icon name="book" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
        }
        else if (this.props.title === "Reward"){
            return <Icon name="cash-multiple" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
        }
        else if (this.props.title === "Profile"){
            return <Icon name="card-account-mail" size={23} style={{color: this.props.focused ? GLOBAL.COLOR.PURPLE :'grey'}} />
        }
        else {
            return <Icon name="notebook-multiple" size={23} style={{color: this.props.focused ? 'white' :'grey'}} />
        }
    }
}

export default function (){
    return(
        <Router>
            <Stack key="root" >
                
            <Scene 
                    key="tabbar" 
                    tabs={true} 
                    headerShown={false}
                    style={{color:'pink'}} 
                    showLabel={false} 
                    initial={true}
                    // activeBackgroundColor="#062426"
                    // inactiveBackgroundColor="#062426"
                    >

                        <Scene key="mainBook" component={MainBook} title="Buku" icon={TabIcon} />
                        <Scene key="profile" component={Reward}  title="Reward" icon={TabIcon} />
                        <Scene key="reward" component={Profile} title="Profile" icon={TabIcon} />
                        <Scene key="BookView" component={BookView} title="BookView" icon={TabIcon} />
                    </Scene>

            </Stack>
        </Router>

    );
}