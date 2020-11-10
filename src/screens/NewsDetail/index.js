import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, ScrollView} from 'react-native';
import {Text} from 'native-base';

import styled from './style';

export default function NewsDetail() {
  return (
    <View style={styled.parent}>
      <ScrollView>
        <View>
          <Text style={styled.title}>Title</Text>
        </View>
        <View style={styled.subTitle}>
          <View style={styled.items}>
            <Icon style={styled.icon} name="user" />
            <Text note>Author</Text>
          </View>
          <View style={styled.items}>
            <Icon style={styled.icon} name="clock" />
            <Text note>date</Text>
          </View>
        </View>
        <Image
          style={styled.image}
          source={{
            uri: 'https://via.placeholder.com/420x220.png?text=Newsportal',
          }}
        />
        <View style={styled.content}>
          <Text>A</Text>
        </View>
      </ScrollView>
    </View>
  );
}
