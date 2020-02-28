import React from "react";
import Item from "./Item/Item";
import styles from "./Items.module.scss";

const Items = props => {
  return (
    <div className={styles.Items}>
      {props.routes.map(rt => {
        return (
          <Item key={rt.name} link={rt.path} icon={rt.icon}>
            {rt.name}
          </Item>
        );
      })}
    </div>
  );
};

export default Items;
