import React from "react";
import Popover from "@material-ui/core/Popover";

import styles from "./Popover.module.scss";

export default function SimplePopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className={styles.Icon} onClick={handleClick}>
        <i className="material-icons-outlined">more_vert</i>
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <div className={styles.Options}>
          <div>
            Modificar <i className="material-icons-outlined">edit</i>
          </div>
          <div>
            Eliminar <i className="material-icons-outlined">delete</i>
          </div>
        </div>
      </Popover>
    </div>
  );
}
