import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Card, CardItem, Text, Left, Thumbnail, Body} from 'native-base';
import moment from 'moment';
import {API_URL} from '@env';

import newsAction from '../../redux/actions/news';

export default function CardNews({item}) {
  const {token} = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      onPress={async () => {
        await dispatch(newsAction.getDetail(token, item.id));
        navigation.navigate('NewsDetail');
      }}
      key={item.id.toString()}
      style={styled.cardWrapper}>
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              source={{
                uri: item.author.avatar
                  ? API_URL.concat(item.author.avatar.image)
                  : 'https://via.placeholder.com/150.png?text=Newsportal',
              }}
            />
            <Body>
              <Text style={styled.title}>{item.title}</Text>
              <Text note>
                {moment(item.createdAt).format('MMM DD, YY HH:mm')}
              </Text>
              <Text note>{item.author.fullName}</Text>
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
}

const styled = StyleSheet.create({
  cardWrapper: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    height: 200,
    width: 410,
    flex: 1,
  },
});
