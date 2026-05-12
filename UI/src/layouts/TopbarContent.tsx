import '.././App.css'
import { type TopbarProps } from './Topbar';
import { Box, Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Link as RouterLink, useLocation } from 'react-router';
import reactLogo from '.././assets/react.svg'
import { getTopbarPalette } from './utils';

export const TopbarContent = ({
  variant = 'primary',
  buttons,
}: TopbarProps ) => {
  const location = useLocation();

  const activeLocation = useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);
    return (segments[0] || '/').toLowerCase();
  }, [location.pathname]);

  const theme = useTheme();
  const topbarPalette = useMemo(
    () => getTopbarPalette(theme, variant),
    [theme, variant],
  );

  const getButtonStyles = useCallback(
    (section: string) => ({
      backgroundColor:
        activeLocation === section.toLowerCase()
          ? topbarPalette.activeButtonBackground
          : 'transparent',
      color: topbarPalette.text,
      alignSelf: 'end',
      py: 1.5,
      px: 1,
      height: '100%',
      transition: 'background-color 0.3s ease',
      minWidth: theme.spacing(5),
      '&:hover': {
        backgroundColor: topbarPalette.hoverBackground,
      },
      '& .MuiButton-startIcon': {
        marginRight: theme.spacing(1),
        marginLeft: 0,
      },
    }),
    [
      activeLocation,
      topbarPalette.activeButtonBackground,
      topbarPalette.text,
      topbarPalette.hoverBackground,
      theme,
    ],
  );

 return (
    <Stack flexDirection="row" width="100%" alignItems="flex-start">
      <>
        <Stack px={1} justifyContent="flex-start" gap={theme.spacing(1)}>
          <RouterLink to="/">
            
              <img src={reactLogo} className="logo react" alt="React logo" height={theme.spacing(3)} />
          </RouterLink>
        </Stack>
        <Divider />
      </>
      <Stack
        spacing={1}
        py={0.5}
        px={2}
        sx={{ transition: 'padding 0.3s' }}
        flexDirection="row" 
      >
        {buttons.map((button) => (
          <Button
            key={button.label}
            startIcon={button.icon}
            sx={getButtonStyles(button.link)}
            component={RouterLink}
            to={button.link}
            disabled={button.disabled}            
          >
            {button.label}
          </Button>
        ))}
      </Stack>
      <Box flexGrow={1} />
      <Stack
        spacing={1}
        py={0.5}
        px={2}
        sx={{ transition: 'padding 0.3s' }}
        flexDirection="row"
      >
          <Stack
            sx={getButtonStyles('Release')}
            justifyContent="center"
          >
            <Typography>Release: 1.0</Typography>
          </Stack>
      </Stack>
    </Stack>
  );
};
