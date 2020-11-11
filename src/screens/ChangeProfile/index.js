import React from 'react';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {View, Text, Image} from 'react-native';
import {Button, Card, Input, Item, Label} from 'native-base';
import {Formik} from 'formik';
import * as Yup from 'yup';

import styled from './style';
import avatar from '../../assets/avatar.png';

const PasswordSchema = Yup.object().shape({
  name: Yup.string().required('Please insert your name'),
});

export default function ChangePassword() {
  const {data} = useSelector((state) => state.profile);

  return (
    <View style={styled.parent}>
      <View style={styled.avatar}>
        <View style={styled.content}>
          <Image resizeMethod="resize" style={styled.image} source={avatar} />
          <Button style={styled.btn} block rounded>
            <Text style={styled.btnText}>Change Picture</Text>
          </Button>
        </View>
      </View>
      <Formik
        initialValues={{
          name: data.fullName,
          email: data.email,
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
                success={!errors.name && touched.name}
                error={errors.name && touched.name}
                style={styled.inputWrapper}
                fixedLabel>
                <Label style={styled.label}>Name</Label>
                <Input
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {touched.name ? (
                  <Icon
                    color={errors.name ? 'red' : 'green'}
                    name={errors.name ? 'times-circle' : 'check-circle'}
                    size={20}
                  />
                ) : null}
              </Item>
              {errors.name && touched.name ? (
                <View style={styled.alertWrapper}>
                  <Icon style={styled.alertIcon} name="exclamation-triangle" />
                  <Text style={styled.alert}>{errors.name}</Text>
                </View>
              ) : null}
            </Card>
            <Card style={styled.card}>
              <Item
                success={!errors.email && touched.email}
                error={errors.email && touched.email}
                style={styled.inputWrapper}
                fixedLabel>
                <Label style={styled.label}>Email</Label>
                <Input
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email ? (
                  <Icon
                    color={errors.email ? 'red' : 'green'}
                    email={errors.email ? 'times-circle' : 'check-circle'}
                    size={20}
                  />
                ) : null}
              </Item>
              {errors.email && touched.email ? (
                <View style={styled.alertWrapper}>
                  <Icon style={styled.alertIcon} email="exclamation-triangle" />
                  <Text style={styled.alert}>{errors.email}</Text>
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
