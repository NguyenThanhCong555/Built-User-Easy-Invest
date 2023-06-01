import { List, Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Policy = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();

  const moveToPageHome = () => {
    navigation('/policy-terms');
  };

  return (
    <Frame onMovePage={moveToPageHome} titlePage={t('PolicyAndTerms.titlePagePolicy')}>
      <Stack p={16} w={'100%'} spacing={10}>
        <Text>{t('PolicyAndTerms.policy.label1-text1')}</Text>

        <ul style={{ paddingLeft: 20 }}>
          <li>{t('PolicyAndTerms.policy.label1-list1')}</li>
          <li>{t('PolicyAndTerms.policy.label1-list2')}</li>
          <li>{t('PolicyAndTerms.policy.label1-list3')}</li>
          <li>{t('PolicyAndTerms.policy.label1-list4')}</li>
          <li>{t('PolicyAndTerms.policy.label1-list5')}</li>
          <li>{t('PolicyAndTerms.policy.label1-list6')}</li>
        </ul>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman1')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman1-text1')}</Text>

        <ol style={{ paddingLeft: 20 }}>
          <li>{t('PolicyAndTerms.policy.roman1-list1')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list2')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list3')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list4')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list5')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list6')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list7')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list8')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list9')}</li>
          <li>{t('PolicyAndTerms.policy.roman1-list10')}</li>
        </ol>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman2')}</Text>
        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman2-case1')}</Text>

        <ol style={{ listStyleType: 'none' }}>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text1')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text2')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text3')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text4')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text5')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text6')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text7')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text8')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text9')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text10')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text11')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text12')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case1-text13')}</li>
        </ol>
        <Text>{t('PolicyAndTerms.policy.roman2-case1-list1')}</Text>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman2-case2')}</Text>
        <ul style={{ paddingLeft: 20 }}>
          <li>{t('PolicyAndTerms.policy.roman2-case2-list1')}</li>
          <li>{t('PolicyAndTerms.policy.roman2-case2-list2')}</li>
          <li>
            {t('PolicyAndTerms.policy.roman2-case2-list3')}
            <ol style={{ listStyleType: 'none' }}>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text1')}</li>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text2')}</li>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text3')}</li>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text4')}</li>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text5')}</li>
              <li>{t('PolicyAndTerms.policy.roman2-case2-list3-text6')}</li>
            </ol>
          </li>
          <li>{t('PolicyAndTerms.policy.roman2-case2-list4')}</li>
        </ul>

        <Text fs="italic">{t('PolicyAndTerms.policy.roman2-case2-list5')}</Text>
        <ol style={{ listStyleType: 'none' }}>
          <li
            style={{
              fontStyle: 'italic',
            }}
          >
            {t('PolicyAndTerms.policy.roman2-case2-list5-intalicise1')}
          </li>
          <li
            style={{
              fontStyle: 'italic',
            }}
          >
            {t('PolicyAndTerms.policy.roman2-case2-list5-intalicise2')}
          </li>
        </ol>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman3')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman3-text1')}</Text>
        <ol style={{ listStyleType: 'none' }}>
          <li>{t('PolicyAndTerms.policy.roman3-text1-list1')}</li>
          <li>
            {t('PolicyAndTerms.policy.roman3-text1-list2')}
            <ul style={{ padding: 20 }}>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object1')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object2')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object3')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object4')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object5')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object6')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object7')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object8')}</li>
              <li>{t('PolicyAndTerms.policy.roman3-text1-list2-object9')}</li>
            </ul>
            <li>{t('PolicyAndTerms.policy.roman3-text1-list3')}</li>
          </li>
        </ol>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman4')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman4-text')}</Text>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman5')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text1')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text2')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text3')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text4')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text5')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman5-text6')}</Text>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman6')}</Text>
        <Text>
          {t('PolicyAndTerms.policy.roman6-text1')} <span>{t('PolicyAndTerms.policy.roman6-text2-email')}</span>
        </Text>
        <Text>{t('PolicyAndTerms.policy.roman6-text3')}</Text>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman7')}</Text>
        <Text>{t('PolicyAndTerms.policy.roman7-text')}</Text>

        <Text fw={'bold'}>{t('PolicyAndTerms.policy.roman8')}</Text>
        <ul
          style={{
            paddingLeft: 20,
          }}
        >
          <li>
            {t('PolicyAndTerms.policy.roman7-list1')}
            <span>{t('PolicyAndTerms.policy.roman7-list2-email')}</span> <span>{t('PolicyAndTerms.policy.roman7-list3')}</span>
          </li>
          <li>{t('PolicyAndTerms.policy.roman7-list4')}</li>
          <li>{t('PolicyAndTerms.policy.roman7-list5')}</li>
        </ul>
      </Stack>
    </Frame>
  );
};

export default Policy;

const useStyle = createStyles(() => ({
  groupButton: {
    border: ` 1px solid var(--grey-dark)`,
    borderRadius: '8px',
  },
}));
