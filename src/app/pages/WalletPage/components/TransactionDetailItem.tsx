import React, { useCallback } from 'react';
import { Box, Center, Flex, Image, Stack, Text, createStyles } from '@mantine/core';
import { ReactComponent as IconUSDT } from 'assets/icons/coin/usdt.svg';
import { renderTitleTransaction } from 'utils/helpers/renderTitleTransaction';
import { useTranslation } from 'react-i18next';
import { numberWithCommas } from 'helpers/formatNumberWithCommas';
import { variable } from 'styles/variable';
import { convertDateTime } from 'utils/helpers/convertDateTime';

interface TransactionDetailItemProps {
  data: any;
}

const TransactionDetailItem = ({ data }: TransactionDetailItemProps) => {
  const { t } = useTranslation();
  const { classes } = makeStyles();

  const renderDetail = useCallback(
    item => {
      return (
        <>
          <Center className={classes.centerTitle}>
            <Text className={classes.title}>
              {t(
                'wallet.' + renderTitleTransaction(item?.service || 0, item?.exchange, item?.coin_name === 'USDT' ? true : false),
              )}
            </Text>
          </Center>

          <Center className={classes.centerNumber}>
            <Flex className={classes.flexNumber} ml={40} mr={40}>
              <Text
                className={classes.number}
                color={item?.exchange > 0 ? variable.secondary.secondary1 : variable.neutral.black}
              >
                {item?.exchange > 0 && '+'} {numberWithCommas(item?.exchange, 8)}
              </Text>
              <Box>{item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}</Box>
            </Flex>
          </Center>

          {/* Stacking */}
          {item?.service === 5 && (
            <Stack className={classes.stackItem}>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Project')}</Text>
                <Text className={classes.text}>{item?.detail?.project?.name}</Text>
              </Flex>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Staking package')}</Text>
                <Text className={classes.text}>
                  {item?.detail?.stake?.timeframe / 86400000} {t('StakeManagement.days')} - {item?.detail?.stake?.interest_rate}
                  %/{t('Stake.year')}
                </Text>
              </Flex>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={classes.flexNumber}>
                  <Text className={classes.text}>{numberWithCommas(item?.balance, 8)}</Text>
                  {item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}
                </Flex>
              </Flex>
              <Text className={classes.textTime}>{convertDateTime(item?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Nạp , Rút */}
          {(item?.service === 1 || item?.service === 2) && (
            <Stack className={classes.stackItem}>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{item?.service === 1 ? t('wallet.From') : t('wallet.Withdraw To')}</Text>
                <Text className={classes.text}>
                  {item?.detail?.banking_logo
                    ? item?.detail?.banking ||
                      (item?.detail?.short_name || item?.detail?.banking_name) + ' - ' + item?.detail?.account_number
                    : 'ADMIN'}
                </Text>
              </Flex>

              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={classes.flexNumber}>
                  <Text className={classes.text}>{numberWithCommas(item?.balance)}</Text>
                  {item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}
                </Flex>
              </Flex>

              {!item?.detail?.banking_logo && (
                <Flex className={classes.flexItem}>
                  <Text className={classes.text}>{t('wallet.Content')}:</Text>
                  <Text className={classes.text}>{item?.detail?.trans_content}</Text>
                </Flex>
              )}
              <Text className={classes.textTime}>{convertDateTime(item?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Nhận */}
          {item?.service === 3 && (
            <Stack className={classes.stackItem}>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.From')}</Text>
                <Text className={classes.text}>{item?.detail?.sender_nick_name + ' - ' + item?.detail?.sender_phone}</Text>
              </Flex>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={classes.flexNumber}>
                  <Text className={classes.text}>{numberWithCommas(item?.balance)}</Text>
                  {item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}
                </Flex>
              </Flex>

              <Text className={classes.textTime}>{convertDateTime(item?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* Chuyển */}
          {item?.service === 4 && (
            <Stack className={classes.stackItem}>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.To')}</Text>
                <Text className={classes.text}>{item?.detail?.receiver_nick_name + ' - ' + item?.detail?.receiver_phone}</Text>
              </Flex>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={classes.flexNumber}>
                  <Text className={classes.text}>{numberWithCommas(item?.balance)}</Text>
                  {item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}
                </Flex>
              </Flex>

              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Content')}:</Text>
                <Text className={classes.text}>{item?.detail?.content}</Text>
              </Flex>

              <Text className={classes.textTime}>{convertDateTime(item?.create_time / 1000)}</Text>
            </Stack>
          )}

          {/* P2P */}

          {item?.service === 6 && (
            <Stack className={classes.stackItem}>
              <Flex className={classes.flexItem}>
                <Text className={classes.text}>{t('wallet.Balance after transaction')}:</Text>
                <Flex className={classes.flexNumber}>
                  <Text className={classes.text}>{numberWithCommas(item?.balance)}</Text>
                  {item?.coin_name === 'USDT' ? <IconUSDT /> : <Image src={item?.coin_avatar} width={24} height={24} />}
                </Flex>
              </Flex>

              <Text className={classes.textTime}>{convertDateTime(item?.create_time / 1000)}</Text>
            </Stack>
          )}
        </>
      );
    },
    [data],
  );

  return <Stack className={classes.stack}>{renderDetail(data)}</Stack>;
};

const makeStyles = createStyles(theme => ({
  stack: {
    borderRadius: 8,
    overflow: 'hidden',
    border: '1px solid var(--grey-light)',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    gap: 8,
  },
  centerTitle: {
    backgroundColor: 'var(--primary-2)',
    height: 43,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    color: '#fff',
  },
  centerNumber: {
    paddingBottom: 12,
    borderBottom: '1px solid var(--light)',
  },

  flexNumber: {
    alignItems: 'center',
    gap: 6,
  },
  number: {
    fontSize: 24,
    fontWeight: 700,
    wordBreak: 'break-all',
    textAlign: 'center',
  },

  stackItem: {
    padding: 8,
    gap: 10,
  },

  text: {
    fontSize: 14,
    fontWeight: 600,
  },

  textTime: {
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--grey)',
    alignSelf: 'end',
  },
  flexItem: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
  },
}));

export default TransactionDetailItem;
