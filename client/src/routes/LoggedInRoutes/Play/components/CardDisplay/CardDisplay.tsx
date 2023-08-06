import { CardType } from "../../../../../types/socketioTypes";
import Card from "../Card/Card";
import styles from "./CardDisplay.module.css";

type BidProps = {
    text: string;
    cards: CardType[];
    onClick?: React.MouseEventHandler;
};

export default function CardDisplay({ onClick, text, cards }: BidProps) {
    return (
        <div onClick={onClick} className={styles["bid-container"]}>
            {cards.map((card, i) => {
                return <Card key={i} rank={card.rank} suit={card.suit} trump={card.trump} noHover />;
            })}
            <p>{text}</p>
        </div>
    );
}
