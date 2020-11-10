import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  parent: {
    flex: 1,
    padding: 50,
    backgroundColor: '#2a363b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 500,
    height: 100,
  },
  formWrapper: {
    // marginVertical: 50,
    width: '100%',
  },
  inputWrapper: {
    borderBottomColor: '#e74b5b',
    marginVertical: 10,
  },
  label: {
    color: '#e74b5b',
  },
  input: {
    color: '#e74b5b',
  },
  alert: {
    color: '#e74b5b',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  btn: {
    backgroundColor: '#e74b5b',
    marginVertical: 20,
  },
  btnText: {
    textTransform: 'uppercase',
    color: '#2a363b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#e74b5b',
    fontWeight: 'bold',
  },
  loginLink: {
    alignSelf: 'center',
  },
});
