import React, { useEffect, useState } from 'react'
import Header from '../Header';
import {Box, Button, LinearProgress, Typography} from '@mui/material';
import axios from 'axios';
import NavigateIcon from '@mui/icons-material/NearMe';
import WatchIcon from '@mui/icons-material/PlayCircleOutline';
import SpotsTable from '../SpotsTable';
import ParkingLotMap from '../ParkingLotMap';
import LiveFeed from '../LiveFeed';


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
  },
  addressStyle: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#D8D8D8",
    borderRadius: "8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  locationDetailBox: {
    borderRadius: "20px", 
    backgroundColor: "#ebebda", 
    height: "400px", 
    border: "1px solid #D8D8D8",
    overflow: "auto",
    scrollbarWidth: "thin"
  },
  distanceStyle: {
    textAlign: "center", 
    borderBottom: "1px solid #D8D8D8"
  }
};

export interface ISpotsData {
  id: number;
  name: string;
  block: string;
  location: string;
  distance: string;
  vacant: string;
  lat: number;
  long: number;
  ev: boolean;
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

  const [locationDetails, setLocationDetails] = useState<any>(null);

  let evAvailable = "No";

  const getSpotsData = () => {
    setIsLoading(true);
    axios.get('https://xm5kidlp3k.execute-api.us-east-2.amazonaws.com/default/spots')
      .then((response) => {
        if(response.status === 200) {
          setSpotsData(response.data);
          evAvailable = response.data.map((parkingSpot:ISpotsData) => {
            return parkingSpot['ev'] === true ? "Yes" : "No";
          })
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

  const stripHtmlTags = (html:string) => {
    return html.replace(/<[^>]*>?/gm, ' ');
  }

  useEffect(() => {
    getSpotsData();
  },[]);

  useEffect(() => {
    setSpotDetail(spotsData[0]);
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
            {(page === "watch") &&<LiveFeed />}
            {(page === "navigate") && <ParkingLotMap locationDetails={locationDetails} setLocationDetails={setLocationDetails} />}
          </Box>
          {
            (page === "navigate") ?
            <Box sx={useStyles.detailBox}>
              {
                locationDetails && 
                <Box sx={{margin: "20px"}}>
                  <Typography variant="body2" sx={useStyles.addressStyle} children={"A. " + locationDetails["start_address"]} />
                  <Typography variant="body2" sx={useStyles.addressStyle} children={"B. " + locationDetails["end_address"]} />
                </Box>
              }
              <Box sx={useStyles.locationDetailBox}>
                {
                  locationDetails &&
                  <Box sx={{padding: "10px"}}>
                    <Typography variant="body2" sx={useStyles.distanceStyle} children={locationDetails["distance"].text + ", About " + locationDetails["duration"].text} />
                    {
                      locationDetails["steps"].map(
                        (step: any, index:number) => 
                        {
                          return (
                            <Box display="flex">
                              <Typography variant="body2" sx={{fontSize: "12px", width: "210px"}} children={index+1 + ". " + stripHtmlTags(step["instructions"])} />
                              <Typography variant="body2" sx={{fontSize: "12px", paddingLeft: "20px"}} children={stripHtmlTags(step["distance"].text)} />
                            </Box>
                          );
                        }
                      )
                    }
                  </Box>
                }
              </Box>
            </Box>
            :
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
                  {!(page === "find") && <Typography children= { ": " + spotsData.length} />}
                  <Typography children={(page === "find") ? ": Yes" : ": " + evAvailable} />
                  <Typography children={(page === "find") ? ": 19:46" : `: ${spotsData.length && spotsData[0]?.distance}`} />
                  <Typography children={(page === "find") ? ": 20:23" : ": Outdoor"} />
                </Box>
              </Box>
              <Box sx={[useStyles.flexCol, {alignItems: "center"}]}>
                <Button variant="contained" href={ spotDetail ? `/navigate?lat=${spotDetail['lat']}&long=${spotDetail['long']}` : "/navigate"} sx={useStyles.detailButtonStyle} startIcon={<NavigateIcon/>} children="Navigate"/>
                {(page === "find") && <Button variant="contained" href="/watch" sx={useStyles.detailButtonStyle} startIcon={<WatchIcon/>} children="Watch Live"/>}
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default ParkingPage;