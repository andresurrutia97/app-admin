import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import styles from "../../../styles/tables.module.scss";
import Popover from "../../UI/Popover/Popover";

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

const CustomPaginationActionsTable = (props) => {
  const data = props.vars;
  // console.log(data);
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, props.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Cosntantes para la creacion de los headers
  const headers = [
    {
      label: "Nombre",
      align: "left",
    },
    {
      label: "Valor",
      align: "right",
    },
    {
      label: "Unidad de Medida",
      align: "right",
    },
    {
      label: "Descripción",
      align: "right",
    },
    {
      label: "",
    },
  ];

  //Estado para el manejo de columnas seleccionadas
  const [selected, setSelected] = React.useState([]);

  const handleClick = (id) => {
    setSelected(id);
  };

  const truncateName = (str) => {
    return str.length > 120 ? str.substring(0, 120) + "..." : str;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            {headers.map((hd, index) => {
              return (
                <TableCell
                  className={styles.Header}
                  key={index}
                  align={hd.align}
                >
                  {hd.label}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((dt, index) => {
            return (
              <TableRow
                key={index}
                hover
                classes={{ selected: styles.Selected }}
                className={styles.Rows}
                selected={selected === dt.id}
                onClick={() => handleClick(dt.id)}
              >
                <TableCell>{dt.constante}</TableCell>
                <TableCell align="right">{dt.valor}</TableCell>
                <TableCell align="right">{dt.unidadMedida}</TableCell>
                <TableCell align="right" style={{ width: "40%" }}>
                  {truncateName(dt.descripcion)}
                </TableCell>
                <TableCell align="right">
                  <Popover>
                    <div className={styles.Options}>
                      <div onClick={() => props.updateVar(dt)}>
                        Modificar
                        <i className="material-icons-outlined">edit</i>
                      </div>
                      <div onClick={() => props.deleteVar(dt.id)}>
                        Eliminar
                        <i className="material-icons-outlined">delete</i>
                      </div>
                    </div>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "Todos", value: -1 }]}
              colSpan={11}
              count={data.length}
              labelRowsPerPage="Filas por página"
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "hola" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default CustomPaginationActionsTable;