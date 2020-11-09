import React from 'react';
import {View, Text, Image} from 'react-native';
import {Button} from 'native-base';

import styled from './style';

import logo from '../../assets/logo.png';

export default function Landingpage() {
  return (
    <View style={styled.parent}>
      <Image style={styled.logo} source={logo} />
      <View style={styled.btnWrapper}>
        <Button style={styled.btnLogin} block rounded transparent>
          <Text style={styled.btnLoginText}>login</Text>
        </Button>
        <Text style={styled.text}>or</Text>
        <Button style={styled.btnSignup} block rounded>
          <Text style={styled.btnSignupText}>signup</Text>
        </Button>
      </View>
    </View>
  );
}
