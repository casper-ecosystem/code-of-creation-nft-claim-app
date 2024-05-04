import styled from 'styled-components';
import { useClickRef } from '@make-software/csprclick-ui';
import { Dispatch, SetStateAction, useContext } from 'react';
import { ActiveAccountContext, StyledContentContainer } from '../App';
import { claim } from '../apiClient';

const StyledStepContainer = styled.div(({ theme }) =>
	theme.withMedia({
		marginBlock: '1em',
	})
);

const StyledButton = styled.button(({ theme }) =>
	theme.withMedia({
		border: 'none',
		borderRadius: '0.5em',
		margin: 'auto',
		cursor: 'pointer',
		width: '100%',
	})
);

interface InstructionsProps {
	setClaimed: Dispatch<SetStateAction<boolean>>;
}

export default function Instructions(props: InstructionsProps) {
	const clickRef = useClickRef();
	const activeAccount: any = useContext(ActiveAccountContext);

	async function handleClaim() {
		if (activeAccount === null) {
			alert('Please sign in to the Casper Wallet before trying to claim. Refer to step 2.');
			return;
		}

		try {
			props.setClaimed(await claim(activeAccount.public_key));
		} catch (error: any) {
			alert(error.message);
		}
	}

	async function connectWallet() {
		if (!(await clickRef?.isProviderPresent('casper-wallet'))) {
			alert('Please visit this website from the browser in the Casper Wallet app to sign in.');
			return;
		}
		console.log(await clickRef?.connect('casper-wallet'));
	}

	function openCasperWalletInstall() {
		window.open('https://casperwallet.io/download', '_blank');
	}

	return (
		<StyledContentContainer>
			<h2>Get your first NFT minted on the Casper blockchain by Dario De Siena</h2>
			<h3>Step by step guide.</h3>
			<hr></hr>
			<StyledStepContainer>
				<h3>01</h3>
				<p>
					Begin by installing the Casper Wallet. The Casper Wallet is available for iOS, Android, and Google Chrome.
					Once you have installed the Casper Wallet, follow the instructions in the app to create a new wallet.
				</p>
				<StyledButton onClick={openCasperWalletInstall}>Install Now</StyledButton>
			</StyledStepContainer>
			<hr></hr>
			<StyledStepContainer>
				<h3>02</h3>
				<p>
					Sign into the Casper Wallet from this website. Click &quot;Sign in&quot; and then click &quot;Casper
					Wallet&quot;. This will open the Casper Wallet and ask you to confirm the connection.
				</p>
				<StyledButton onClick={connectWallet}>Sign in</StyledButton>
			</StyledStepContainer>
			<hr></hr>
			<StyledStepContainer>
				<h3>03</h3>
				<p>
					Sign up for the NFT Dario De Siena NFT airdrop. Once you&apos;ve signed up, your Casper account will be
					recorded in our database and you will receive the NFT in one to two days.
				</p>
				<StyledButton onClick={handleClaim}>Claim NFT</StyledButton>
			</StyledStepContainer>
			<hr></hr>
		</StyledContentContainer>
	);
}
