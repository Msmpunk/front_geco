import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid } from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";

import { getCorpusDocuments } from "../../../services/service"; // Adjust the import path accordingly
import { useParams } from "react-router-dom";

export default function Settings() {
  const [corpus, setCorpus] = useState([]);
  const [corpusColumns, setCorpusColumns] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await getCorpusDocuments(id);

        let columns = formatMetadata(response.data.metadatos)
        columns.unshift({
          Header: 'Nombre del  archivo',
          accessor: 'name', 
          id: 9933222,
          datos: []
        })

        let rowstable = generateData(response.data.tabla, columns)
        if(response.status){
          setCorpusColumns(columns)
          setCorpus(rowstable);
        }
        
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [id]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 1}}
        spacing={{ base: "20px", xl: "20px" }}>
        <DevelopmentTable
          columnsData={corpusColumns}
          tableData={corpus}
        />
      </SimpleGrid>
    </Box>
  );
}


const formatMetadata = (metadata) => {
  return metadata.map(item => ({
    Header: item[1],
    accessor: item[1].toLowerCase().replace(/\s+/g, '_'), // Generates a lowercase accessor with underscores
    id: item[0],
    datos: item[2]
  }));
};

const generateData = (dataArray, columns) => {
  return dataArray.map(item => {
    const id = item[0];
    const name = item[1];
    const metadata = item[2];

    const dataObj = {
      id,
      name
    };

    metadata.forEach(meta => {
      const column = columns.find(col => col.id === meta[0]); // Find the column with matching id
      if (column) {
        dataObj[column.accessor] = meta[1]; // Set the data with column accessor as key
      }
    });

    return dataObj;
  });
};
