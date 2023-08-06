import styles from "./Card.module.css";

type CardProps = {
    rank: string;
    suit: string;
    trump: boolean;
};

export default function Card({ rank, suit, trump }: CardProps) {
    const unicodeCards = {
        Diamonds: {
            "2": "🃂",
            "3": "🃃",
            "4": "🃄",
            "5": "🃅",
            "6": "🃆",
            "7": "🃇",
            "8": "🃈",
            "9": "🃉",
            "10": "🃊",
            J: "🃋",
            Q: "🃍",
            K: "🃎",
            A: "🃁",
            LJ: "🃟",
            HJ: "🂿",
        },
        Clubs: {
            "2": "🃒",
            "3": "🃓",
            "4": "🃔",
            "5": "🃕",
            "6": "🃖",
            "7": "🃗",
            "8": "🃘",
            "9": "🃙",
            "10": "🃚",
            J: "🃛",
            Q: "🃝",
            K: "🃞",
            A: "🃑",
            LJ: "🃟",
            HJ: "🂿",
        },
        Hearts: {
            "2": "🂲",
            "3": "🂳",
            "4": "🂴",
            "5": "🂵",
            "6": "🂶",
            "7": "🂷",
            "8": "🂸",
            "9": "🂹",
            "10": "🂺",
            J: "🂻",
            Q: "🂽",
            K: "🂽",
            A: "🂱",
            LJ: "🃟",
            HJ: "🂿",
        },
        Spades: {
            "2": "🂢",
            "3": "🂣",
            "4": "🂤",
            "5": "🂥",
            "6": "🂦",
            "7": "🂧",
            "8": "🂨",
            "9": "🂩",
            "10": "🂪",
            J: "🂫",
            Q: "🂭",
            K: "🂮",
            A: "🂡",
            LJ: "🃟",
            HJ: "🂿",
        },
        "": {
            "2": "🂠",
            "3": "🂠",
            "4": "🂠",
            "5": "🂠",
            "6": "🂠",
            "7": "🂠",
            "8": "🂠",
            "9": "🂠",
            "10": "🂠",
            J: "🂠",
            Q: "🂠",
            K: "🂠",
            A: "🂠",
            LJ: "🃟",
            HJ: "🂿",
        },
    };

    return (
        <div
            className={`${styles.card} ${
                suit == "Diamonds" || suit == "Hearts" || rank == "HJ" ? styles.red : styles.white
            } ${suit === "" && rank === "2" && styles.placeholder}`}
        >
            {trump && "😬"}
            <svg focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" height="110" width="77">
                <rect fill="#fff" x="-2" y="0" width="75" height="114"></rect>
                <text
                    fill={
                        suit === "Diamonds" || suit === "Hearts" || rank === "HJ"
                            ? "rgb(187, 3, 19)"
                            : suit === "" && rank === "2"
                            ? "rgb(170, 170, 170)"
                            : "rgb(0, 0, 0)"
                    }
                    fontSize={"120px"}
                    textLength={"77px"}
                    x={"-3"}
                    y={"97"}
                >
                    {unicodeCards[suit as keyof typeof unicodeCards][rank as keyof (typeof unicodeCards)["Diamonds"]]}
                </text>
            </svg>
        </div>
    );
}
