import React from 'react'
import Header from '../Header';
import {Box, Typography} from '@mui/material';
import image1 from '../../static/images/parking.jpeg';

const useStyles = {
  backgroundStyle: {
        backgroundImage: `url(${image1}), linear-gradient(#ebebda, #ebebda)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "calc(100% - 70%) 100vh, calc(100% - 30%) 100vh",
        backgroundPosition: "left, right",
        height: "100vh"
    },
    boxStyle: {
      display: "flex",
      flexDirection: "column",
      marginTop: "calc(100% - 93%)",
      marginLeft: "350px",
      alignItems: "center"
    },
    titlePosition: {
      display: "flex",
      flexDirection: "column",
      marginTop: "calc(100% - 97%)",
      marginLeft: "calc(100% - 90%)",
      width: "calc(100% - 78%)",
      alignItems: "end"
    },
    titleText: {
      fontWeight: "700",
      fontSize: "2.125rem",
      paddingRight: "4rem",
      paddingLeft: "1rem",
      color: "#fff",
      marginBottom: "0.5rem",
      backgroundColor: "#2123248c"
    },
    realtimeText: {
      fontWeight: "400",
      fontSize: "2.125rem",
      color: "#fff",
      backgroundColor: "#000",
      borderRadius: "8px",
      textDecoration: "underline",
      textDecorationColor: "red",
      padding: "0px 10px"
    }
};

const HomePage: React.FC = () => {
  return (
    <div style={useStyles.backgroundStyle}>
        <Header />
        <Box sx={{display: "flex"}}>
          <Box sx={useStyles.titlePosition}>
            <Typography sx={useStyles.titleText} children="Intelligent" />
            <Typography sx={useStyles.titleText} children="Parking" />
            <Typography sx={useStyles.titleText} children="System" />
          </Box>
          <Box sx={useStyles.boxStyle}>
            <Typography variant="h4" children="Find and Park" />
            <Typography variant="h4" component="span"> All in <Typography sx={useStyles.realtimeText} children="Realtime" component="span" /> </Typography>
          </Box>
        </Box>
    </div>
  )
}

export default HomePage;