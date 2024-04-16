import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { Box, Link, Typography, Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import ObjectStorage from 'src/modules/ObjectStorage';
import { StorageConstants } from 'src/constants/StorageConstants';
import { get } from 'lodash';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const NavbarAccount = ({ isCollapse }) => {
  const [employeeDetail, setEmployeeDetail] = useState(null);

  // const employeeDetails = async () => {
  //   try {
  //     const headers = new Headers();
  //     headers.append("AuthCode", "627a734965665a78616442554334716a");
  //     headers.append("Content-Type", "application/json");

  //     const body = JSON.stringify({ employee_id: "E1111" });

  //     const response = await fetch(
  //       "https://test-api.random-mouse.com/ops/login_employee",
  //       {
  //         method: "POST",
  //         headers: headers,
  //         body: body,
  //       }
  //     );
      
  //     const data = await response.json();
  //     setEmployeeDetail(data[0]);
  //     ObjectStorage.setItem(StorageConstants.ACCESS_TOKEN, {
  //       token: data.token,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    // employeeDetails();
  }, []);

  return (
    <Link underline="none" color="inherit">
      <RootStyle
        sx={{

        }}
      >
        <Avatar src="https://minimal-assets-api-dev.vercel.app/assets/image/avatars/avatar_5.jpg" alt={get(employeeDetail, 'firstname', '')}/>
        {/* <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap sx={{ fontSize:20,color: '#FFFFFF' }}>
            {get(employeeDetail, 'firstname', '')}
          </Typography>
          <Typography variant="body2" noWrap sx={{ fontSize: "12px", color: "#FFF"}}>
            {get(employeeDetail,'user_id', )}
          </Typography>
        </Box> */}
      </RootStyle>
    </Link>
  );
};

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default NavbarAccount;
