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
  const info = props.data ? (
    props.data.map((dt, index) => (
      <TableRow key={index}>
        <TableCell>{dt.nombre}</TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell>{"Seleccionar Usuario"}</TableCell>
    </TableRow>
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.Header}>Variable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{info}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
