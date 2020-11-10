import React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';

import styled from './style';

export default function NewsDetail() {
  return (
    <View style={styled.parent}>
      <ScrollView>
        <View>
          <Text style={styled.title}>Title</Text>
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
