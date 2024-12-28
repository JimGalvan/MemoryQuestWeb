import {useGetRoomQuery} from "../queries/roomQueries.ts";
import {useNavigate, useParams} from "react-router-dom";
import {LoadingIcon} from "./common/LoadingIcon.tsx";
import {ErrorMessage} from "./common/ErrorMessage.tsx";
import PlayerList from "./PlayersList.tsx";
import {Player} from "../types/Room.ts";
import {Text, Button, Paper, Title} from "@mantine/core";
import {useEffect, useState} from "react";
import userPlayerStore from "../stores/player-store.ts";

const RoomBoard = () => {
    const navigate = useNavigate();
    const {roomId} = useParams<{ roomId: string }>();
    const {data: room, isLoading, isError, isSuccess} = useGetRoomQuery(roomId);
    const [isGameReady, setIsGameReady] = useState(false);
    const playerName = userPlayerStore((state) => state.player?.name);
    let players: Player[] = [];

    useEffect(() => {
        if (room) {
            const isGameReady = room.players.length >= 2;
            setIsGameReady(isGameReady);
        }
    }, [players]);

    if (isLoading) {
        return <LoadingIcon/>
    }

    if (isError) {
        return <ErrorMessage message={"Error loading Room"}/>
    }

    if (!room) {
        return <div>Room not found.</div>;
    }

    if (isSuccess) {
        players = room.players;

    }

    function handleStartGame() {
        navigate(`/room/${roomId}/game`);
    }

    return (
        <div>
            <Title order={2}>Room Board</Title>
            <Title order={2}>Your name: {playerName}</Title>
            <Title order={3}>Room ID: {roomId}</Title>
            <Paper shadow="sm" p="xl">
                <Text size="xl">Access code: <Title order={1}>{room.join_code}</Title></Text>
            </Paper>
            <p>There has to be at least two players to start a Game</p>
            <Button disabled={!isGameReady} onClick={handleStartGame}>Start Game</Button>
            <h3>Players</h3>
            <PlayerList players={players}/>
        </div>
    );
}

export default RoomBoard;