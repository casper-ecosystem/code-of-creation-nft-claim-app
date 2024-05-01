import styled from 'styled-components';
import { StyledContentContainer } from '../App';

export default function Success() {
	const SuccessContainer = styled(StyledContentContainer)`
		padding-block: 100px;
	`;

	return (
		<>
			<SuccessContainer>
				<hr></hr>
				<h1>Success!</h1>
				<p>
					You have successfully signed up for the Code-of-Creation NFT airdrop. Your NFT will be sent to your wallet
					soon.
				</p>
				<hr></hr>
			</SuccessContainer>
		</>
	);
}
