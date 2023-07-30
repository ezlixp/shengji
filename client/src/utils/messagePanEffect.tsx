export default function messagePanEffect(
    message: string,
    setFunction: Function
) {
    let output = "";
    for (let i = 0; i < message.length; i++) {
        setTimeout(() => {
            output += message[i];
            setFunction(output);
        }, 100 * i);
    }
}
