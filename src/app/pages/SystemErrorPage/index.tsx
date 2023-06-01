import { Center, Text } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { systemActions } from 'store/slice/system';
import { selectSystemError } from 'store/slice/system/selector';

type Props = {};

export const SystemError = (props: Props) => {
  const dispatch = useDispatch();

  const systemError = useSelector(selectSystemError);

  //   useEffect(() => {
  //     return dispatch(systemActions.resetSystemError());
  //   }, [systemError]);

  return (
    <Center>
      <Text>Lỗi hệ thống !</Text>
    </Center>
  );
};
