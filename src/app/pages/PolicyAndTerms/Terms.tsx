import { Stack, Text, createStyles } from '@mantine/core';
import { Frame } from 'app/layouts/Frame';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Terms = (props: Props) => {
  const navigation = useNavigate();
  const { t } = useTranslation();
  const { classes } = useStyle();

  const moveToPageHome = () => {
    navigation('/policy-terms');
  };

  return (
    <Frame onMovePage={moveToPageHome} titlePage={t('TermsOfUse.titlePage')}>
      <Stack p={16} w={'100%'} spacing={10}>
        <Text>
          {t('TermsOfUse.text1')} <b>{t('TermsOfUse.text2')}</b>
        </Text>

        <Text>{t('TermsOfUse.text3')}</Text>
        <Text>{t('TermsOfUse.text4')}</Text>

        <Text fw="bold">{t('TermsOfUse.term.roman1')}</Text>
        <ul style={{ paddingLeft: 20 }}>
          <li>{t('TermsOfUse.term.roman1-list1')}</li>
          <li>{t('TermsOfUse.term.roman1-list2')}</li>
          <li>{t('TermsOfUse.term.roman1-list3')}</li>
          <li>{t('TermsOfUse.term.roman1-list4')}</li>
          <li>{t('TermsOfUse.term.roman1-list5')}</li>
          <li>{t('TermsOfUse.term.roman1-list6')}</li>
          <li>{t('TermsOfUse.term.roman1-list7')}</li>
          <li>{t('TermsOfUse.term.roman1-list8')}</li>
          <li>{t('TermsOfUse.term.roman1-list9')}</li>
          <li>{t('TermsOfUse.term.roman1-list10')}</li>
        </ul>

        <Text fw="bold">{t('TermsOfUse.term.roman2')}</Text>
        <ol style={{ paddingLeft: 20 }}>
          <li>{t('TermsOfUse.term.roman2-list1')}</li>
          <li>{t('TermsOfUse.term.roman2-list2')}</li>
          <li>{t('TermsOfUse.term.roman2-list3')}</li>
        </ol>

        <Text fw="bold">{t('TermsOfUse.term.roman3')}</Text>
        <ol style={{ paddingLeft: 20 }}>
          <li>{t('TermsOfUse.term.roman3-list1')}</li>
          <li>
            {t('TermsOfUse.term.roman3-list2')}
            <ul style={{ paddingLeft: 20 }}>
              <li>{t('TermsOfUse.term.roman3-list2-text1')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text2')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text3')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text4')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text5')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text6')}</li>
              <li>{t('TermsOfUse.term.roman3-list2-text7')}</li>
            </ul>
          </li>
          <li>
            {t('TermsOfUse.term.roman3-list3')}
            <ul style={{ paddingLeft: 20 }}>
              <li>{t('TermsOfUse.term.roman3-list3-text1')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text2')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text3')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text4')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text5')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text6')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text7')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text8')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text9')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text10')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text11')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text12')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text13')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text14')}</li>
              <li>{t('TermsOfUse.term.roman3-list3-text15')}</li>
            </ul>
          </li>
        </ol>

        <Text fw="bold">{t('TermsOfUse.term.roman4')}</Text>
        <ol style={{ paddingLeft: 20 }}>
          <li>
            {t('TermsOfUse.term.roman4-list1')}
            <ul style={{ paddingLeft: 20 }}>
              <li>{t('TermsOfUse.term.roman4-list1-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list1-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list1-text3')}</li>
            </ul>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list2')}
            <ul style={{ paddingLeft: 20 }}>
              <li>{t('TermsOfUse.term.roman4-list2-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list2-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list2-text3')}</li>
            </ul>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list3')}
            <Text>{t('TermsOfUse.term.roman4-list3-text')}</Text>

            <ul style={{ listStyleType: 'none' }}>
              <li>
                {t('TermsOfUse.term.roman4-list3-object1')}
                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('TermsOfUse.term.roman4-list3-object1-list1')}</li>
                  <li>{t('TermsOfUse.term.roman4-list3-object1-list2')}</li>
                </ul>
              </li>
              <li>
                {t('TermsOfUse.term.roman4-list3-object2')}
                <Text>{t('TermsOfUse.term.roman4-list3-object2-list1')}</Text>
                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list1-text1')}</li>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list1-text2')}</li>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list1-text3')}</li>
                </ul>

                <Text>{t('TermsOfUse.term.roman4-list3-object2-list2')}</Text>
                <ul style={{ paddingLeft: 20 }}>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list2-text1')}</li>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list2-text2')}</li>
                  <li>{t('TermsOfUse.term.roman4-list3-object2-list2-text3')}</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list4')}
            <Text>{t('TermsOfUse.term.roman4-list4-object1')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list4-object1-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text3')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text4')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text5')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text6')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text7')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text8')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text9')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text10')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text11')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object1-text12')}</li>
            </ul>

            <Text>{t('TermsOfUse.term.roman4-list4-object2')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list4-object2-list1')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list4-object2-list1-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list1-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list1-text3')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list1-text4')}</li>
            </ul>

            <Text>{t('TermsOfUse.term.roman4-list4-object2-list2')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text3')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text4')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text5')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list2-text6')}</li>
            </ul>

            <Text>{t('TermsOfUse.term.roman4-list4-object2-list3')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text2')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text3')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text4')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text5')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text6')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text7')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list3-text8')}</li>
            </ul>
            <Text>{t('TermsOfUse.term.roman4-list4-object2-list4')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list4-object2-list4-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list4-object2-list4-text2')}</li>
            </ul>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list5')}
            <Text>{t('TermsOfUse.term.roman4-list5-object1')}</Text>
            <ul
              style={{
                paddingLeft: 20,
              }}
            >
              <li>{t('TermsOfUse.term.roman4-list5-object1-text1')}</li>
              <li>{t('TermsOfUse.term.roman4-list5-object1-text2')}</li>
            </ul>
            <Text>{t('TermsOfUse.term.roman4-list5-object2')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object3')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object4')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object5')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object6')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object7')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object8')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object9')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object10')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object11')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list5-object12')}</Text>
          </li>

          <li>
            {t('TermsOfUse.term.roman4-list6')}
            <Text>{t('TermsOfUse.term.roman4-list6-text')}</Text>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list7')}
            <Text>{t('TermsOfUse.term.roman4-list7-object1')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list7-object2')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list7-object3')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list7-object4')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list7-object5')}</Text>
          </li>
          <li>
            {t('TermsOfUse.term.roman4-list8')}
            <Text>{t('TermsOfUse.term.roman4-list8-object1')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list8-object2')}</Text>
            <Text>{t('TermsOfUse.term.roman4-list8-object3')}</Text>
          </li>
        </ol>

        <Text fw="bold">{t('TermsOfUse.term.roman5')}</Text>
        <Text>{t('TermsOfUse.term.roman5-text')}</Text>

        <Text fw={'bold'}>{t('TermsOfUse.term.roman6')}</Text>
        <ul
          style={{
            paddingLeft: 20,
          }}
        >
          <li>
            {t('TermsOfUse.term.roman6-list1')}
            <span>{t('TermsOfUse.term.roman6-list2-email')}</span> <span>{t('TermsOfUse.term.roman6-list3')}</span>
          </li>
          <li>{t('TermsOfUse.term.roman6-list4')}</li>
          <li>{t('TermsOfUse.term.roman6-list5')}</li>
        </ul>
      </Stack>
    </Frame>
  );
};

export default Terms;

const useStyle = createStyles(() => ({
  groupButton: {
    border: ` 1px solid var(--grey-dark)`,
    borderRadius: '8px',
  },
}));
