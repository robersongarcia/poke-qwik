import { Slot, component$, useStyles$ } from "@builder.io/qwik";

import styles from "./styles.css?inline";

export default component$(() => {

  useStyles$(styles)

  return <Slot />;
});