import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";



function Infobox() {
  const [blueMaxList, setBlueMaxList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const client = new ApolloClient({
      uri: "https://bluemaxapi20200812102838.azurewebsites.net/api/graphql",
      cache: new InMemoryCache(),
    });
    client
      .query({
        query: gql`
          query {
            bluemax {
              fullName
              awardActionDate
              battalion
              division
              branch
            }
          }
        `,
      })

      .then(response => {
        console.log(response.data.bluemax);
        setBlueMaxList(response.data.bluemax);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
 
  }, []);



  return (
    <div>
      <h2>
        BLUE MAX CALL w/ React HOOKS
      </h2>
      {isLoading && <p>Loading...</p>}
      <FormControl className="app__dropdown">
            <Select
              variant="outlined"

            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {blueMaxList.map((blueMaxList) => (
                <MenuItem value={blueMaxList.medalOfHonorId}>{blueMaxList.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>


    </div>
  );
}

export default Infobox;
