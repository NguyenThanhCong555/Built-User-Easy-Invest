import React from 'react';
import { Avatar, Group, Text } from '@mantine/core';

type TStake = {
  projectId: number;
  avatar: string;
  name: string;
  value: string;
  onClick?: (e?: any) => void;
};

export const CardCoin = (props: TStake) => {
  return (
    <Group position="apart" onClick={props.onClick} style={{ cursor: 'pointer' }}>
      <Group spacing={8}>
        <Avatar src={props.avatar} w={54} h={54} radius={100} />
        <Text className="subtitle_4-bold">{props.name}</Text>
      </Group>
      <Text className="small_2-medium">{props.value}</Text>
    </Group>
  );
};
