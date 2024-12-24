import {useGetRoomQuery} from "../queries/roomQueries.ts";
import {useParams} from "react-router-dom";
import {LoadingIcon} from "./common/LoadingIcon.tsx";
import {ErrorMessage} from "./common/ErrorMessage.tsx";
import PlayerList from "./PlayersList.tsx";
import {Player} from "../types/Room.ts";
import {Text, Button, Paper, Title} from "@mantine/core";
import {useState} from "react";

const RoomBoard = () => {
    const {roomId} = useParams<{ roomId: string }>();
    const {data, isLoading, isError, isSuccess} = useGetRoomQuery(roomId);
    // state for start game button
    const [isGameReady, setIsGameReady] = useState(false);
    let players: Player[] = [];

    if (isLoading) {
        return <LoadingIcon/>
    }

    if (isError) {
        return <ErrorMessage message={"Error loading Room"}/>
    }

    if (!data) {
        return <div>Room not found.</div>;
    }

    if (isSuccess) {
        players = data.players;
    }

    return (
        <div>
            <h2>Room Board</h2>
            <h3>Room ID: {roomId}</h3>
            <Paper shadow="sm" p="xl">
                <Text size="xl">Access code: <Title order={1}>{data.join_code}</Title></Text>
            </Paper>
            <p>There has to be at least two players to start a Game</p>
            <Button disabled={!isGameReady}>Start Game</Button>
            <h3>Players</h3>
            <PlayerList players={players}/>
        </div>
    );
}

export default RoomBoard;