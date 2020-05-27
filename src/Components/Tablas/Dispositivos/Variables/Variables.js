import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "../../../UI/Button/Button";

import styles from "../../../../styles/tables.module.scss";

const CustomPaginationActionsTable = (props) => {
  const info = props.data ? (
    Object.values(props.data).map((dt, index) => (
      <TableRow key={index}>
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
    ))
  ) : (
    <TableRow>
      <TableCell style={{ color: "#9e9e9e" }}>
        {"No hay variables asociadas"}
      </TableCell>
    </TableRow>
  );

  return (
    <Paper>
      <Toolbar className={styles.varsHeader}>
        <span style={{ fontSize: "14px" }}>Variables</span>
        <Button small btntype={"Success"} clicked={props.openAddVar}>
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
