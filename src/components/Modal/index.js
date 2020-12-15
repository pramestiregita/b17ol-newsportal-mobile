import React from 'react';
import {ActivityIndicator, StyleSheet, Text} from 'react-native';
import Modal, {ModalContent} from 'react-native-modals';
import Icon from 'react-native-vector-icons/Feather';

export default function index({visible, type, message}) {
  return (
    <Modal
      modalStyle={styled.parent}
      rounded
      visible={visible}
      width={200}
      height={200}>
      {type === 'load' ? (
        <ModalContent>
          <ActivityIndicator size="large" color="#e74b5b" />
          <Text style={styled.message}>Loading</Text>
        </ModalContent>
      ) : type === 'error' ? (
        <ModalContent style={styled.alert}>
          <Icon name="alert-circle" size={40} color="red" />
          <Text style={[styled.message, styled.errorMsg]}>{message}</Text>
        </ModalContent>
      ) : (
        type === 'success' && (
          <ModalContent style={styled.alert}>
            <Icon name="check-circle" size={40} color="green" />
            <Text style={[styled.message, styled.successMsg]}>Success</Text>
          </ModalContent>
        )
      )}
    </Modal>
  );
}

const styled = StyleSheet.create({
  parent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alert: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMsg: {
    color: 'red',
  },
  successMsg: {
    color: 'green',
  },
  message: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'bold',
  },
});
