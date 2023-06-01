import { Flex, Text, createStyles } from '@mantine/core';
import React from 'react';

import { ReactComponent as ArrowLeft } from 'assets/icons/loginPage/arrow-narrow-left.svg';

import { GlobalStyle } from 'styles/global-styles';
import { media } from 'styles/media';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { useNavigate } from 'react-router-dom';

interface InPropsStyle {
  laberHeader?: any;
  children?: any;
  backRole?: any;
  headerRight?: any;
}
export const NavContainer = (props: InPropsStyle) => {
  const { classes: c } = createStyleProps({});
  const nav = useNavigate();

  const backPage = () => {
    nav(props.backRole);
  };

  return (
    <Flex className={`${c.control}`}>
      <Flex className="navheader">
        <Flex onClick={backPage} className="arrLeft">
          <ArrowLeft />
        </Flex>
        <Flex className="laberHeader">
          <Text className="textLaberHeader">{props.laberHeader}</Text>
        </Flex>
        <Flex className="iconRight">{props.headerRight}</Flex>
      </Flex>
      <Flex className={c.contentHeader}>
        <Flex className="Content">{props.children}</Flex>
      </Flex>
    </Flex>
  );
};
const createStyleProps = createStyles((theme, params: InPropsStyle) => ({
  control: {
    maxWidth: '630px',
    width: '100%',
    // height: '802px', // you can clear for auto height content
    border: `1px solid var(--grey-light)`,
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0px 4px 8px var(--shadow-container)',
    flexDirection: 'column',
    margin: '0px auto',
    marginBottom: '30px',

    [`${media.small()}`]: {
      '&': {
        borderRadius: '0px',
        width: '100%',
        height: '100%',
        border: 'none',
      },
    },

    transition: 'all 1s linear',
    overflow: 'hidden',
    '.navheader': {
      maxWidth: '630px',
      width: '100%',
      height: '48px',
      [`${media.small()}`]: {
        '&': { height: '44px', width: '100%', border: 'none' },
      },
      background: 'var(--primary-5)',
      justifyContent: 'space-between',
      alignItems: 'center',

      '.arrLeft': {
        maxWidth: '50px',
        width: '100%',
        height: '100%',
        marginLeft: '14px',
        justifyContent: 'center',
        alignItems: 'center',
        [`${media.small()}`]: { '&': { marginLeft: '0px' } },
      },
      '.laberHeader': {
        maxWidth: '100%',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

        '.textLaberHeader': {
          fontSize: 24,
          fontWeight: 700,
          color: 'rgba(0, 0, 0, 1)',
        },
      },
      '.iconRight': {
        maxWidth: '50px',
        width: '100%',
        height: '100%',
        background: 'transparent',
        marginRight: '14px',
        [`${media.small()}`]: { '&': { marginRight: '0px !important' } },
      },
    },
  },

  contentHeader: {
    maxWidth: '100%',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    '.Content': {
      maxWidth: '100%',
      width: '100%',
      margin: '14px',
    },
  },
}));
