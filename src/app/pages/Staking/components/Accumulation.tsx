import React from 'react';

import { ReactComponent as IconMark } from 'assets/icons/notification/accept.svg';
import { Group, Text } from '@mantine/core';

type Props = {
  mark?: boolean;
  label: string;
  value: any;
  unitValue?: React.ReactNode;
  spacingUnit?: number;

  mt?: string | number;
  mb?: string | number;
  my?: string | number;
  px?: string | number;
  colorValue?: string;
};

export const Accumulation = (props: Props) => {
  return (
    <Group position="apart" w={'100%'} mt={props.mt} mb={props.mb} my={props.my}>
      {props.mark ? (
        <Group spacing={6}>
          <IconMark /> <Text className="small-2_medium">{props.label}</Text>
        </Group>
      ) : (
        <Text className="small-2_medium">{props.label}</Text>
      )}

      {props.unitValue ? (
        <Group spacing={props.spacingUnit === 0 ? props.spacingUnit : 6}>
          <Text className="small-2_medium" c={props.colorValue}>
            {' '}
            {props.value}
          </Text>
          {props.unitValue}
        </Group>
      ) : (
        <Text className="small-2_medium" c={props.colorValue}>
          {props.value}
        </Text>
      )}
    </Group>
  );
};
