// @mui
import { Stack, Skeleton,Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonConversationItemRight() {
  return (
    <Stack spacing={1} direction="row" alignItems="center" justifyContent='flex-end' sx={{ px: 3, py: 1.5 }}>
   
    <Stack spacing={0.5} sx={{ flexGrow: 0.7 }}>
      <Skeleton variant="text" sx={{ width: 1, height: 16 }} />
      <Stack direction='row'>
        <Box sx={{ flexGrow: 1 }}></Box>
      <Skeleton variant="text" sx={{ width: 0.35, height: 12,display:'flex',justifyContent:'flex-end'}} />
      </Stack>
    </Stack>
    <Skeleton variant="circular" width={48} height={48} />
  </Stack>  
  );
}
