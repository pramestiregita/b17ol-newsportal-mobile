import {Button, Form, Input, Item, Label, Textarea} from 'native-base';
import React from 'react';
import {View, Text} from 'react-native';

import styled from './style';

export default function EditPost() {
  return (
    <View style={styled.parent}>
      <View style={styled.form}>
        <Item regular>
          <Input placeholder="Title" />
        </Item>
        <Form style={styled.content}>
          <Textarea rowSpan={10} bordered placeholder="Content" />
        </Form>
      </View>
      <Button style={styled.btn} block rounded>
        <Text style={styled.btnText}>Select Image</Text>
      </Button>
      <Button style={styled.btn} block rounded>
        <Text style={styled.btnText}>Write News</Text>
      </Button>
    </View>
  );
}
