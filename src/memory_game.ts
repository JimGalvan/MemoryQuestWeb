import Phaser from "phaser";

interface CardData {
    number: number;
    color: string;
}

interface Card extends Phaser.GameObjects.Rectangle {
    cardIndex: number;
    isFlipped: boolean;
    cardData: CardData;
    text: Phaser.GameObjects.Text;
}

interface GameUpdateMessage {
    type: string;
    card_indices?: number[];
    match?: boolean;
    board?: CardData[];
}

export const initGame = (containerId: string) => {
    const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: containerId,
        scene: {
            preload,
            create,
            update,
        },
    };

    const game = new Phaser.Game(config);
    return game;
}

const cards: Card[] = [];
let flippedCards: Card[] = [];
let socket: WebSocket;
let board: CardData[] = [];

function preload(this: Phaser.Scene): void {
    // No assets to preload since we'll use simple shapes and text
}

function create(this: Phaser.Scene): void {
    const loadingText = this.add.text(400, 300, "Loading...", {
        font: "40px Arial",
        color: "#ffffff",
    }).setOrigin(0.5);

    socket = new WebSocket("ws://localhost:8000/ws/game/1/");

    socket.onopen = (): void => {
        console.log("WebSocket connection established");
    };

    socket.onmessage = (event: MessageEvent): void => {
        const data: GameUpdateMessage = JSON.parse(event.data);
        if (data.type === "game_update") {
            handleGameUpdate(data);
        } else if (data.type === "reset_flipped_cards") {
            resetFlippedCards();
        } else if (data.type === "board_state" && data.board) {
            console.log("Received board state:", data.board);
            board = data.board;
            loadingText.setVisible(false); // Hide loading message
            initializeBoard(this); // Initialize the board with the received data
        }
    };

    socket.onerror = (error: Event): void => {
        console.error("WebSocket error:", error);
    };

    socket.onclose = (): void => {
        console.log("WebSocket connection closed");
    };
}

function initializeBoard(scene: Phaser.Scene): void {
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#FFC300", "#C70039", "#900C3F"];
    const clientBoard = generateBoard(colors);
    const boardData = board;

    console.log("Server board state:", board);
    console.log("Client board state:", clientBoard);

    const positions = [
        [100, 100], [200, 100], [300, 100],
        [100, 200], [200, 200], [300, 200],
        [100, 300], [200, 300], [300, 300],
    ];

    positions.forEach((pos, index) => {
        const cardData = boardData[index];
        const rectangle = scene.add.rectangle(pos[0], pos[1], 80, 100, 0xaaaaaa).setInteractive();
        const card: Card = Object.assign(rectangle, {
            cardIndex: index,
            isFlipped: false,
            cardData: cardData,
            text: scene.add.text(pos[0] - 10, pos[1] - 10, "", {
                font: "20px Arial",
                color: "#000",
            }).setVisible(false),
        });

        card.on("pointerdown", () => {
            if (!card.isFlipped && flippedCards.length < 2) {
                flipCard(card, scene);
                sendMessage({action: "flip_card", card_index: card.cardIndex});
            }
        });

        cards.push(card);
    });
}

function handleGameUpdate(data: GameUpdateMessage): void {
    const {card_indices, match} = data;

    if (match === true && card_indices) {
        card_indices.forEach((index) => {
            const card = cards[index];
            card.setFillStyle(0x00ff00);
            card.disableInteractive();
        });
    } else if (match === false && card_indices) {
        setTimeout(() => {
            card_indices.forEach((index) => {
                const card = cards[index];
                card.isFlipped = false;
                card.setFillStyle(0xaaaaaa);
                card.text.setVisible(false);
            });
            flippedCards = [];
        }, 1000);
    } else if (card_indices) {
        card_indices.forEach((index) => {
            const card = cards[index];
            card.isFlipped = true;
            card.setFillStyle(Phaser.Display.Color.HexStringToColor(card.cardData.color).color);
            card.text.setText(card.cardData.number.toString());
            card.text.setVisible(true);
        });
    }
}

function resetFlippedCards(): void {
    flippedCards.forEach((card) => {
        card.isFlipped = false;
        card.setFillStyle(0xaaaaaa);
        card.text.setVisible(false);
    });
    flippedCards = [];
}

function sendMessage(message: Record<string, unknown>): void {
    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));
    }
}

function update(): void {
    // Game update logic (if needed)
}

function flipCard(card: Card, scene: Phaser.Scene): void {
    card.isFlipped = true;
    card.setFillStyle(Phaser.Display.Color.HexStringToColor(card.cardData.color).color);
    card.text.setText(card.cardData.number.toString());
    card.text.setVisible(true);
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch(scene);
    }
}

function checkMatch(scene: Phaser.Scene): void {
    const [card1, card2] = flippedCards;
    if (card1.cardData.number === card2.cardData.number) {
        card1.disableInteractive();
        card2.disableInteractive();
        sendMessage({action: "match_found", card_indices: [card1.cardIndex, card2.cardIndex]});
        flippedCards = [];
    } else {
        sendMessage({action: "no_match"});
        resetFlippedCards();
    }
}

function generateBoard(colors: string[]): CardData[] {
    const pairs: CardData[] = [];
    for (let i = 0; i < 4; i++) {
        pairs.push({number: i + 1, color: colors[i % colors.length]});
        pairs.push({number: i + 1, color: colors[i % colors.length]});
    }
    return Phaser.Utils.Array.Shuffle(pairs);
}
