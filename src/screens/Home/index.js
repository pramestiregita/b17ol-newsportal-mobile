import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import {
  Card,
  CardItem,
  Text,
  Item,
  Input,
  Picker,
  Left,
  Thumbnail,
  Body,
  Toast,
} from 'native-base';
import {Formik} from 'formik';
import moment from 'moment';
import {API_URL} from '@env';

import styled from './style';
import newsAction from '../../redux/actions/news';

export default function MyPost({navigation}) {
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState('desc');
  let [data, setData] = useState([]);
  let [pageInfo, setPageInfo] = useState({});
  const {alertMsg, token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    const {value} = await dispatch(newsAction.getAll(token));
    setData(value.data.data);
    setPageInfo(value.data.pageInfo);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (alertMsg !== '') {
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
  }, [alertMsg]);

  const nextPage = async () => {
    const {value} = await dispatch(newsAction.next(token, pageInfo.nextLink));
    const nextData = [...data, ...value.data.data];
    console.log(nextData);
    setData(nextData);
    setPageInfo(value.data.pageInfo);
  };

  const searching = async (key) => {
    const {value} = await dispatch(newsAction.search(token, key));
    setData(value.data.data);
    setPageInfo(value.data.pageInfo);
  };

  const sorting = async (v) => {
    setSort(v);
    const {value} = await dispatch(newsAction.sort(token, v));
    setData(value.data.data);
    setPageInfo(value.data.pageInfo);
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('NewsDetail', {id: item.id})}
        key={item.id}
        style={styled.cardWrapper}>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: 'https://via.placeholder.com/150.png?text=Newsportal',
                }}
              />
              <Body>
                <Text style={styled.title}>{item.title}</Text>
                <Text note>
                  {moment(item.createdAt).format('MMM DD, YY HH:mm')}
                </Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  item.picture === null
                    ? 'https://via.placeholder.com/420.png?text=Newsportal'
                    : API_URL.concat(item.picture.image),
              }}
              style={styled.image}
            />
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
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
          data={data}
          renderItem={renderItem}
          refreshing={loading}
          onRefresh={getData}
          onEndReached={nextPage}
          onEndReachedThreshold={(0, 5)}
        />
      </View>
    </View>
  );
}
