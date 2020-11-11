import { useContext } from "react";
import styled, { css } from "styled-components";
import PlayerDrawer from './PlayerDrawer';
import SubscriptionsDrawer from './SubscriptionsDrawer';
import ListenLaterDrawer from './ListenLaterDrawer';
import { DrawerContext } from "../context/DrawerContext";

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	z-index: 2;
	width: 440px;
	min-height: 100vh;
	padding-top: 1.5rem;
	background-color: ${props => props.theme.violet};
	transform: translateX(199%);
	transition: all 0.3s ease-in-out;

	${props =>
		props.open &&
		css`
			transform: translateX(0);
		`}
`;

const Drawer = () => {
	const { drawer } = useContext(DrawerContext);

	return (
		<Wrapper open={drawer.open}>
			{drawer.type === "PLAYER" && <PlayerDrawer />}
			{drawer.type === "SUBSCRIPTIONS" && <SubscriptionsDrawer />}
			{drawer.type === "LISTEN_LATER" && <ListenLaterDrawer />}
		</Wrapper>
	);
};

export default Drawer;
