/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
} from 'react-native';
import {Button} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';
import logo from '../../assets/icon.png';
import authAction from '../../redux/actions/auth';

import Modal from '../../components/Modal';

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
  const [error, setError] = useState(false);
  const {isSuccess, isLoading, isError, alertMsg} = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  const fullName = useRef();
  const email = useRef();
  const password = useRef();

  const doSignUp = async (values) => {
    try {
      await dispatch(authAction.signup(values));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      fullName.current.clear();
      email.current.clear();
      password.current.clear();
      dispatch({type: 'CLEAR'});
      navigation.navigate('Login');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      setTimeout(() => {
        dispatch({type: 'CLEAR'});
      }, 3000);
    }
  }, [isError]);

  return (
    <View style={styled.parent}>
      <Modal visible={isLoading} type="load" />
      <Modal visible={error} type="error" message={alertMsg} />

      <Image style={styled.logo} source={logo} />
      <Formik
        initialValues={{fullName: '', email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          Keyboard.dismiss();
          doSignUp(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styled.formWrapper}>
            <View style={styled.inputWrapper}>
              <Text style={styled.label}>Full Name</Text>
              <TextInput
                ref={fullName}
                style={styled.input}
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
              />
            </View>
            {errors.fullName && touched.fullName ? (
              <Text style={styled.alert}>{errors.fullName}</Text>
            ) : null}
            <View style={styled.inputWrapper}>
              <Text style={styled.label}>Email</Text>
              <TextInput
                ref={email}
                style={styled.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email ? (
              <Text style={styled.alert}>{errors.email}</Text>
            ) : null}
            <View style={styled.inputWrapper}>
              <Text style={styled.label}>Password</Text>
              <TextInput
                ref={password}
                secureTextEntry
                style={styled.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            {errors.password && touched.password ? (
              <Text style={styled.alert}>{errors.password}</Text>
            ) : null}
            <Button onPress={handleSubmit} style={styled.btn} block rounded>
              <Text style={styled.btnText}>signup</Text>
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
