export interface Room {
    id: string;
    joinCode: string;
    players: Player[];
    game: Game;
}

export interface Player {
    id: string;
    name: string;
    isOwner: boolean;
}

export interface Game {
    id: string;
    name: string;
}