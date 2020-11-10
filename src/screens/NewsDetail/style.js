import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 10,
  },
  subTitle: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
    color: 'grey',
  },
});
