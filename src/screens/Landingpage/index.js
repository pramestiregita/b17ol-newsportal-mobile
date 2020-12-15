import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {View, Text, Image} from 'react-native';
import {Button} from 'native-base';
import RNBootSplash from 'react-native-bootsplash';

import styled from './style';

import logo from '../../assets/logo.png';

import toast from '../../components/Toast';

export default function Landingpage({navigation}) {
  const {alertMsg} = useSelector((state) => state.auth);

  useEffect(() => {
    RNBootSplash.hide({});
  }, []);

  // useEffect(() => {
  //   if (alertMsg !== '') {
  //     toast(alertMsg);
  //   }
  // }, [alertMsg]);

  return (
    <View style={styled.parent}>
      <Image style={styled.logo} source={logo} />
      <View style={styled.btnWrapper}>
        <Button
          onPress={() => navigation.navigate('Login')}
          style={styled.btnLogin}
          block
          rounded
          transparent>
          <Text style={styled.btnLoginText}>login</Text>
        </Button>
        <Text style={styled.text}>or</Text>
        <Button
          onPress={() => navigation.navigate('Signup')}
          style={styled.btnSignup}
          block
          rounded>
          <Text style={styled.btnSignupText}>signup</Text>
        </Button>
      </View>
    </View>
  );
}
