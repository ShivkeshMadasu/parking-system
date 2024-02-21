import { Box, Button, Table, TableBody, TableCell, TableHead, TableRow, InputBase, IconButton } from "@mui/material";
import { ISpotsData } from "../ParkingPage";
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from "react";
import axios from "axios";

const useStyles = {
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
    iconStyle: {
        margin: "20px 10px 20px 20px",
        height: "35px",
        color: "#000",
        float: "right",
        "&:hover, &:focus" : {
          color: "#C6C6A8",
        },
    },
    tableHeader: {
        "& .MuiTableCell-root": {
            backgroundColor: "#F2F1F1",
            borderCollapse:'collapse'
        }
    },
    tableBox: {
      height: "455px", 
      overflow: "auto", 
      scrollbarWidth: "thin"
    }
}

interface ISpotsTable {
    spotsData: ISpotsData[];
    setSpotsData: (val: ISpotsData[]) => void;
    setSpotDetail: (val: ISpotsData | undefined) => void;
    setIsLoading: (val: boolean) => void;
}

const SpotsTable: React.FC<ISpotsTable> = (props) => {
    const {spotsData, setSpotsData, setSpotDetail, setIsLoading} = props;
    const [tableData, setTableData] = useState<ISpotsData[]>([]);

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
        setTableData(spotsData);
    },[spotsData]);

    return (
        <Box>
            <Box display="flex">
              <Button variant="outlined" sx={useStyles.buttonStyle} children="All" autoFocus onClick={() => handleClick("All")} />
              <Button variant="outlined" sx={useStyles.buttonStyle} children="Open" onClick={() => handleClick("Open")} />
              <Button variant="outlined" sx={useStyles.buttonStyle} children="Occupied" onClick={() => handleClick("Occupied")} />
              <Box flexGrow={1} />
              <InputBase sx={[useStyles.searchStyle]} placeholder="Search" endAdornment={<SearchIcon />} onChange={(e) => handleChange(e)} />
              <IconButton sx={useStyles.iconStyle} onClick={() => getSpotsData()}> <RefreshIcon /> </IconButton> 
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
    );
};

export default SpotsTable;