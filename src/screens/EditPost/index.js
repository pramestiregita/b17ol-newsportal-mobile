/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Form, Input, Item, Textarea} from 'native-base';

import {API_URL} from '@env';

import styled from './style';
import myPostAction from '../../redux/actions/myPost';

import Toast from '../../components/Toast';
import Modal from '../../components/Modal';

const newsSchema = Yup.object().shape({
  title: Yup.string().required('Please insert news title'),
  news: Yup.string().required('Content must be filled'),
});

export default function CreatePost({navigation, route}) {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const {isSuccess, isError, isLoading, alertMsg, detail} = useSelector(
    (state) => state.myPost,
  );
  const data = detail[0];
  const dispatch = useDispatch();

  const selectImage = () => {
    let options = {
      title: 'You can choose one image',
      maxWidth: 750,
      maxHeight: 500,
      storageOption: {
        skipBackup: true,
      },
      noData: true,
      mediaType: 'photo',
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        Toast('No image selected');
      } else if (response.error) {
        Toast('Please try again!');
      } else {
        const form = new FormData();

        form.append('picture', {
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });

        try {
          const {id} = route.params;
          const {value} = await dispatch(
            myPostAction.editPict(token, id, form),
          );
          if (value.data.success) {
            await dispatch(myPostAction.getAll(token));
            navigation.navigate('MyPost');
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    });
  };

  const submit = async (v) => {
    try {
      const {id} = route.params;
      const {value} = await dispatch(myPostAction.edit(token, id, v));
      if (value.data.success) {
        await dispatch(myPostAction.getAll(token));
        setTimeout(() => {
          navigation.navigate('MyPost');
        }, 2000);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        setError(false);
        dispatch(myPostAction.clear());
      }, 2000);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        dispatch(myPostAction.clear());
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <View style={styled.parent}>
      <Modal visible={isLoading} type="load" />
      <Modal visible={error} type="error" message={alertMsg} />
      <Modal visible={success} type="success" />

      <ScrollView>
        <View style={styled.imagePicker}>
          <Image
            source={{uri: API_URL.concat(data.picture.image)}}
            style={styled.image}
            resizeMethod="resize"
          />
          <Button onPress={selectImage} style={styled.btn} block rounded>
            <Text style={styled.btnText}>Change Image</Text>
          </Button>
        </View>
        <Formik
          initialValues={{title: data.title, news: data.news}}
          validationSchema={newsSchema}
          onSubmit={(values) => submit(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styled.form}>
                <Item style={styled.title} regular stackedLabel>
                  <Input
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    placeholder="Write a title here"
                  />
                </Item>
                {errors.title && touched.title ? (
                  <Text style={styled.alert}>{errors.title}</Text>
                ) : null}
                <Form style={styled.content}>
                  <Textarea
                    rowSpan={values.news.length > 100 ? 20 : 10}
                    bordered
                    placeholder="Write a content here"
                    onChangeText={handleChange('news')}
                    onBlur={handleBlur('news')}
                    value={values.news}
                  />
                  {errors.news && touched.news ? (
                    <Text style={styled.alert}>{errors.news}</Text>
                  ) : null}
                </Form>
              </View>
              <Button onPress={handleSubmit} style={styled.btn} block rounded>
                <Text style={styled.btnText}>Save Changes</Text>
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
