export interface Room {
    id: string;
    joinCode: string;
    players: Player[];
    game: Game;
}

export interface Player {
    id: string;
    name: string;
    score: number;
}

export interface Game {
    id: string;
    name: string;
}