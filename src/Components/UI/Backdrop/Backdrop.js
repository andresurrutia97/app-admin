import React from "react";
import style from './Backdrop.module.scss'

const backdrop = props => (
  props.show ? <div className={style.Backdrop} onClick={props.close}></div> : null
)

export default backdrop;
