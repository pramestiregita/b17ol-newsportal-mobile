/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, TouchableOpacity, View} from 'react-native';
import {H3, Left, List, ListItem, Right, Thumbnail} from 'native-base';
import {API_URL} from '@env';

import styled from './style';
import placeholder from '../../assets/avatar.png';
import profileAction from '../../redux/actions/profile';

import Modal from '../../components/Modal';

export default function MyProfile({navigation}) {
  const [loading, setLoading] = useState(false);
  const {data, isLoading} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      await dispatch(profileAction.getProfile(token));
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const doLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({type: 'LOGOUT'});
    }, 2000);
  };

  return (
    Object.keys(data).length > 0 && (
      <View style={styled.parent}>
        <Modal visible={isLoading || loading} type="load" />

        <View key={data.id} style={styled.profileWrapper}>
          <Thumbnail
            large
            source={
              data.avatar
                ? {uri: API_URL.concat(data.avatar.image)}
                : placeholder
            }
          />
          <View style={styled.profile}>
            <H3 style={styled.profileName}>{data.fullName}</H3>
            <Text style={styled.profileEmail}>{data.email}</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangeProfile')}>
            <Icon name="user-edit" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styled.listWrapper}>
          <List>
            <ListItem
              onPress={() => navigation.navigate('ChangePassword')}
              button
              first>
              <Left style={styled.listLeft}>
                <Text style={styled.listTitle}>Change Password</Text>
              </Left>
              <Right>
                <Icon style={styled.listIcon} name="chevron-right" />
              </Right>
            </ListItem>
            <ListItem onPress={() => doLogout()} button last>
              <Left style={styled.listLeft}>
                <Text style={[styled.listTitle, styled.logout]}>Logout</Text>
              </Left>
              <Right>
                <Icon
                  style={[styled.listIcon, styled.logout]}
                  name="chevron-right"
                />
              </Right>
            </ListItem>
          </List>
        </View>
      </View>
    )
  );
}
