import React, { useState } from 'react';
import { Keyboard } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newValue, setNewValue] = useState();

  handleAddUser = async () => {
    const response = await api.get(`/users/${newValue}`);

    const { name, login, bio, avatar_url } = response.data;

    const usersArr = [
      ...users,
      {
        name,
        login,
        bio,
        avatar_url,
      },
    ];


    setUsers([usersArr]);
    setNewValue('');

    Keyboard.dismiss();
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newValue}
          onChangeText={(text) => setNewValue(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />

        <SubmitButton onPress={() => handleAddUser()}>
          <Icon name="add" size={20} color="#fff" />
        </SubmitButton>
      </Form>
    </Container>
  );
}
