import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "../../../UI/Button/Button";
import styles from "../../../../styles/tables.module.scss";
import stylesG from "../../../../styles/_global.module.scss";

const CustomPaginationActionsTable = (props) => {
  let info = (
    <TableRow>
      <TableCell style={{ color: "#9e9e9e" }}>
        {"Seleccionar Usuario"}
      </TableCell>
    </TableRow>
  );
  if (props.data) {
    const data = Object.values(props.data);
    info = data.map((dt) => (
      <TableRow key={dt.id}>
        <TableCell>{dt.variable}</TableCell>
        <TableCell align="right">
          <div onClick={() => props.deleteVar(dt.id)}>
            <i
              style={{ color: "#666666", cursor: "pointer" }}
              className="material-icons-outlined"
            >
              clear
            </i>
          </div>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Paper>
      <Toolbar className={styles.varsHeader}>
        <span>Variables</span>
        <Button
          disabled={!props.userId}
          small
          btntype={"Success"}
          clicked={props.openAddVar}
        >
          <i className="material-icons-outlined">add</i>
        </Button>
      </Toolbar>
      <TableContainer>
        <Table aria-label="custom pagination table">
          <TableBody>{info}</TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CustomPaginationActionsTable;
