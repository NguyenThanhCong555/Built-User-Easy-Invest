import React from 'react';
import { Box, Group, Image, List, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import InstructionItem from './components/InstructionItem';
import { images } from 'assets/images';
import { Helmet } from 'react-helmet-async';

export function InstructionRecharge() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { classes } = makeStyles();
  return (
    <>
      <Helmet>
        <title>{t('InstructionPage.Instruction')}</title>
        <link rel="icon" href={`${images.logoEasyInvest3}`} />
      </Helmet>
      <Frame pb={12} titlePage={t('InstructionPage.Instruction')} onMovePage={() => navigate('/recharge')}>
        <Stack className={classes.stack}>
          <Text fw="bold">{t('InstructionPage.recharge.title1')}</Text>
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step1')}</Text>
                <Text>{t('InstructionPage.recharge.step1-banking-text1')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct1VN} />}
          />

          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step2')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step2-banking-text1')}</li>
                  <li>{t('InstructionPage.recharge.step2-banking-text2')}</li>
                  <li>{t('InstructionPage.recharge.step2-banking-text3')}</li>
                </ul>
              </Stack>
            }
            right={<Image src={images.instruct2VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step3')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step3-banking-text1')}</li>
                  <li>{t('InstructionPage.recharge.step3-banking-text2')}</li>
                </ul>
              </Stack>
            }
            right={<Image src={images.instruct3VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step4')}</Text>

                <Text>{t('InstructionPage.recharge.step4-banking-text1')}</Text>
                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step4-banking-text2')}</li>
                  <li>{t('InstructionPage.recharge.step4-banking-text3')}</li>
                  <li>{t('InstructionPage.recharge.step4-banking-text4')}</li>
                </ul>
              </Stack>
            }
            right={<Image src={images.instruct4VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step5')}</Text>
                <Text>{t('InstructionPage.recharge.step5-banking-text1')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step5-banking-text2')}</li>
                  <li>{t('InstructionPage.recharge.step5-banking-text3')}</li>
                  <li>{t('InstructionPage.recharge.step5-banking-text4')}</li>
                </ul>
                <Text>{t('InstructionPage.recharge.step5-banking-text5')}</Text>
              </Stack>
            }
            right={<></>}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step6')}</Text>
                <Text>{t('InstructionPage.recharge.step6-banking-text1')}</Text>
              </Stack>
            }
            right={<></>}
          />

          <Text fw="bold">{t('InstructionPage.recharge.title2')}</Text>
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step1')}</Text>
                <Text>{t('InstructionPage.recharge.step1-binance-text1')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct5VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step2')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step2-binance-text1')}</li>
                  <li>{t('InstructionPage.recharge.step2-binance-text2')}</li>
                </ul>
              </Stack>
            }
            right={<Image src={images.instruct6VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step3')}</Text>

                <Text>{t('InstructionPage.recharge.step3-binance-text1')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step3-binance-text2')}</li>
                  <li>{t('InstructionPage.recharge.step3-binance-text3')}</li>
                  <li>{t('InstructionPage.recharge.step3-binance-text4')}</li>
                </ul>
                <Text>{t('InstructionPage.recharge.step3-binance-text5')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct7VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step4')}</Text>
                <Text>{t('InstructionPage.recharge.step4-binance-text1')}</Text>
              </Stack>
            }
            right={<Image src={images.instruct8VN} />}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step5')}</Text>
                <Text>{t('InstructionPage.recharge.step5-binance-text1')}</Text>
                <Text>{t('InstructionPage.recharge.step5-binance-text2')}</Text>

                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('InstructionPage.recharge.step5-binance-text3')}</li>
                  <li>{t('InstructionPage.recharge.step5-binance-text4')}</li>
                  <li>{t('InstructionPage.recharge.step5-binance-text5')}</li>
                </ul>
              </Stack>
            }
            right={<> </>}
          />
          <InstructionItem
            left={
              <Stack spacing={0}>
                <Text>{t('InstructionPage.recharge.step6')}</Text>
                <Text>{t('InstructionPage.recharge.step6-binance-text1')}</Text>
              </Stack>
            }
            right={<> </>}
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
