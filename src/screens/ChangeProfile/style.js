import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    paddingHorizontal: 10,
  },
  formWrapper: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
  },
  inputWrapper: {
    marginBottom: 3,
  },
  label: {
    flex: 1,
    fontSize: 15,
  },
  alertWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alert: {
    fontStyle: 'italic',
    color: '#e74b5b',
  },
  alertIcon: {
    marginRight: 5,
    color: '#e74b5b',
  },
  btn: {
    marginTop: 20,
    backgroundColor: '#e74b5b',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#2a363b',
    fontSize: 16,
  },
  avatar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  content: {
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
