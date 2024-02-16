import {AppBar, Box, Button, Link, Toolbar, Typography} from '@mui/material';
// import { Menu } from '@mui/icons-material';
import React from 'react';

const useStyles = {
    linkStyle: {
        ml:3, 
        alignSelf: "center",
        color: "#000",
        "&:hover, &:focus" : {
            color: "#FF0000",
        }
    },
    buttonStyle: {
        ml:3, 
        alignSelf: "center",
        backgroundColor: "#000",
        textTransform: 'none',
        "&:hover" : {
            backgroundColor: "#000"
        }
    }
}

const Header: React.FC = () => {
    return (
        <div>
            <AppBar position="static" color="transparent" sx={{boxShadow: "none"}}>
              <Toolbar>
                  <Box flexGrow={1} />
                  <Box display="flex">
                    <Link href="/" underline="none" sx={useStyles.linkStyle}> <Typography variant="h6" children="Home" /> </Link>
                    <Link href="/find" underline="none" sx={useStyles.linkStyle}> <Typography variant="h6" children="Find" /> </Link>
                    <Link href="/watch" underline="none" sx={useStyles.linkStyle}> <Typography variant="h6" children="Watch" /> </Link>
                    <Button variant="contained" sx={[useStyles.buttonStyle]}> <Typography variant="h6" children="About" /> </Button>
                  </Box>
              </Toolbar>
            </AppBar>

        </div>
    );
};

export default Header;