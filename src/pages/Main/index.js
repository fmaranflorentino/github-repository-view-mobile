import React, { useState } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newValue, setNewValue] = useState();

  handleAddUser = () => {
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newValue}
          onChangeText={text => setNewValue(text)}
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
