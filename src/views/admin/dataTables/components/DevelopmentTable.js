import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Select,
  Input,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import Card from "components/card/Card";
import React, { useMemo, useState, useEffect } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { getCorpusDocumentsText, getCorpusDocumentsAdjuntos, getCorpusDocumentsPos } from "../../../../services/service";
import { useParams } from "react-router-dom";
import download from 'js-file-download';

export default function DevelopmentTable(props) {
  const { columnsData, tableData } = props;

  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(tableData);
  const [searchInput, setSearchInput] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const { id } = useParams();



  const columns = useMemo(() => {
    const handleSelectAll = (isSelected) => {
      if (isSelected) {
        setSelectedRows(filteredData);
      } else {
        setSelectedRows([]);
      }
    };
    return [
      {
        Header: (
          <Checkbox
            isChecked={selectedRows.length === filteredData.length}
            isIndeterminate={selectedRows.length > 0 && selectedRows.length < filteredData.length}
            onChange={(e) => handleSelectAll(e.target.checked)}
          />
        ),
        accessor: "selection",
        Cell: ({ row }) => (
          <Checkbox
            isChecked={selectedRows.includes(row.original)}
            onChange={() => handleRowSelect(row.original)}
          />
        ),
      },
      ...columnsData.map((column) => ({
        ...column,
        accessor: column.accessor.toString(),
      })),
    ];
  }, [selectedRows, filteredData, columnsData]);

  useEffect(() => {
    let filtered = tableData;

    for (let key in filters) {
      if (filters[key]) {
        filtered = filtered.filter(item => item[key] === filters[key]);
      }
    }

    if (searchInput) {
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          String(val).toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
  }, [filters, tableData, searchInput]);

  const handleFilterChange = (accessor, value) => {
    setFilters({
      ...filters,
      [columnsData[accessor].accessor]: value,
    });
  };

  const handleRowSelect = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((r) => r !== row) : [...prev, row]
    );
  };



  const data = useMemo(() => filteredData, [filteredData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    pageOptions,
    state: { pageIndex },
  } = tableInstance;

  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const handleButtonClick = async () => {
    if (selectedRows.length === 0) {
      return;
    }

    const response = await getCorpusDocumentsText(id, selectedRows);
    download(response.data, 'texts_files.zip');

    const response2 = await getCorpusDocumentsPos(id, selectedRows);
    download(response2.data, 'texts_files_pos.zip');

    const response3 = await getCorpusDocumentsAdjuntos(id, selectedRows);
    download(response3.data, 'texts_files_adjuntos.zip');
  };

  useEffect(() => {
    setSelectedRows([]);
  }, [pageIndex]);

  return (
    <Card
      direction="column"
      w="100%"
      px="0px"
      overflowX={{ sm: "scroll", lg: "hidden" }}
    >
      <Flex justify="flex-end" px="25px" mb="20px" align="center">
        <Text color="secondaryGray.900" fontSize="18px" mr="20px" fontWeight="700" lineHeight="100%">
          Buscar
        </Text>
        <Input
          placeholder="Buscar Archivo..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          width="300px"
        />
        <Button colorScheme="blue" ml="20px" onClick={handleButtonClick}>
          Imprimir archivos [POS-TXT-ADJUNTOS]
        </Button>
      </Flex>
      <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  pe="10px"
                  key={index}
                  borderColor={borderColor}
                >
                  <Flex
                    direction="column"
                    justify="center"
                    align="center"
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color="gray.400"
                    mb="10px"
                  >
                    {column.render("Header")}
                    {column.datos && (
                      <Select
                        placeholder="Select option"
                        onChange={(e) =>
                          handleFilterChange(index - 1, e.target.value)
                        }
                        mt="5px"
                        size="sm"
                        width="100%"
                      >
                        <option value="">All</option>
                        {column.datos.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => (
                  <Td
                    {...cell.getCellProps()}
                    key={index}
                    fontSize={{ sm: "14px" }}
                    minW={{ sm: "150px", md: "200px", lg: "auto" }}
                    borderColor="transparent"
                  >
                    {cell.render("Cell")}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Flex justifyContent="space-between" px="25px" mb="20px">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"< Prev"}
        </button>
        <div>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </div>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {"Next >"}
        </button>
      </Flex>
    </Card>
  );
}
