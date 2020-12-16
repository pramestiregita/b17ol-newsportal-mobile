/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, Image, ScrollView} from 'react-native';
import {Button, Card, Input, Item, Label} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {API_URL} from '@env';

import styled from './style';
import avatar from '../../assets/avatar.png';
import profileAction from '../../redux/actions/profile';

import Modal from '../../components/Modal';
import Toast from '../../components/Toast';

const ProfileSchema = Yup.object().shape({
  fullName: Yup.string().required('Please insert your name'),
  email: Yup.string()
    .email('Please input a valid email')
    .required('Please insert your name'),
});

export default function ChangePassword() {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {data: profile, alertMsg, isSuccess, isLoading, isError} = useSelector(
    (state) => state.profile,
  );
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const {value} = await dispatch(profileAction.getProfile(token));
      setData(value.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const update = async (values) => {
    try {
      await dispatch(profileAction.editProfile(token, values));
    } catch (e) {
      console.log(e.message);
    }
  };

  const selectImage = () => {
    const options = {
      title: 'Silahkan pilih gambar',
      maxWidth: 256,
      maxHeight: 256,
      storageOptions: {
        skipBackup: true,
      },
      noData: true,
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.error) {
        Toast('Coba lagi nanti!');
      } else if (response.didCancel) {
        Toast('Tidak ada gambar terpilih');
      } else {
        const form = new FormData();

        form.append('picture', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });

        try {
          if (profile.avatar) {
            await dispatch(profileAction.changeAvatar(token, form));
          } else {
            await dispatch(profileAction.addAvatar(token, form));
          }
          getData();
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        setError(false);
        dispatch(profileAction.clear());
      }, 2000);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        dispatch(profileAction.clear());
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <View style={styled.parent}>
      <Modal visible={isLoading} type="load" />
      <Modal visible={error} type="error" message={alertMsg} />
      <Modal visible={success} type="success" />

      {Object.keys(data).length > 0 ? (
        <ScrollView>
          <View style={styled.avatar}>
            <View style={styled.content}>
              <Image
                resizeMethod="resize"
                style={styled.image}
                source={
                  data.avatar
                    ? {uri: API_URL.concat(data.avatar.image)}
                    : avatar
                }
              />
              <Button onPress={selectImage} style={styled.btn} block rounded>
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
      ) : null}
    </View>
  );
}
