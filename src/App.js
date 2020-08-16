import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { sortData, prettyPrintStat } from "./util";
import Map from "./Map";
import "leaflet/dist/leaflet.css";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
require('dotenv').config();


function App() {
  const [blueMaxList, setBlueMaxList] = useState([]);
  const [warList, setWarList] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [battleTypeList, setBattleTypeList] = useState([]);
  const [battleList, setBattleList] = useState([]);
  const [blueMaxInput, setBlueMaxInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://bluemaxapi20200812102838.azurewebsites.net/api/bluemax/getbattlelist")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBattleList(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://bluemaxapi20200812102838.azurewebsites.net/api/bluemax/getbattletype")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setBattleTypeList(data);
      });
  }, []);


  useEffect(() => {
    fetch("https://bluemaxapi20200812102838.azurewebsites.net/api/bluemax/getwarlist")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWarList(data);
      });
  }, []);


  useEffect(() => {
    fetch("https://bluemaxapi20200812102838.azurewebsites.net/api/bluemax/getBranchlist")
      .then((response) => response.json())
      .then((data) => {
        setBranchList(data);
      });
  }, []);



  // useEffect(() => {


  //   const client = new ApolloClient({
  //     uri: "https://bluemaxapi20200812102838.azurewebsites.net/api/graphql",
  //     cache: new InMemoryCache(),
  //   });
  //   client
  //     .query({
  //       query: gql`
  //         query {
  //           bluemax {
  //             fullName
  //             awardActionDate
  //             battalion
  //             division
  //             branch
  //           }
  //         }
  //       `,
  //     })

  //     .then(response => {
  //       console.log(response.data.bluemax);
  //       setBlueMaxList(response.data.bluemax);
  //       setIsLoading(false);
  //     })
  //     .catch(error => console.log(error));
 
  // }, []);

  const onBlueMaxChange = async (e) => {
    const blueMaxId = e.target.value;

    // const url =
    //   countryCode === "worldwide"
    //     ? "https://disease.sh/v3/covid-19/all"
    //     : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    // await fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setInputCountry(countryCode);
    //     setCountryInfo(data);
    //     setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    //     setMapZoom(4);
    //   });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
    <h1>Medal Of Honor</h1>
    <p>Congressional Medal of Honor (CMOH)</p>
    <FormControl className="app__dropdown">
            <Select
              variant="outlined"
            >
              <MenuItem value="worldwide">All Wars</MenuItem>
              {Object.entries(warList).map(([key, value]) =>
                <MenuItem value={key}>{value}</MenuItem>

              )}
            </Select>
          </FormControl>

    {/* <FormControl className="app__dropdown">
            <Select
              variant="outlined"
            >
              <MenuItem value="worldwide">All Battles</MenuItem>
              {Object.entries(battleList).map(([key, value]) =>
                <MenuItem value={key}>{value}</MenuItem>

              )}
            </Select>
          </FormControl> */}

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onBlueMaxChange}
            >
              <MenuItem value="worldwide">All Branches</MenuItem>
              {Object.entries(branchList).map(([key, value]) =>
                <MenuItem value={key}>{value}</MenuItem>

              )}
            </Select>
          </FormControl>

          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
            >
              <MenuItem value="worldwide">Battle Type</MenuItem>
              {Object.entries(battleTypeList).map(([key, value]) =>
                <MenuItem value={key}>{value}</MenuItem>

              )}
            </Select>
          </FormControl>
        </div>
        <Map
          
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <div className="app__information">
            <h3>MoH by Battle</h3>
            <Table battleList={battleList} />
            {/* <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
