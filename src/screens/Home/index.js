import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
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
import styled from './style';

export default function MyPost({navigation}) {
  const [sort, setSort] = useState(1);
  const {alertMsg} = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

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

  return (
    <View style={styled.parent}>
      <View style={styled.adv}>
        <View style={styled.searchBar}>
          <Card style={styled.search}>
            <Formik
              initialValues={{search: ''}}
              onSubmit={(values) =>
                values.search !== '' && console.log(values)
              }>
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
            onValueChange={(itemValue) => setSort(itemValue)}>
            <Picker.Item label="Newest" value={1} />
            <Picker.Item label="Oldest" value={2} />
          </Picker>
        </View>
      </View>
      <View style={styled.content}>
        <ScrollView>
          {[...Array(6)].map((i, o) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NewsDetail')}
                key={o}
                style={styled.cardWrapper}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{
                          uri:
                            'https://via.placeholder.com/150.png?text=Newsportal',
                        }}
                      />
                      <Body>
                        <Text style={styled.title}>
                          TitleTitleTitleTitle TitleTitle TitleTitleTitle
                          TitleTitle
                        </Text>
                        <Text note>Date</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{
                        uri:
                          'https://via.placeholder.com/420x220.png?text=Newsportal',
                      }}
                      style={styled.image}
                    />
                  </CardItem>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
