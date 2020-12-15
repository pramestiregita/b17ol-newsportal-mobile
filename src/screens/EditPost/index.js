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
import newsAction from '../../redux/actions/news';

import Toast from '../../components/Toast';

const newsSchema = Yup.object().shape({
  title: Yup.string().required('Please insert news title'),
  news: Yup.string().required('Content must be filled'),
});

export default function CreatePost({navigation}) {
  const [image, setImage] = useState(null);
  const [imageSource, setSource] = useState({});
  const {token} = useSelector((state) => state.auth);
  const {isSuccess, detail} = useSelector((state) => state.myPost);
  const data = detail[0];
  const form = new FormData();
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
        Toast('No image selected');
      } else if (response.error) {
        Toast('Please try again!');
      } else {
        setImage(response.uri);
        setSource(response);
      }
    });
  };

  const submit = async (v) => {
    if (imageSource) {
      form.append('picture', {
        uri: imageSource.uri,
        name: imageSource.fileName,
        type: imageSource.type,
      });
    }
    form.append('title', v.title);
    form.append('news', v.news);
    console.log(form);

    // try {
    //   const {value} = await dispatch(myPostAction.create(token, form));
    //   if (value.data.success) {
    //     await dispatch(newsAction.getAll(token));
    //     navigation.navigate('Home');
    //   }
    // } catch (e) {
    //   console.log(e.message);
    // }
  };

  return (
    <View style={styled.parent}>
      {console.log(data)}
      <ScrollView>
        <View style={styled.imagePicker}>
          <Button onPress={selectImage} style={styled.btn} block rounded>
            <Text style={styled.btnText}>Select Image</Text>
          </Button>
          <Image
            source={{
              uri: image
                ? image
                : data.picture && API_URL.concat(data.picture.image),
            }}
            style={styled.image}
            resizeMethod="resize"
          />
        </View>
        <Formik
          initialValues={{title: data.title, news: data.news}}
          validationSchema={newsSchema}
          onSubmit={(values) => {
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
