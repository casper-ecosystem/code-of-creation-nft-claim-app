import styled from 'styled-components';
import { StyledContentContainer } from '../App';

export default function Maxed() {
	const MaxedContainer = styled(StyledContentContainer)`
		padding-block: 100px;
	`;

	return (
		<>
			<MaxedContainer>
				<hr></hr>
				<h1>All NFTs Already Claimed</h1>
				<p>All 500 Code of Creation NFTs have already been claimed.</p>
				<hr></hr>
			</MaxedContainer>
		</>
	);
}
