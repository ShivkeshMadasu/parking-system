import React, { useEffect, useState } from 'react'
import Header from '../Header';
import {Box, Button, CircularProgress, LinearProgress, Typography} from '@mui/material';
import axios from 'axios';
import NavigateIcon from '@mui/icons-material/NearMe';
import WatchIcon from '@mui/icons-material/PlayCircleOutline';
import SpotsTable from '../SpotsTable';


const useStyles = {
  backgroundStyle: {
      backgroundImage: `linear-gradient(#ebebda, #ebebda), linear-gradient(#F2F1F1, #F2F1F1)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100vw calc(100% - 70%), 100vw calc(100% - 30%)",
      backgroundPosition: "top, bottom",
      height: "100vh"
  },
  outerBox: {
    display: "flex",
    flexDirection: "column",
    marginLeft: "65px"
  },
  dataBox: {
    marginTop: "20px",
    borderRadius: '20px',
    backgroundColor: '#fff',
    width: "1050px",
    height: "550px",
  },
  detailBox: {
    marginLeft: "40px",
    marginTop: "20px",
    borderRadius: '20px',
    backgroundColor: '#fff',
    width: "300px",
    height: "350px"
  },
  detailTitle: {
    padding: "10px 0px",
    textAlign: "center",
    borderBottom: "1px solid #979797"
  },
  flexCol: {
    display: "flex",
    flexDirection: "column"
  },
  detailButtonStyle: {
    width: "200px",
    marginTop: "20px",
    backgroundColor: "#000",
    borderRadius: '8px',
    height: "50px"
  },
  detailContent: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0px",
  }
};

export interface ISpotsData {
  id: number;
  name: string;
  block: string;
  location: string;
  distance: string;
  vacant: string
}

interface IProps {
  title: string;
  page: string;
}

const ParkingPage: React.FC<IProps> = (props) => {

  const {title, page} = props;

  const [spotsData, setSpotsData] = useState<ISpotsData[]>([]);

  const [spotDetail, setSpotDetail] = useState<ISpotsData>();

  const [isLoading, setIsLoading] = useState(true);

  const getSpotsData = () => {
    setIsLoading(true);
    axios.get('https://xm5kidlp3k.execute-api.us-east-2.amazonaws.com/default/spots')
      .then((response) => {
        if(response.status === 200) {
          setSpotsData(response.data);
        }
        else {
          throw response;
        }
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    getSpotsData();
  },[]);

  useEffect(() => {
    if(page === "find") {
      setSpotDetail(spotsData[0]);
    }
  },[spotsData, page]);

  return (
    <div style={useStyles.backgroundStyle}>
      <Header />
      <Box sx={useStyles.outerBox}>
        <Typography variant="h5" sx={{marginLeft: "15px"}} children={title} />
        <Box display="flex">
          <Box sx={useStyles.dataBox}>
            {
              isLoading ? <LinearProgress color="inherit" />
              :
              (page === "find") && spotsData &&
                <SpotsTable spotsData={spotsData} setSpotsData={setSpotsData} setSpotDetail={setSpotDetail} setIsLoading={setIsLoading} />
            }
          </Box>
          <Box sx={useStyles.detailBox}>
            <Box sx={useStyles.detailTitle}>
              {(page === "find") && <Typography variant="h6" children={spotDetail && spotDetail['name'].toUpperCase()} />}
              {!(page === "find") && <Typography variant="h6" children="Sim Building Parking " />}
            </Box>
            <Box sx={useStyles.detailContent}>
              <Box>
                {!(page === "find") && <Typography children="Spots Available" />}
                <Typography children="EV Charging" />
                <Typography children={(page === "find") ? "Last Occupied" : "Distance"} />
                <Typography children={(page === "find") ? "Last Vacant" : "Type"} />
              </Box>
              <Box>
                {!(page === "find") && <Typography children=": 11" />}
                <Typography children={(page === "find") ? ": Yes" : ": Yes"} />
                <Typography children={(page === "find") ? ": 19:46" : ": 3mi"} />
                <Typography children={(page === "find") ? ": 20:23" : ": Outdoor"} />
              </Box>
            </Box>
            <Box sx={[useStyles.flexCol, {alignItems: "center"}]}>
              <Button variant="contained" href="/navigate" sx={useStyles.detailButtonStyle} startIcon={<NavigateIcon/>} children="Navigate"/>
              {(page === "find") && <Button variant="contained" sx={useStyles.detailButtonStyle} startIcon={<WatchIcon/>} children="Watch Live"/>}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ParkingPage;