import React from 'react';
import { Text } from 'react-native';

// import { Container } from './styles';

export default function User({ route }) {
  const { params } = route;
  const { user } = params;
  
  return <Text>{user.name}</Text>;
}
