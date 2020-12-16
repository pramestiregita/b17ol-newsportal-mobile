/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Card, Item, Input, Picker} from 'native-base';
import {Formik} from 'formik';

import styled from './style';
import postAction from '../../redux/actions/myPost';

import List from '../../components/CardPost';
import Modal from '../../components/Modal';

export default function MyPost() {
  const [sort, setSort] = useState('none');
  const [loading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const {token} = useSelector((state) => state.auth);
  const {isLoading: newsLoading} = useSelector((state) => state.news);
  const {
    data: post,
    pageInfo,
    isLoading,
    isError,
    isSuccess,
    alertMsg,
  } = useSelector((state) => state.myPost);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      await dispatch(postAction.getAll(token));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const nextPage = async () => {
    if (pageInfo.nextLink) {
      try {
        await dispatch(postAction.next(token, pageInfo.nextLink));
      } catch (e) {
        console.log(e.message);
      }
    }
  };

  const searching = async (key) => {
    try {
      await dispatch(postAction.search(token, key));
    } catch (e) {
      console.log(e.message);
    }
  };

  const sorting = async (v) => {
    try {
      setSort(v);
      await dispatch(postAction.sort(token, v));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isError) {
      setError(true);
      setTimeout(() => {
        setError(false);
        dispatch(postAction.clear());
      }, 2000);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        dispatch(postAction.clear());
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <View style={styled.parent}>
      <Modal visible={isLoading || newsLoading} type="load" />
      <Modal visible={error} type="error" message={alertMsg} />
      <Modal visible={success} type="success" />

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
                    onSubmitEditing={handleSubmit}
                    value={values.search}
                    placeholder="Search"
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
            onValueChange={(itemValue) => sorting(itemValue)}>
            {/* <Picker.Item label="Sort" value={'none'} /> */}
            <Picker.Item label="Newest" value={'desc'} />
            <Picker.Item label="Oldest" value={'asc'} />
          </Picker>
        </View>
      </View>
      <View style={styled.content}>
        <FlatList
          data={post}
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
