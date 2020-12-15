import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, ScrollView} from 'react-native';
import {Text} from 'native-base';
import moment from 'moment';
import {API_URL} from '@env';

import styled from './style';

export default function NewsDetail() {
  const {detail: data} = useSelector((state) => state.news);

  return (
    Object.keys(data).length > 0 && (
      <View style={styled.parent}>
        <ScrollView>
          <View>
            <Text style={styled.title}>{data.title}</Text>
          </View>
          <View style={styled.subTitle}>
            <View style={styled.items}>
              <Icon style={styled.icon} name="user" />
              <Text note>{data.author.fullName}</Text>
            </View>
            <View style={styled.items}>
              <Icon style={styled.icon} name="clock" />
              <Text note>
                {moment(data.createdAt).format('MMM DD, YY HH:mm')}
              </Text>
            </View>
          </View>
          <Image
            style={styled.image}
            source={{
              uri:
                data.picture === null
                  ? 'https://via.placeholder.com/420.png?text=Newsportal'
                  : API_URL.concat(data.picture.image),
            }}
          />
          <View style={styled.content}>
            <Text>{data.news}</Text>
          </View>
        </ScrollView>
      </View>
    )
  );
}
