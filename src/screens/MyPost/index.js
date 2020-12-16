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
  Toast,
  ActionSheet,
} from 'native-base';
import {Formik} from 'formik';
import {API_URL} from '@env';

import styled from './style';
import postAction from '../../redux/actions/myPost';
import newsAction from '../../redux/actions/news';

const BUTTONS = ['Delete', 'Cancel'];
// const DESTRUCTIVE_INDEX = 0;
const CANCEL_INDEX = 1;

export default function MyPost({navigation}) {
  const [sort, setSort] = useState('none');
  const [loading, setLoading] = useState(false);
  let [data, setData] = useState([]);
  let [pageInfo, setPageInfo] = useState({});
  const {token} = useSelector((state) => state.auth);
  const {alertMsg, isSuccess} = useSelector((state) => state.myPost);
  const dispatch = useDispatch();

  const getData = async () => {
    const {value} = await dispatch(postAction.getAll(token));
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
        type: isSuccess ? 'success' : 'danger',
        textStyle: {
          fontWeight: 'bold',
        },
      });
    }
  }, [alertMsg]);

  const nextPage = async () => {
    const {value} = await dispatch(postAction.next(token, pageInfo.nextLink));
    const nextData = [...data, ...value.data.data];
    setData(nextData);
    setPageInfo(value.data.pageInfo);
  };

  const searching = async (key) => {
    const {value} = await dispatch(postAction.search(token, key));
    setData(value.data.data);
    setPageInfo(value.data.pageInfo);
  };

  const sorting = async (v) => {
    // setSort(v);
    const {value} = await dispatch(postAction.sort(token, v));
    setData(value.data.data);
    setPageInfo(value.data.pageInfo);
  };

  const deletePost = async (index, id) => {
    if (index === 0) {
      await dispatch(postAction.delete(token, id));
    }
    getData();
  };

  const detail = async (id) => {
    try {
      await dispatch(newsAction.getDetail(token, id));
      navigation.navigate('NewsDetail', {id});
    } catch (e) {
      console.log(e.message);
    }
  };

  const edit = async (id) => {
    try {
      await dispatch(postAction.getDetail(token, id));
      navigation.navigate('EditPost', {id});
    } catch (e) {
      console.log(e.message);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => detail(item.id)}
        key={item.id}
        style={styled.cardWrapper}>
        <Card>
          <CardItem>
            <Text style={styled.title}>{item.title}</Text>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  item.picture === null
                    ? 'https://via.placeholder.com/400x200.png?text=Newsportal'
                    : API_URL.concat(item.picture.image),
              }}
              style={styled.image}
            />
          </CardItem>
          <View style={styled.iconWrapper}>
            <TouchableOpacity
              onPress={() => edit(item.id)}
              style={styled.iconEdit}>
              <Icon style={styled.icon} name="pencil-alt" size={15} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                ActionSheet.show(
                  {
                    options: BUTTONS,
                    cancelButtonIndex: CANCEL_INDEX,
                    // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                    title: 'Are you sure to delete this post?',
                  },
                  (buttonIndex) => {
                    // setClicked(BUTTONS[]);
                    deletePost(buttonIndex, item.id);
                  },
                )
              }
              style={styled.iconDelete}>
              <Icon style={styled.icon} name="trash-alt" size={15} />
            </TouchableOpacity>
          </View>
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
            // selectedValue={sort}
            onValueChange={(itemValue) => sorting(itemValue)}>
            {/* <Picker.Item label="Sort" value={'none'} /> */}
            <Picker.Item label="Newest" value={'desc'} />
            <Picker.Item label="Oldest" value={'asc'} />
          </Picker>
        </View>
      </View>
      <View style={styled.content}>
        {Object.keys(data).length > 0 && (
          <FlatList
            data={data}
            renderItem={renderItem}
            refreshing={loading}
            onRefresh={getData}
            onEndReached={nextPage}
            onEndReachedThreshold={(0, 5)}
          />
        )}
      </View>
    </View>
  );
}
