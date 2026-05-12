import '.././App.css'
import { Stack } from '@mui/material'
import { Topbar } from './Topbar';

type MainLayoutProps = {
  children?: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps ) => {
  const buttons = [
      { label: 'Work Requests', link: '/' },
      { label: 'Create Work Request', link: '/CreateWorkRequest' }
    ];

  return (
    <Stack flexDirection="row">
      <Topbar buttons={buttons} />
      <Stack py={10} px={2} width="70%">
        {children}
      </Stack>
    </Stack>
  )
}
