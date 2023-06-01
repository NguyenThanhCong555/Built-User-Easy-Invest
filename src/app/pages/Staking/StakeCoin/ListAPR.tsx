import React, { SetStateAction } from 'react';
import { SimpleGrid } from '@mantine/core';
import { MyButton } from 'app/components/Button/MyButton';
import { useTranslation } from 'react-i18next';
import { variable } from 'styles/variable';

type ListAPRProps = {
  ListAPR: { id: number; day: number; rateUsdt: number }[];
  selectAPR: number;
  setSelectAPR: React.Dispatch<SetStateAction<number>>;
  setTimeAPR: React.Dispatch<SetStateAction<number>>;
  setRateAPR: React.Dispatch<SetStateAction<number>>;
  setCallFirst: React.Dispatch<SetStateAction<boolean>>;
};

export const ListAPR = (props: ListAPRProps) => {
  const { t } = useTranslation();

  const handleSelectAPR = (payload: { id: number; day: number; rateUsdt: number }) => {
    props.setSelectAPR(payload.id);
    props.setRateAPR(payload.rateUsdt);
    props.setTimeAPR(payload.day);
  };

  return (
    <SimpleGrid w={'100%'} cols={2} spacing={20} verticalSpacing={10}>
      {!!props.ListAPR &&
        props.ListAPR.map(APR =>
          APR.id === props.selectAPR ? (
            <MyButton
              key={APR.id}
              w={'100%'}
              width_mobile="100%"
              h={44}
              onClick={() => handleSelectAPR({ id: APR.id, day: APR.day, rateUsdt: APR.rateUsdt })}
            >
              {APR.day / 1000} {t('Stake.day')} - {APR.rateUsdt}%
            </MyButton>
          ) : (
            <MyButton
              key={APR.id}
              onClick={() => handleSelectAPR({ id: APR.id, day: APR.day, rateUsdt: APR.rateUsdt })}
              variant="outline"
              c={variable.neutral.black}
              w={'100%'}
              width_mobile="100%"
              h={44}
            >
              {APR.day / 1000} {t('Stake.day')} - {APR.rateUsdt}%
            </MyButton>
          ),
        )}
    </SimpleGrid>
  );
};
