import { Box, Flex } from '@mantine/core';
import React from 'react';

type Props = {
  left: any;
  right: any;
};

const InstructionItem = ({ left, right }: Props) => {
  return (
    <Flex justify="space-between">
      <Box>{left}</Box>
      <Box
        sx={{
          flexShrink: 0,
        }}
      >
        {right}
      </Box>
    </Flex>
  );
};

export default InstructionItem;
