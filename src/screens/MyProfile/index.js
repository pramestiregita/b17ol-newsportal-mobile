import React from 'react';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Text, TouchableOpacity, View} from 'react-native';
import {H3, Left, List, ListItem, Right, Thumbnail} from 'native-base';

import styled from './style';
import placeholder from '../../assets/avatar.png';

export default function MyProfile({navigation}) {
  const dispatch = useDispatch();
  return (
    <View style={styled.parent}>
      {/* <View key={i.id} style={styled.profileWrapper}> */}
      <View style={styled.profileWrapper}>
        <Thumbnail large source={placeholder} />
        <View style={styled.profile}>
          <H3 style={styled.profileName}>Name</H3>
          <Text style={styled.profileEmail}>Email</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ChangeProfile')}>
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
          {/* <ListItem onPress={this.logout} button> */}
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
  );
}
