import { Box, ListItemText, Avatar, List, ListItemAvatar, styled, ListItemButton } from "@mui/material";

const AVATAR_SIZE = 40;

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar- img': { borderRadius: '100%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' },
});

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  transition: theme.transitions.create('all'),
}));


export default ({ ItemList, handleItemClick }) => {
    return <List disablePadding> 
    {  
         ItemList.map((vendor) => {
            return ( 
              <RootStyle key={vendor.id} onClick={()=>{ handleItemClick(vendor)}}>
                <ListItemAvatar>
                  <Box>
                    <AvatarWrapperStyle className="avatarWrapper" key={vendor.id}>
                      <Avatar alt={vendor.username} src={vendor.avatar} />
                    </AvatarWrapperStyle>
                  </Box>
              </ListItemAvatar>
              <ListItemButton >
              <ListItemText  
                key={vendor.id}
                primary={vendor.username}
                primaryTypographyProps={{
                  noWrap: true,
                  variant: 'subtitle2',
                }}
                secondary={vendor.name}
                secondaryTypographyProps={{
                  noWrap: true,
                  variant: 'subtitle2',
                  // color: isUnread ? 'textPrimary' : 'textSecondary',
                }}
              />
              </ListItemButton>
          </RootStyle>)
        })
      }
      </List>
}