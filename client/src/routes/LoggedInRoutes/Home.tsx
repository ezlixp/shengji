import { Link } from "react-router-dom";
import defaultProps from "../../types/defaultProps";

type HomeProps = {};

export default function Home(props: defaultProps<HomeProps>) {
	return (
		<div className={props.className}>
			<Link to="/play">join a game</Link>
		</div>
	);
}
