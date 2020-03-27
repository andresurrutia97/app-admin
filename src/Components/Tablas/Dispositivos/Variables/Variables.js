import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import styles from "../../../../styles/tables.module.scss";

const CustomPaginationActionsTable = props => {
  // console.log(props.data);
  const info = props.data ? (
    props.data.map((dt, index) => (
      <TableRow key={index}>
        <TableCell>{dt.nombre}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell style={{ color: "#9e9e9e" }}>
        {"No hay variables asociadas"}
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableBody>{info}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
