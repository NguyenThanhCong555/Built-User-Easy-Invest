import React from 'react';
import styled from '@emotion/styled';
import type { ButtonProps } from '@mantine/core';
import { Button } from '@mantine/core';

// GlobalEventHandlers
export interface Props extends ButtonProps {
  break_point_mobile?: 576 | 768 | 992 | 1200 | 1400 | number; //zoom out with it is the phone
  width_mobile?: string;
  height_mobile?: string;
  border?: string;
  radius_mobile?: string;
  border_color?: string;
  font_family?: 'Sarabun' | 'Sarabun Medium' | 'Sarabun Bold';
  box_shadow?: string;
  box_shadow_hover?: string;
  box_shadow_active?: string;
  bg_hover?: string; // background when hover
  bg_active?: string; // background when active
  border_hover?: string;
  border_active?: string;
  fz_mb?: string;
  px_mb?: string;
  onClick?: (e: any) => void;
}

function handleBorderWithVariant(border, variant) {
  if (border) return border;
  if (variant === 'outline') return '1px #976FEA solid';
  else if (variant === 'default') return `1px #333333 solid`;
  else if (variant === 'subtle') return 'none';
}

function handleBackgroundWithVariant(background, variant) {
  if (background) return background;

  if (variant === 'filled' || variant === undefined) return '#976FEA';
  else if (variant === 'light') return '#976FEA';
  else if (variant === 'default' || variant === 'subtle' || variant === 'outline') return '#ffffff';
  return 'none';
}

export const MyButton = styled(Button)<Props>`
  width: ${props => props.w || '270px'};
  height: ${props => props.h || '59px'};
  padding-left: ${props => props.px || '16px'};
  padding-right: ${props => props.px || '16px'};
  background: ${props => handleBackgroundWithVariant(props.bg, props.variant)};
  border-radius: ${props => props.radius || '8px'};
  font-size: ${props => props.fz || '18px'};
  color: ${props => props.c || '#ffffff'};
  font-family: ${props => props.font_family || 'Sarabun Bold'};
  border: ${props => handleBorderWithVariant(props.border, props.variant)};
  box-shadow: ${props => props.box_shadow || 'none'};
  @media (max-width: ${props => props.break_point_mobile || 768}px) {
    /* padding: ${props => props.p || '10px'}; */
    width: ${props => (props.width_mobile ? props.width_mobile : props.w ? props.w : '161px')};
    height: ${props => (props.width_mobile ? props.height_mobile : props.h ? props.h : '47px')};
    border-radius: ${props => props.radius_mobile || '5px'};
    font-size: ${props => props.fz_mb || '16px'};
    padding-left: ${props => props.px_mb || '10px'};
    padding-right: ${props => props.px_mb || '10px'};
  }
  &:hover {
    background-color: ${props => props.bg_hover || '#976FEA'};
    box-shadow: ${props => props.box_shadow_hover || '0px 8px 12px rgba(0, 0, 0, 0.2)'};
    border: ${props => props.border_hover || '1px #976FEA solid'};
  }
  &:active {
    background-color: ${props => props.bg_active || '#976FEA'};
    box-shadow: ${props => props.box_shadow_active || '0px 8px 12px rgba(0, 0, 0, 0.2)'};
    border: ${props => props.border_active || '1px #976FEA solid'};
  }
`;
