import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2a363b',
    paddingHorizontal: 100,
  },
  logo: {
    flex: 1,
    width: 200,
    height: 130,
  },
  btnWrapper: {
    flex: 1,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnLogin: {
    borderWidth: 2,
    borderColor: '#e74b5b',
  },
  btnLoginText: {
    color: '#e74b5b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  text: {
    marginVertical: 10,
    textTransform: 'uppercase',
    color: '#e74b5b',
    fontWeight: 'bold',
  },
  btnSignup: {
    backgroundColor: '#e74b5b',
  },
  btnSignupText: {
    color: '#2a363b',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
