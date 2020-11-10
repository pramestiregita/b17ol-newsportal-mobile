import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
  },
  searchBar: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a363b',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '95%',
    height: '70%',
    alignItems: 'center',
    paddingRight: 10,
    borderRadius: 5,
  },
  input: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 10,
  },
});
