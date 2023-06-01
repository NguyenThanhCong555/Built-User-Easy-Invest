import { Image, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InstructionItem from './components/InstructionItem';
import { images } from 'assets/images';
import { Helmet } from 'react-helmet-async';

export function InstructionStakingUSDT() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = makeStyles();

  return (
    <>
      <Helmet>
        <title>{t('InstructionPage.Instruction')}</title>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Frame pb={12} titlePage={t('InstructionPage.Instruction')} onMovePage={() => navigate(-1)}>
        <Stack className={classes.stack}>
          <Text fw="bold">{t('InstructionPage.stakingUSDT.title1')}</Text>
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.stakingUSDT.step1')}</Text>
                <Text>{t('InstructionPage.stakingUSDT.step1-text1')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct12VN} />}
          />

          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.stakingUSDT.step2')}</Text>
                <Text>{t('InstructionPage.stakingUSDT.step2-text1')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct13VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.stakingUSDT.step3')}</Text>
                <Text>{t('InstructionPage.stakingUSDT.step3-text1')}</Text>
              </Stack>
            }
            right={<></>}
          />
        </Stack>
      </Frame>
    </>
  );
}

const makeStyles = createStyles(() => ({
  stack: {
    padding: '14px 30px 14px 30px',
    gap: 20,

    '@media (max-width: 768px)': {
      padding: '0 14px 14px 14px',
    },
  },
}));
