import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Card, CardItem, Text, Item, Input, Picker} from 'native-base';
import {Formik} from 'formik';
import styled from './style';

export default function MyPost() {
  const [sort, setSort] = useState(1);

  useEffect(() => {
    console.log(sort);
  }, [sort]);

  return (
    <View style={styled.parent}>
      <View style={styled.searchBar}>
        <Formik
          initialValues={{search: ''}}
          onSubmit={(values) => values.search !== '' && console.log(values)}>
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
                <Icon name="search" size={15} />
              </TouchableOpacity>
            </Item>
          )}
        </Formik>
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
      <View style={styled.content}>
        <ScrollView>
          {[...Array(6)].map((i, o) => {
            return (
              <TouchableOpacity
                onPress={() => console.log('card')}
                key={o}
                style={styled.cardWrapper}>
                <Card>
                  <CardItem>
                    <Text style={styled.title}>
                      TitleTitleTitleTitleTitleTitleTitleTitleTitle TitleTitle
                    </Text>
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
                  <View style={styled.iconWrapper}>
                    <TouchableOpacity
                      onPress={() => console.log('edit')}
                      style={styled.iconEdit}>
                      <Icon style={styled.icon} name="pencil-alt" size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => console.log('delete')}
                      style={styled.iconDelete}>
                      <Icon style={styled.icon} name="trash-alt" size={15} />
                    </TouchableOpacity>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
