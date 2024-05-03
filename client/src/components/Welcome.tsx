import styled from 'styled-components';
import background from '../bg.jpg';
import logo from '../logo.png';

const Container = styled.div(({ theme }) =>
	theme.withMedia({
		//backgroundImage: [`url("${mobileBgImage}")`, `url("${desktopBgImage}")`, `url("${desktopBgImage}")`],
		backgroundImage: `url("${background}")`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: ['top 50% center', 'top 80% center', 'center', 'top 35% center'],
		position: 'absolute',
		top: 40,
		left: 0,
		right: 0,
		height: 'calc(100vh - 40px)',
	})
);

const HeadingContainer = styled.div(({ theme }) =>
	theme.withMedia({
		width: ['90%', '70%', '60%'],
		margin: 'auto',
		marginTop: ['80px', '50px', 0],
		textAlign: 'center',
		h2: {
			color: 'white',
		},
	})
);

const StyledLogo = styled.img(({ theme }) =>
	theme.withMedia({
		position: 'relative',
		top: 30,
		left: 30,
		width: '200px',
		objectFit: 'contain',
	})
);

export const Welcome = () => {
	return (
		<Container>
			<StyledLogo src={logo} />
			<HeadingContainer>
				<h2>A Collaboration between Dario De Siena & Casper.Network</h2>
			</HeadingContainer>
		</Container>
	);
};
