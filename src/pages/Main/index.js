import React, { useState } from 'react';
import { Keyboard, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main({ navigation }) {
  const [users, setUsers] = useState([]);
  const [newValue, setNewValue] = useState();
  const [loading, setLoading] = useState(false);

  handleAddUser = async () => {
    try {
      setLoading(true);
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

      setUsers(usersArr);
      setNewValue('');

      Keyboard.dismiss();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  handleNavigation = (user) => {
    navigation.navigate('User', { user });
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

        <SubmitButton loading={loading} onPress={() => handleAddUser()}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>

      {users && users.length > 0 ? (
        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar_url }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>

              <ProfileButton onPress={() => handleNavigation(item)}>
                <ProfileButtonText>ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      ) : null}
    </Container>
  );
}
