// import Iconify from "../../../components/Iconify";
import { useTheme, styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";



     const ToggleButtonStyle = styled((props) => (
    <IconButton disableRipple {...props} />
  ))(({ theme }) => ({
    left: 0,
    zIndex: 9,
    width: 32,
    height: 32,
    position: "absolute",
    top: theme.spacing(13),
    borderRadius: `0 12px 12px 0`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.customShadows.primary,
    "&:hover": {
      backgroundColor: theme.palette.primary.darker,
    },
  }));
  export default ToggleButtonStyle;
  
