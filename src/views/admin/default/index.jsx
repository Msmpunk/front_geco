// Chakra imports
import {
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
// Assets
// Custom components
import React, { useEffect, useState } from 'react';
import NFT from "components/card/NFT";
// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";

import { getCorpus } from "../../../services/service"; // Adjust the import path accordingly

export default function UserReports() {
  const nftImages = [Nft1, Nft2, Nft3, Nft4, Nft5, Nft6];
  const [corpus, setCorpus] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getCorpus();
        if(response.status){
          setCorpus(response.data);
        }
        
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  const getRandomImage = () => {
    return nftImages[Math.floor(Math.random() * nftImages.length)];
  };


  if (error) {
    return <div>Error: {error}</div>;
  }
  

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Flex direction='column'>
        <Flex
          mt='45px'
          mb='20px'
          justifyContent='space-between'
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}>


        </Flex>
        <SimpleGrid columns={{ base: 1, md: 5 }} gap='20px'>

          {
            corpus.map((data)=>{
              return <NFT
              name={data.nombre}
              author='By Esthera Jackson'
              bidders={[
                Avatar1,
                Avatar2,
                Avatar3,
                Avatar4,
                Avatar1,
                Avatar1,
                Avatar1,
                Avatar1,
              ]}
              image={getRandomImage()}
              currentbid='0.91 ETH'
              download='#'
              id={data.id}
            />
            })
          }

        </SimpleGrid>

      </Flex>
    </Box>
  );
}
