import { DataGrid } from "@mui/x-data-grid";
import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import Modal from "./Modal";

import PropTypes from "prop-types";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "description",
    headerName: "Currency",
    width: 300,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: "code",
    headerName: "Code",
    width: 150,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
  },
  {
    field: "rate",
    headerName: "Rate",
    width: 110,
    sortComparator: (v1, v2) => v1.localeCompare(v2),
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
  const handleChange = (e) => {
    searchRef.current = e.target.value;
    setSearchValue(searchRef.current);
  };
  return (
    // <Box sx={{ height: 400, width: "100%" }}>
    <>
      <div className="mx-8 my-4">
        <div className="flex space-between mb-2">
          <input
            type="text"
            className="p-2 border-2 rounded"
            placeholder="Search..."
            required
            value={searchValue}
            onChange={(e) => handleChange(e)}
          />
        </div>
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
      </div>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.object,
};

export default Table;
