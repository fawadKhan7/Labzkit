import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa'; // Using react-icons for minus and plus
import { Stack, IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';

const IncrementerButton = ({
  quantity,
  onIncrease,
  onDecrease,
  disabledIncrease,
  disabledDecrease,
  sx,
  ...other
}) => {
  return (
    <Stack
      flexShrink={0}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        p: 0.5,
        width: 88,
        borderRadius: 1,
        typography: 'subtitle2',
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.2)}`,
        ...sx,
      }}
      {...other}
    >
      {/* Decrease Button */}
      <IconButton
        size="small"
        onClick={onDecrease}
        disabled={disabledDecrease}
        sx={{ borderRadius: 0.75 }}
      >
        <FaMinus size={16} />
      </IconButton>

      {/* Display quantity */}
      {quantity}

      {/* Increase Button */}
      <IconButton
        size="small"
        onClick={onIncrease}
        disabled={disabledIncrease}
        sx={{ borderRadius: 0.75 }}
      >
        <FaPlus size={16} />
      </IconButton>
    </Stack>
  );
};

export default IncrementerButton;
