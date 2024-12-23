import {useGetRoomQuery} from "../queries/roomQueries.ts";
import {useParams} from "react-router-dom";

const RoomBoard = () => {
    const {roomId} = useParams<{ roomId: string }>();
    const {data, isLoading, isError} = useGetRoomQuery(roomId);

    return (
        <div>
            <h1>Room Board</h1>
            <h2>Room ID: {roomId}</h2>
        </div>
    );
}

export default RoomBoard;