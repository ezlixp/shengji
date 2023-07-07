type Props = {};

export default function Disconnected({}: Props) {
	return (
		<p>
			You were disconnected, possibly because someone else connected with
			the same account. <br />
			Please refresh to reconnect.
		</p>
	);
}
