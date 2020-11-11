import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, Image, ScrollView} from 'react-native';
import {Button, Card, Input, Item, Label, Toast} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';
import avatar from '../../assets/avatar.png';
import profileAction from '../../redux/actions/profile';

const ProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('Please insert your name'),
  email: Yup.string()
    .email('Please input a valid email')
    .required('Please insert your name'),
});

export default function ChangePassword() {
  const [data, setData] = useState({});
  const {alertMsg, isSuccess} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    const {value} = await dispatch(profileAction.getProfile(token));
    setData(value.data.data);
    console.log(data);
  };

  const update = async (values) => {
    await dispatch(profileAction.editProfile(token, values));
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      getData();
      Toast.show({
        text: alertMsg,
        duration: 3000,
        position: 'top',
        type: 'success',
        textStyle: {
          fontWeight: 'bold',
        },
      });
    }
  }, [isSuccess, alertMsg]);

  return (
    Object.keys(data).length > 0 && (
      <View style={styled.parent}>
        <ScrollView>
          <View style={styled.avatar}>
            <View style={styled.content}>
              <Image
                resizeMethod="resize"
                style={styled.image}
                source={avatar}
              />
              <Button style={styled.btn} block rounded>
                <Text style={styled.btnText}>Change Picture</Text>
              </Button>
            </View>
          </View>
          <Formik
            initialValues={{
              fullName: data.fullName,
              email: data.email,
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => update(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styled.formWrapper}>
                <Card style={styled.card}>
                  <Item
                    success={!errors.fullName && touched.fullName}
                    error={errors.fullName && touched.fullName}
                    style={styled.inputWrapper}
                    fixedLabel>
                    <Label style={styled.label}>Name</Label>
                    <Input
                      onChangeText={handleChange('fullName')}
                      onBlur={handleBlur('fullName')}
                      value={values.fullName}
                    />
                    {touched.fullName ? (
                      <Icon
                        color={errors.fullName ? 'red' : 'green'}
                        name={errors.fullName ? 'times-circle' : 'check-circle'}
                        size={20}
                      />
                    ) : null}
                  </Item>
                  {errors.fullName && touched.fullName ? (
                    <View style={styled.alertWrapper}>
                      <Icon
                        style={styled.alertIcon}
                        name="exclamation-triangle"
                      />
                      <Text style={styled.alert}>{errors.fullName}</Text>
                    </View>
                  ) : null}
                </Card>
                <Card style={styled.card}>
                  <Item
                    success={!errors.email && touched.email}
                    error={errors.email && touched.email}
                    style={styled.inputWrapper}
                    fixedLabel>
                    <Label style={styled.label}>Email</Label>
                    <Input
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email ? (
                      <Icon
                        color={errors.email ? 'red' : 'green'}
                        email={errors.email ? 'times-circle' : 'check-circle'}
                        size={20}
                      />
                    ) : null}
                  </Item>
                  {errors.email && touched.email ? (
                    <View style={styled.alertWrapper}>
                      <Icon
                        style={styled.alertIcon}
                        email="exclamation-triangle"
                      />
                      <Text style={styled.alert}>{errors.email}</Text>
                    </View>
                  ) : null}
                </Card>
                <Button onPress={handleSubmit} style={styled.btn} block rounded>
                  <Text style={styled.btnText}>save</Text>
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    )
  );
}
