import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
// utils
import {ListItemText, Avatar, ListItemAvatar } from "@mui/material";

const AVATAR_SIZE = 60;

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar- img': { borderRadius: '100%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' },
});

export default function Itemdetails({item}) {

    return (
        <>
              <div style={{display:"flex"}}>
              <ListItemAvatar>
              <Box sx={{ px: 3, mb: 3}}>
              <AvatarWrapperStyle className="avatarWrapper">
              <Avatar alt={item.username} src={item.avatar} />
              </AvatarWrapperStyle>
              </Box>
              </ListItemAvatar>
              <ListItemText  
                key={item.id}
                sx={{ px: -1, mb: 1 }}
                primary={item.username}
                primaryTypographyProps={{
                noWrap: true,
                variant: 'subtitle2',
                }}
                secondary= {
                <div> 
                <div> {item.name} </div>
                <div> {item.place} </div>
                <div> {item.lastactivity} </div>
                </div>
                }
                secondaryTypographyProps={{
                noWrap: false,
                variant: 'subtitle2',
                  // color: isUnread ? 'textPrimary' : 'textSecondary',
                }}
              />
          </div>
        </>
    )
}