import { useContext } from "react";
import styled from "styled-components";
import { DrawerContext } from "../context/DrawerContext";
import { StyledTopics } from "./Topics";

const DrawerTrigger = () => {
  const { setDrawer } = useContext(DrawerContext);

  return (
    <StyledTopics>
      <h3>Links</h3>
      <div className="triggers">
        <span onClick={() => setDrawer({ open: true, type: "SUBSCRIPTIONS" })}>
          Subscriptions
        </span>
        <span onClick={() => setDrawer({ open: true, type: "LISTEN_LATER" })}>
          Listen Later
        </span>
      </div>
    </StyledTopics>
  );
};

export default DrawerTrigger;
