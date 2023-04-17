import React from 'react';
import { createStyles, Divider, Loader, Stack, Text } from '@mantine/core';
import HistoryTransactionItem from './HistoryTransactionItem';
import { variable } from 'styles/variable';
import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

const HistoryTransaction = () => {
  const { classes } = makeStyles();
  const navigate = useNavigate();

  return (
    <Stack className={classes.stack}>
      <Stack className={classes.stackList}>
        {false ? (
          <Loader color={variable.primary.primary1} />
        ) : (
          ['', '', '', '', '', ''].map((item, index) => (
            <Stack onClick={() => navigate(`coin/`)} className={classes.stackItem} key={index}>
              <HistoryTransactionItem data={item} id={index} />
            </Stack>
          ))
        )}
      </Stack>
    </Stack>
  );
};

const makeStyles = createStyles(() => ({
  stack: {
    marginTop: 70,
    gap: 0,
  },

  stackList: {
    marginBottom: 20,
  },

  title: {
    fontSize: 14,
    fontWeight: 500,
    color: variable.neutral.greyDark,
    marginBottom: 12,
  },
  stackItem: {
    gap: 10,
  },
}));

export default HistoryTransaction;
