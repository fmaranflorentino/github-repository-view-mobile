import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default function User({ route }) {
  const { params } = route;
  const { user } = params;

  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  console.tron.log(user);

  useEffect(() => {
    async function loadUserInfo() {
      try {
        setLoading(true);

        const response = await api.get(`/users/${user.login}/starred`);

        setUserInfo(response.data);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    loadUserInfo();
  }, []);

  return (
    <Container>
      {loading ? (
        <ActivityIndicator color="#7159c1" />
      ) : (
        <>
          <Header>
            <Avatar source={{ uri: user.avatar_url }} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>
          </Header>

          <Stars
            data={userInfo}
            keyExtractor={(star) => String(star.id)}
            renderItem={({ item }) => (
              <Starred>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        </>
      )}
    </Container>
  );
}
