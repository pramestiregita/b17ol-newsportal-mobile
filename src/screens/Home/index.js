/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, TouchableOpacity, FlatList, ToastAndroid} from 'react-native';
import {Card, Item, Input, Picker} from 'native-base';
import {Formik} from 'formik';
import RNBootSplash from 'react-native-bootsplash';

import styled from './style';
import newsAction from '../../redux/actions/news';

import List from '../../components/CardNews';

export default function MyPost({}) {
  const [loading] = useState(false);
  const [sort, setSort] = useState('desc');
  const {alertMsg, token} = useSelector((state) => state.auth);
  const {data: news, pageInfo} = useSelector((state) => state.news);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      await dispatch(newsAction.getAll(token));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
    RNBootSplash.hide({});
  }, []);

  useEffect(() => {
    if (alertMsg !== '') {
      ToastAndroid.showWithGravity(
        alertMsg,
        ToastAndroid.LONG,
        ToastAndroid.TOP,
      );
      dispatch({type: 'CLEAR'});
    }
  }, [alertMsg]);

  const nextPage = async () => {
    if (pageInfo.nextLink) {
      try {
        await dispatch(newsAction.next(token, pageInfo.nextLink));
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const searching = async (key) => {
    try {
      await dispatch(newsAction.search(token, key));
    } catch (e) {
      console.log(e.message);
    }
  };

  const sorting = async (v) => {
    try {
      setSort(v);
      await dispatch(newsAction.sort(token, v));
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styled.parent}>
      <View style={styled.adv}>
        <View style={styled.searchBar}>
          <Card style={styled.search}>
            <Formik
              initialValues={{search: ''}}
              onSubmit={(values) => searching(values.search)}>
              {({handleChange, handleBlur, handleSubmit, values}) => (
                <Item style={styled.inputWrapper}>
                  <Input
                    style={styled.input}
                    onChangeText={handleChange('search')}
                    onBlur={handleBlur('search')}
                    value={values.search}
                    placeholder="Search"
                    onSubmitEditing={handleSubmit}
                  />
                  <TouchableOpacity onPress={handleSubmit}>
                    <Icon name="search" size={20} />
                  </TouchableOpacity>
                </Item>
              )}
            </Formik>
          </Card>
        </View>
        <View style={styled.sortWrapper}>
          <Picker
            note
            mode="dropdown"
            style={styled.sort}
            selectedValue={sort}
            onValueChange={(itemValue) => {
              sorting(itemValue);
            }}>
            <Picker.Item label="Newest" value={'desc'} />
            <Picker.Item label="Oldest" value={'asc'} />
          </Picker>
        </View>
      </View>
      <View style={styled.content}>
        <FlatList
          data={news}
          renderItem={({item}) => <List item={item} />}
          refreshing={loading}
          onRefresh={getData}
          onEndReached={nextPage}
          onEndReachedThreshold={(0, 5)}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}
