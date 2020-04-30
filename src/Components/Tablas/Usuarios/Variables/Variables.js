import React, { useState, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "../../../UI/Button/Button";
import styles from "../../../../styles/tables.module.scss";

const CustomPaginationActionsTable = (props) => {
  let info = (
    <TableRow>
      <TableCell style={{ color: "#9e9e9e" }}>
        {"Seleccionar Usuario"}
      </TableCell>
    </TableRow>
  );
  if (props.data) {
    // console.log(props.data);
    const data = Object.values(props.data);
    info = data.map((dt) => (
      <TableRow key={dt.id}>
        <TableCell>{dt.variable}</TableCell>
      </TableRow>
    ));
  }

  const styleBtn = { display: "flex", justifyContent: "space-between" };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell className={styles.Header}>
              <div style={styleBtn}>
                Variable
                <Button
                  disabled={!props.userId}
                  small
                  btntype={"Success"}
                  clicked={props.openAddVar}
                >
                  Añadir variable
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{info}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;
