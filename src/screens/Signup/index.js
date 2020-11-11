import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Button, Input, Item, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';
import logo from '../../assets/icon.png';

const LoginSchema = Yup.object().shape({
  fullName: Yup.string().required('Please input your name'),
  email: Yup.string()
    .email('Please input a valid email (example@mail.com)')
    .required('Please input your email'),
  password: Yup.string()
    .required('Please input your password')
    .min(8, 'Password min. 8 character'),
});

export default function Login({navigation}) {
  return (
    <View style={styled.parent}>
      <Image style={styled.logo} source={logo} />
      <Formik
        initialValues={{fullName: '', email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styled.formWrapper}>
            <Item style={styled.inputWrapper} floatingLabel>
              <Label style={styled.label}>Full Name</Label>
              <Input
                style={styled.input}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
            </Item>
            {errors.fullName && touched.fullName ? (
              <Text style={styled.alert}>{errors.fullName}</Text>
            ) : null}
            <Item style={styled.inputWrapper} floatingLabel>
              <Label style={styled.label}>Email</Label>
              <Input
                style={styled.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </Item>
            {errors.email && touched.email ? (
              <Text style={styled.alert}>{errors.email}</Text>
            ) : null}
            <Item style={styled.inputWrapper} floatingLabel>
              <Label style={styled.label}>Password</Label>
              <Input
                style={styled.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </Item>
            {errors.password && touched.password ? (
              <Text style={styled.alert}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit} style={styled.btn} block rounded>
              <Text style={styled.btnText}>login</Text>
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={styled.loginLink}>
              <Text style={styled.link}>
                Already have an account? Login <Icon name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
