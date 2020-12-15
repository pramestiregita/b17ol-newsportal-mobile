import React, {useEffect, useState} from 'react';
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
  email: Yup.string()
    .email('Please input a valid email (example@mail.com)')
    .required('Please input your email'),
  password: Yup.string()
    .required('Please input your password')
    .min(8, 'Password min. 8 character'),
});

export default function Login({navigation}) {
  const [error, setError] = useState(false);

  const {alertMsg, isError, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const doLogin = async (values) => {
    try {
      await dispatch(authAction.login(values));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }, [isError]);

  return (
    <View style={styled.parent}>
      <Modal visible={isLoading} type="load" />
      <Modal visible={error} type="error" message={alertMsg} />

      <Image style={styled.logo} source={logo} />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          Keyboard.dismiss();
          doLogin(values);
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
            <View style={styled.inputWrapper} floatingLabel>
              <Text style={styled.label}>Email</Text>
              <TextInput
                style={styled.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email ? (
              <Text style={styled.alert}>{errors.email}</Text>
            ) : null}
            <View style={styled.inputWrapper} floatingLabel>
              <Text style={styled.label}>Password</Text>
              <TextInput
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
