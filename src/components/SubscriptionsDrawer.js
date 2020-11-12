import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import LinkWrapper from "./LinkWrapper";
import { CloseIcon } from "./Icons";
import { DrawerContext } from "../context/DrawerContext";
import { stripStr } from "../utils";

const Wrapper = styled.div`
  padding: 1rem;

  h3 {
    margin-bottom: 1.6rem;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header svg {
    width: 20px;
    height: 20px;
    position: relative;
    top: -10px;
    margin-right: 1rem;
    fill: ${(props) => props.theme.primaryColor};
  }

  .sub {
    margin-bottom: 1.3rem;
    display: flex;
    align-items: center;
  }

  .sub img {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    box-shadow: ${(props) => props.theme.bs1};
    margin-right: 1rem;
  }

  .sub span {
    display: block;
  }

  .sub span:last-child {
    font-size: 0.9rem;
    opacity: 0.5;
  }
`;

const SuscriptionsDrawer = () => {
  const { setDrawer } = useContext(DrawerContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const subscriptions =
      JSON.parse(localStorage.getItem("subscriptions")) || [];
    setSubscriptions(subscriptions);
  }, []);

  return (
    <Wrapper>
      <div className="header">
        <h3>Subscriptions</h3>
        <CloseIcon onClick={() => setDrawer({ open: false })} />
      </div>

      {subscriptions.map((sub) => (
        <LinkWrapper href={`/podcasts/${sub.id}`} key={sub.id}>
          <div className="sub">
            <img src={sub.thumbnail} alt="thumbnail" />
            <div className="sub-info">
              <span>{sub.name}</span>
              <span>{stripStr(sub.author, 38)}</span>
            </div>
          </div>
        </LinkWrapper>
      ))}
    </Wrapper>
  );
};

export default SuscriptionsDrawer;
