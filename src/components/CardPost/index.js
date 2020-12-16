import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, ActionSheet} from 'native-base';
import {API_URL} from '@env';

import styled from './style';
import postAction from '../../redux/actions/myPost';
import newsAction from '../../redux/actions/news';

const BUTTONS = ['Delete', 'Cancel'];
const CANCEL_INDEX = 1;

export default function Post({item}) {
  const [] = useState(false);
  const [] = useState(false);
  const {token} = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      await dispatch(postAction.getAll(token));
    } catch (e) {
      console.log(e.message);
    }
  };

  const deletePost = async (index, id) => {
    try {
      if (index === 0) {
        await dispatch(postAction.delete(token, id));
      }
      getData();
    } catch (e) {
      console.log(e.message);
    }
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

  return (
    <TouchableOpacity
      onPress={() => detail(item.id)}
      key={item.id.toString()}
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
                  title: 'Are you sure to delete this post?',
                },
                (buttonIndex) => {
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
}
