import React, { useEffect, useState } from 'react'
import Header from '../Header';
import {Box, Button, Table, TableBody, TableCell, TableHead, TableRow, TextField, InputBase, Typography} from '@mui/material';
import axios from 'axios';
import NavigateIcon from '@mui/icons-material/NearMe';
import WatchIcon from '@mui/icons-material/PlayCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

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
  spotsDataBox: {
    marginTop: "20px",
    borderRadius: '20px',
    backgroundColor: '#fff',
    width: "1050px",
    height: "550px",
  },
  tableBox: {
    height: "455px", 
    overflow: "auto", 
    scrollbarWidth: "thin"
  },
  detailBox: {
    marginLeft: "40px",
    marginTop: "20px",
    borderRadius: '20px',
    backgroundColor: '#fff',
    width: "300px",
    height: "350px"
  },
  buttonStyle: {
    margin: "20px 0px 20px 20px",
    borderRadius: '20px',
    height: "35px",
    color: "#000",
    border: "1px solid #979797",
    "&:hover, &:focus" : {
      color: "#C6C6A8",
      border: "1px solid #C6C6A8"
    },
  },
  searchStyle: {
    margin: "20px 0px 20px 20px",
    borderRadius: '20px',
    paddingLeft: "10px",
    color: "#000",
    border: "1px solid #979797",
    // "& .MuiOutlinedInput-root": {
    //   borderRadius: '20px',
    //   paddingLeft: "10px",
    //   color: "#000",
    //   border: "1px solid #979797",
    //   "&:hover, &:focus" : {
    //     color: "#C6C6A8",
    //     border: "1px solid #C6C6A8"
    //   },
    //   '&.Mui-focused fieldset': {
    //     borderColor: 'yellow',
    //   },
    // },
    // "& .MuiOutlinedInput-notchedOutline": {
    //   border: "none"
    // }
  },
  tableHeader: {
    "& .MuiTableCell-root": {
      backgroundColor: "#F2F1F1",
      borderCollapse:'collapse'
    }
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

interface ISpotsData {
  id: number;
  name: string;
  block: string;
  location: string;
  distance: string;
  vacant: string
}

const ParkingPage: React.FC = () => {

  const [spotsData, setSpotsData] = useState<ISpotsData[]>([]);
  const [tableData, setTableData] = useState<ISpotsData[]>([]);
  const [spotDetail, setSpotDetail] = useState<ISpotsData>();

  const handleClick = (type: string) => {
    if(type === "All") { setTableData(spotsData); }
    else if(type === "Open") { setTableData(spotsData.filter(item => item['vacant'] === "Yes")); }
    else if(type === "Occupied") { setTableData(spotsData.filter(item => item['vacant'] === "No")); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if(e.target.value) {
      setTableData(spotsData.filter((item) => item['name'].toLowerCase().includes(e.target.value.toLowerCase()) ));
    }
    else {
      setTableData(spotsData);
    } 
  };

  const handleRowClick = (row: ISpotsData) => {
    setSpotDetail(row);
  };

  useEffect(() => {
    axios.get('https://xm5kidlp3k.execute-api.us-east-2.amazonaws.com/default/spots')
      .then((response) => {
        if(response.status === 200) {
          setSpotsData(response.data);
          setTableData(response.data);
        }
        else {
          throw response;
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  },[]);

  useEffect(() => {
    setSpotDetail(spotsData[0]);
  },[spotsData]);

  console.log(tableData);
  return (
    <div style={useStyles.backgroundStyle}>
      <Header />
      <Box sx={useStyles.outerBox}>
        <Typography variant="h5" sx={{marginLeft: "15px"}} children="Parking Spots" />
        <Box display="flex">
          <Box sx={useStyles.spotsDataBox}>
            <Box display="flex">
              <Button variant="outlined" sx={useStyles.buttonStyle} children="All" autoFocus onClick={() => handleClick("All")} />
              <Button variant="outlined" sx={useStyles.buttonStyle} children="Open" onClick={() => handleClick("Open")} />
              <Button variant="outlined" sx={useStyles.buttonStyle} children="Occupied" onClick={() => handleClick("Occupied")} />
              <InputBase sx={[useStyles.searchStyle]} placeholder="Search" endAdornment={<SearchIcon />} onChange={(e) => handleChange(e)} />
              {/* <TextField sx={[useStyles.searchStyle]} placeholder="Search" InputProps={{endAdornment:<SearchIcon />}} /> */}
            </Box>
            <Box sx={useStyles.tableBox}>
              <Table stickyHeader>
                <TableHead sx={useStyles.tableHeader}>
                  <TableRow>
                    <TableCell align="center"> Name </TableCell> <TableCell align="center"> Block </TableCell> <TableCell align="center"> Location </TableCell>
                    <TableCell align="center"> Distance </TableCell> <TableCell align="center"> Vacant </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.length > 0 ? tableData.map(row => (
                    <TableRow key={row['id']} onClick={() => handleRowClick(row)}>
                      <TableCell align="center">{row['name'] ? row['name'] : "-"}</TableCell>
                      <TableCell align="center">{row['block'] ? row['block'] : "-"}</TableCell>
                      <TableCell align="center">{row['location'] ? row['location'] : "-"}</TableCell>
                      <TableCell align="center">3 mi</TableCell>
                      <TableCell align="center" sx={row['vacant'] === "Yes" ? {color: "#6AAE1C"} : {color: "#AE401C"}}>{row['vacant']}</TableCell>
                    </TableRow>))
                    :
                    <TableRow>
                      <TableCell align="center" colSpan={5}>
                        No results found.
                      </TableCell>
                    </TableRow> 
                  }
                </TableBody>
              </Table>
            </Box>
          </Box>
          <Box sx={useStyles.detailBox}>
            <Box sx={useStyles.detailTitle}>
              <Typography variant="h6" children={spotDetail && spotDetail['name'].toUpperCase()} />
            </Box>
            <Box sx={useStyles.detailContent}>
              <Box>
                <Typography children="EV Charging" />
                <Typography children="Last Occupied" />
                <Typography children="Last Vacant" />
              </Box>
              <Box>
                <Typography children=": Yes" />
                <Typography children=": 19:46" />
                <Typography children=": 20:23" />
              </Box>
            </Box>
            <Box sx={[useStyles.flexCol, {alignItems: "center"}]}>
              <Button variant="contained" sx={useStyles.detailButtonStyle} startIcon={<NavigateIcon/>} children="Navigate"/>
              <Button variant="contained" sx={useStyles.detailButtonStyle} startIcon={<WatchIcon/>} children="Watch Live"/>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default ParkingPage;