import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text} from 'react-native';
import {Button, Card, Input, Item, Label} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';

const PasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required('Please insert your old password'),
  newPassword: Yup.string()
    .required('Please insert your new password')
    .min(8, 'Password min. 8 character'),
  confirmPassword: Yup.string()
    .required('Please confirm your new password')
    .oneOf([Yup.ref('newPassword'), null], "New password doesn't match"),
});

export default function ChangePassword() {
  return (
    <View style={styled.parent}>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={PasswordSchema}
        onSubmit={(values) => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styled.formWrapper}>
            <Card style={styled.card}>
              <Item
                success={!errors.oldPassword && touched.oldPassword}
                error={errors.oldPassword && touched.oldPassword}
                style={styled.inputWrapper}
                fixedLabel>
                <Label style={styled.label}>Old Password</Label>
                <Input
                  onChangeText={handleChange('oldPassword')}
                  onBlur={handleBlur('oldPassword')}
                  value={values.oldPassword}
                />
                {touched.oldPassword ? (
                  <Icon
                    color={errors.oldPassword ? 'red' : 'green'}
                    name={errors.oldPassword ? 'times-circle' : 'check-circle'}
                    size={20}
                  />
                ) : null}
              </Item>
              {errors.oldPassword && touched.oldPassword ? (
                <View style={styled.alertWrapper}>
                  <Icon style={styled.alertIcon} name="exclamation-triangle" />
                  <Text style={styled.alert}>{errors.oldPassword}</Text>
                </View>
              ) : null}
            </Card>
            <Card style={styled.card}>
              <Item
                success={!errors.newPassword && touched.newPassword}
                error={errors.newPassword && touched.newPassword}
                style={styled.inputWrapper}
                fixedLabel>
                <Label style={styled.label}>New Password</Label>
                <Input
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                />
                {touched.newPassword ? (
                  <Icon
                    color={errors.newPassword ? 'red' : 'green'}
                    name={errors.newPassword ? 'times-circle' : 'check-circle'}
                    size={20}
                  />
                ) : null}
              </Item>
              {errors.newPassword && touched.newPassword ? (
                <View style={styled.alertWrapper}>
                  <Icon style={styled.alertIcon} name="exclamation-triangle" />
                  <Text style={styled.alert}>{errors.newPassword}</Text>
                </View>
              ) : null}
            </Card>
            <Card style={styled.card}>
              <Item
                success={!errors.confirmPassword && touched.confirmPassword}
                error={errors.confirmPassword && touched.confirmPassword}
                style={styled.inputWrapper}
                fixedLabel>
                <Label style={styled.label}>Reenter New Password</Label>
                <Input
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                {touched.confirmPassword ? (
                  <Icon
                    color={errors.confirmPassword ? 'red' : 'green'}
                    name={
                      errors.confirmPassword ? 'times-circle' : 'check-circle'
                    }
                    size={20}
                  />
                ) : null}
              </Item>
              {errors.confirmPassword && touched.confirmPassword ? (
                <View style={styled.alertWrapper}>
                  <Icon style={styled.alertIcon} name="exclamation-triangle" />
                  <Text style={styled.alert}>{errors.confirmPassword}</Text>
                </View>
              ) : null}
            </Card>
            <Button onPress={handleSubmit} style={styled.btn} block rounded>
              <Text style={styled.btnText}>save</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
}
