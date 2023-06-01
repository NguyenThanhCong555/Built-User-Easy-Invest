import React from 'react';
import { ActionIcon, CopyButton, Tooltip } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { ReactComponent as IconCopy } from 'assets/icons/wallet/icon-copy.svg';
interface Props {
  text: string;
}

const CopyToolTip = ({ text }: Props) => {
  return (
    <CopyButton value={text} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} onClick={copy}>
            {copied ? <IconCheck size="24px" /> : <IconCopy />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
};

export default CopyToolTip;
