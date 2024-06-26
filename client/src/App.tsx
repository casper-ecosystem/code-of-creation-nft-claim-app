import { useEffect, useState, createContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useClickRef, ThemeModeType } from '@make-software/csprclick-ui';
import ClickTopBar from './components/ClickTopBar';
import Container from './components/container';
import { AppTheme } from './theme';
import { Welcome } from './components/Welcome';
import Instructions from './components/Instructions';
import Success from './components/Success';
import { checkMax, checkUser } from './apiClient';
import Maxed from './components/Maxed';

export const ActiveAccountContext = createContext(null);

export const StyledContentContainer = styled.div(({ theme }) =>
	theme.withMedia({
		width: ['90%', '60%', '40%'],
		margin: 'calc(100vh + 30px) auto 30px auto',
		'h2, h3': {
			fontWeight: '300',
		},
		h3: {
			marginTop: 'initial',
			fontSize: 'calc(8px + 2vmin)',
		},
		'h1, p': {
			color: theme.contentPrimary,
		},
	})
);

const App = () => {
	const clickRef = useClickRef();
	const [themeMode, setThemeMode] = useState<ThemeModeType>(ThemeModeType.light);
	const [activeAccount, setActiveAccount] = useState<any>(null);
	const [claimed, setClaimed] = useState<boolean>(false);
	const [maxedOut, setMaxedOut] = useState<boolean>(false);

	useEffect(() => {
		clickRef?.on('csprclick:signed_in', (evt: any) => {
			setActiveAccount(evt.account);
		});
		clickRef?.on('csprclick:switched_account', (evt: any) => {
			setActiveAccount(evt.account);
		});
		clickRef?.on('csprclick:signed_out', () => {
			setActiveAccount(null);
		});
		clickRef?.on('csprclick:disconnected', () => {
			setActiveAccount(null);
		});
	}, [clickRef?.on]);

	function userCheck() {
		checkUser(activeAccount.public_key)
			.then(hasClaimed => {
				setClaimed(hasClaimed);
			})
			.catch(error => {
				console.error(error.message);
			});
	}

	useEffect(() => {
		checkMax()
			.then(maxedOut => {
				setMaxedOut(maxedOut);
			})
			.catch(error => {
				console.error(error.message);
			});
	});

	useEffect(() => {
		if (activeAccount !== null) {
			userCheck();
		} else {
			setClaimed(false);
		}
	}, [activeAccount]);

	let contentElement = <Instructions setClaimed={setClaimed} />;
	if (maxedOut) {
		contentElement = <Maxed />;
	} else if (claimed) {
		contentElement = <Success />;
	}

	return (
		<ThemeProvider theme={AppTheme[themeMode]}>
			<ClickTopBar
				themeMode={themeMode}
				onThemeSwitch={() => setThemeMode(themeMode === ThemeModeType.light ? ThemeModeType.dark : ThemeModeType.light)}
			/>
			<Container>
				<Welcome />
				<ActiveAccountContext.Provider value={activeAccount}>{contentElement}</ActiveAccountContext.Provider>
			</Container>
		</ThemeProvider>
	);
};

export default App;
