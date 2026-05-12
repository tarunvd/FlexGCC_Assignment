import { alpha, type Theme } from "@mui/material";

export const getTopbarPalette = (theme: Theme, variant: 'primary' | 'secondary') => {
  switch (variant) {
    case 'secondary':
      return {
        background: theme.palette.background.paper,
        text: theme.palette.text.primary,
        hoverBackground: theme.palette.action.hover,
        activeButtonBackground: theme.palette.action.selected,
      };
    case 'primary':
    default:
      return {
        background: theme.palette.primary.main,
        text: theme.palette.primary.contrastText,
        hoverBackground: alpha(theme.palette.primary.contrastText, 0.08),
        activeButtonBackground: alpha(theme.palette.primary.contrastText, 0.12),
      };
  }
};
