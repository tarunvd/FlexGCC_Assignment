import { useMemo } from 'react'
import '.././App.css'
import { Drawer, useTheme } from '@mui/material'
import { TopbarContent } from './TopbarContent';
import { getTopbarPalette } from './utils';

export interface NavigationItem {
  link: string;
  label: string;
  icon?: React.ReactElement;
  disabled?: boolean;
}

export interface TopbarProps {
  buttons: NavigationItem[];
  variant?: 'primary' | 'secondary';
}

export const Topbar = (props: TopbarProps ) => {
  const theme = useTheme();

  const openDrawerHeight = theme.spacing(9);

  const topbarPalette = useMemo(
    () => getTopbarPalette(theme, props.variant ?? 'primary'),
    [props.variant, theme],
  );

  return (
    <Drawer
      variant="permanent"
      anchor="top"
      elevation={5}
      sx={{
        height: openDrawerHeight,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          height: openDrawerHeight,
          boxSizing: 'border-box',
          transition: 'height 0.3s',
          backgroundColor: topbarPalette.background,
          color: topbarPalette.text,
          overflow: 'hidden',
          zIndex: 9,
        },
      }}
      slotProps={{
        paper: { elevation: 5 },
      }}
    >
      <TopbarContent
        {...props}
      />
    </Drawer>
  );
};
