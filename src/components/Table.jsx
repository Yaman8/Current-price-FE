import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import Modal from "./Modal";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "description",
    headerName: "Currency",
    width: 150,
  },
  {
    field: "code",
    headerName: "Code",
    width: 150,
  },
  {
    field: "rate",
    headerName: "Rate",
    // type: "number",
    width: 110,
  },
];

const Table = ({ data }) => {
  const searchRef = useRef("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedRow, setSelectedRow] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const rowData = useMemo(() => {
    const keys = Object.keys(data?.bpi);
    const chartArray = keys.map((currency, index) => {
      const currencyObject = {
        id: index + 1,
        description: data?.bpi?.[currency]?.description,
        code: currency,
        rate: data?.bpi?.[currency]?.rate,
      };
      return currencyObject;
    });
    return chartArray;
  }, [data]);
  const rows = useMemo(() => {
    const currencyRows = rowData?.filter(
      (x) =>
        x?.id == searchValue ||
        x?.description.toLowerCase().includes(searchValue) ||
        x?.code.toLowerCase().includes(searchValue) ||
        x?.rate.includes(searchValue)
    );
    return currencyRows;
  }, [data, searchValue]);
  //   console.log(
  //     rows?.filter(
  //       (x) => x?.id.includes(searchValue)
  //       //   x?.id.includes(searchValue)===1 ||
  //       //   x?.description.includes(searchValue) ||
  //       //   x?.code.includes(searchValue) ||
  //       //   x?.rate.includes(searchValue)
  //     )
  //   );
  console.log(rows);
  const handleChange = (e) => {
    searchRef.current = e.target.value;
    setSearchValue(searchRef.current);
  };
  return (
    // <Box sx={{ height: 400, width: "100%" }}>
    <>
      <input value={searchValue} onChange={(e) => handleChange(e)} />

      <DataGrid
        rows={!_.isEmpty(rows) ? rows : []}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        onRowClick={(params) => {
          setShowModal(true);
          setSelectedRow(params);
        }}
        pageSizeOptions={[5]}
      />
      <Modal
        row={selectedRow}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default Table;
