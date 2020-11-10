import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Item, Input} from 'native-base';
import {Formik} from 'formik';

import styled from './style';
import List from '../../components/CardNews';

export default function Home() {
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
      <ScrollView style={styled.content}>
        {[...Array(5)].map(() => {
          return <List />;
        })}
      </ScrollView>
    </View>
  );
}
