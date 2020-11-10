import React from 'react';
import {View, Image} from 'react-native';
import {Card, CardItem, Thumbnail, Left, Body, Text} from 'native-base';

import styled from './style';
import avatar from '../../assets/avatar.png';

export default function CardNews() {
  return (
    <View style={styled.content}>
      <Card style={styled.card}>
        <CardItem>
          <Left>
            <Thumbnail source={avatar} />
            <Body>
              <Text>Name</Text>
              <Text note>Date</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{
              uri: 'https://via.placeholder.com/420x220.png?text=Newsportal',
            }}
            style={styled.image}
          />
        </CardItem>
      </Card>
    </View>
  );
}
