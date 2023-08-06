import { Link } from "react-router-dom";

type HomeProps = {};

export default function Home({}: HomeProps) {
    return (
        <>
            <Link to="/play">join a game</Link>
        </>
    );
}
