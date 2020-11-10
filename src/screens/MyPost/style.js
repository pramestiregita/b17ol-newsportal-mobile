import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 5,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  header: {
    width: 300,
    marginRight: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    width: '100%',
    height: 30,
  },
  icon: {
    color: 'white',
  },
  iconEdit: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#2a363b',
  },
  iconDelete: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    backgroundColor: '#e74b5b',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    height: 200,
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
    paddingLeft: 10,
  },
  sortWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
  },
  sort: {
    width: 150,
  },
});
