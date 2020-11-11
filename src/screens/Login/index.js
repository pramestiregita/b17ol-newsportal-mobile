import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Button, Input, Item, Label, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';
import logo from '../../assets/icon.png';
import authAction from '../../redux/actions/auth';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please input a valid email (example@mail.com)')
    .required('Please input your email'),
  password: Yup.string()
    .required('Please input your password')
    .min(8, 'Password min. 8 character'),
});

export default function Login({navigation}) {
  const {alertMsg, isError} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (alertMsg !== '') {
      Toast.show({
        text: alertMsg,
        duration: 3000,
        position: 'top',
        type: isError ? 'danger' : 'success',
        textStyle: {
          fontWeight: 'bold',
        },
      });
    }
  }, [alertMsg, isError]);

  return (
    <View style={styled.parent}>
      <Image style={styled.logo} source={logo} />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => dispatch(authAction.login(values))}>
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
                secureTextEntry
                style={styled.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </Item>
            {errors.password && touched.password ? (
              <Text style={styled.alert}>{errors.password}</Text>
            ) : null}
            <TouchableOpacity
              style={styled.forgotLink}
              onPress={() => console.log('pressed')}>
              <Text style={styled.link}>
                Forgot your password? <Icon name="chevron-right" />
              </Text>
            </TouchableOpacity>
            <Button onPress={handleSubmit} style={styled.btn} block rounded>
              <Text style={styled.btnText}>login</Text>
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate('Signup')}
              style={styled.registerLink}>
              <Text style={styled.link}>
                Don't have an account? Register <Icon name="chevron-right" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}
