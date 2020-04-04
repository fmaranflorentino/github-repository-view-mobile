import React, { useEffect, useState } from 'react';
import { Text, ActivityIndicator } from 'react-native';

import api from '../../services/api';

import { Container } from './styles';

export default function User({ route }) {
  const { params } = route;
  const { user } = params;

  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

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
      {loading ? <ActivityIndicator color="#7159c1" /> : <Text>Oi</Text>}
    </Container>
  );
}
