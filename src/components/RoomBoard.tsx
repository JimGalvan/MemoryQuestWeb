import {useGetRoomQuery} from "../queries/roomQueries.ts";
import {useParams} from "react-router-dom";
import {LoadingIcon} from "./common/LoadingIcon.tsx";
import {ErrorMessage} from "./common/ErrorMessage.tsx";
import PlayerList from "./PlayersList.tsx";
import {Player} from "../types/Room.ts";

const RoomBoard = () => {
    const {roomId} = useParams<{ roomId: string }>();
    const {data, isLoading, isError, isSuccess} = useGetRoomQuery(roomId);
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
            <h3>Players</h3>
            <PlayerList players={players}/>
        </div>
    );
}

export default RoomBoard;