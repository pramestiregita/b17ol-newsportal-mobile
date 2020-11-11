import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Landingpage from '../Landingpage';
import Login from '../Login';
import Signup from '../Signup';
import Home from '../Home';
import NewsDetail from '../NewsDetail';
import MyPost from '../MyPost';
import MyProfile from '../MyProfile';
import ChangePassword from '../ChangePassword';
import ChangeProfile from '../ChangeProfile';

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2a363b',
          elevation: 0,
        },
        headerTintColor: '#e74b5b',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name="Landingpage"
        component={Landingpage}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerTitleAlign: 'center', headerTransparent: true}}>
      <Stack.Screen
        options={{title: 'My Profile'}}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{title: 'Change Profile'}}
        name="ChangeProfile"
        component={ChangeProfile}
      />
      <Stack.Screen
        options={{title: 'Change Password'}}
        name="ChangePassword"
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
};

const BottomTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{activeTintColor: '#e74b5b', labelStyle: {fontSize: 14}}}>
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="home" size={size} color={color} />
          ),
          title: 'Home',
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="pencil-alt" size={size} color={color} />
          ),
          title: 'Write News',
        }}
        name="CreatePost"
        component={MyPost}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="th-list" size={size} color={color} />
          ),
          title: 'My Post',
        }}
        name="MyPost"
        component={MyPost}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({size, color, focused}) => (
            <Icon name="user" size={size} color={color} />
          ),
          title: 'My Profile',
        }}
        name="Profile"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default function Main() {
  const {isLogin} = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Auth"
            component={AuthStack}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="BottomTab"
            component={BottomTab}
          />
          <Stack.Screen
            options={{title: '', headerTransparent: true}}
            name="NewsDetail"
            component={NewsDetail}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
