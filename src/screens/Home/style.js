import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 5,
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 10,
  },
  header: {
    width: 300,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    height: 200,
    width: 410,
    flex: 1,
  },
  adv: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    paddingLeft: 5,
    flex: 1,
  },
  search: {
    borderRadius: 30,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  input: {
    flex: 1,
    alignItems: 'center',
  },
  sortWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
  },
  sort: {
    width: 120,
  },
});
