/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, TouchableOpacity, View} from 'react-native';
import {H3, Left, List, ListItem, Right, Thumbnail} from 'native-base';
import {API_URL} from '@env';

import styled from './style';
import placeholder from '../../assets/avatar.png';
import profileAction from '../../redux/actions/profile';

export default function MyProfile({navigation}) {
  const {data} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getData = async () => {
    await dispatch(profileAction.getProfile(token));
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    Object.keys(data).length > 0 && (
      <View style={styled.parent}>
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
            <ListItem onPress={() => dispatch({type: 'LOGOUT'})} button last>
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
