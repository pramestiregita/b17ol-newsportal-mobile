/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Button, Form, Input, Item, Textarea} from 'native-base';

import styled from './style';
import myPostAction from '../../redux/actions/myPost';
import newsAction from '../../redux/actions/news';

import Toast from '../../components/Toast';
import Modal from '../../components/Modal';

const newsSchema = Yup.object().shape({
  title: Yup.string().required('Please insert news title'),
  news: Yup.string().required('Content must be filled'),
});

export default function CreatePost({navigation}) {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imageSource, setSource] = useState({});
  const {token} = useSelector((state) => state.auth);
  const {isLoading, isError, isSuccess, alertMsg} = useSelector(
    (state) => state.myPost,
  );

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

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        Toast('Please select an image');
      } else if (response.error) {
        Toast('Please try again later!');
      } else {
        setImage(response.uri);
        setSource(response);
      }
    });
  };

  const submit = async (v) => {
    const form = new FormData();

    form.append('picture', {
      uri: imageSource.uri,
      name: imageSource.fileName,
      type: imageSource.type,
    });
    form.append('title', v.title);
    form.append('news', v.news);

    try {
      const {value} = await dispatch(myPostAction.create(token, form));
      if (value.data.success) {
        await dispatch(newsAction.getAll(token));
        setTimeout(() => {
          navigation.navigate('Home');
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
          <Button onPress={selectImage} style={styled.btn} block rounded>
            <Text style={styled.btnText}>Select Image</Text>
          </Button>
          {image !== null && (
            <Image
              source={{uri: image}}
              style={styled.image}
              resizeMethod="resize"
            />
          )}
        </View>
        <Formik
          initialValues={{title: '', news: ''}}
          validationSchema={newsSchema}
          onSubmit={(values) => {
            console.log(values);
            submit(values);
          }}>
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
                    rowSpan={10}
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
                <Text style={styled.btnText}>Write News</Text>
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  );
}
