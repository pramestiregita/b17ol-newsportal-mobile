import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    margin: 13,
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
  },
  profile: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 16,
    color: 'grey',
  },
  listWrapper: {
    marginTop: 50,
  },
  listLeft: {
    flexDirection: 'column',
  },
  listTitle: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  listIcon: {
    color: 'grey',
  },
  logout: {
    color: '#DB3022',
  },
});
