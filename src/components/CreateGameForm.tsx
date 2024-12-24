import {Button, Group, TextInput} from "@mantine/core";
import {useForm} from "@mantine/form";
import {useCreateRoomMutation} from "../queries/roomQueries.ts";
import {EnterRoomDto} from "../dtos/EnterRoomDto.ts";
import {useNavigate} from "react-router-dom";
import {LoadingIcon} from "./common/LoadingIcon.tsx";
import {ErrorMessage} from "./common/ErrorMessage.tsx";
import userPlayerStore from "../stores/player-store.ts";
import {Player} from "../types/Room.ts";
import {useState} from "react";

enum PlayerAction {
    JOIN,
    CREATE,
    UNKNOWN
}

const CreateGameForm = () => {
    const {mutate: createRoom, isPending, isError, isSuccess, data} = useCreateRoomMutation();
    const navigate = useNavigate();
    const setPlayer = userPlayerStore((state) => state.setPlayer);
    const [playerAction, setPlayerAction] = useState(PlayerAction.UNKNOWN);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            playerName: "",
            joinCode: "",
        },
        validate: {
            playerName: (value) => (/^\S+$/.test(value) ? null : "Invalid name"),
        },
    });

    if (isPending) {
        return <LoadingIcon/>;
    }

    if (isError) {
        return <ErrorMessage message={"Error creating room"}/>;
    }

    if (isSuccess) {
        const roomId = data.id;
        navigate(`/room/${roomId}`);
    }

    const handleCreateGame = (values: EnterRoomDto) => {
        const {playerName} = values;
        const player: Player = {name: playerName, id: "", isOwner: true};
        setPlayer(player);
        const createGameDto: EnterRoomDto = {playerName};
        createRoom(createGameDto);
    };

    const handleJoinRoom = (values: EnterRoomDto) => {
        const {playerName} = values;
        const player: Player = {name: playerName, id: "", isOwner: false};
        setPlayer(player);
        navigate("/join-room");
    };

    const handleFormSubmit = (values: EnterRoomDto, playerAction: PlayerAction) => {
        console.log(playerAction);
        if (playerAction === PlayerAction.CREATE) {
            console.log("Creating room");
            handleCreateGame(values);
        } else if (playerAction === PlayerAction.JOIN) {
            console.log("Joining room");
            handleJoinRoom(values);
        } else
            console.log("Unknown action");
    }

    return (
        <div>
            <form onSubmit={form.onSubmit((values) => handleFormSubmit(values, playerAction))}>
                <Group justify="center" mt="md">
                    <TextInput
                        required
                        size="lg"
                        withAsterisk
                        label="Player Name"
                        placeholder="Your name"
                        {...form.getInputProps("playerName")}
                        style={{width: "60%"}}
                    />
                </Group>
                <Group justify="center" mt="md">
                    <Button type="submit" onClick={() => setPlayerAction(PlayerAction.CREATE)}>Create Room</Button>
                    <Button type="submit" onClick={() => setPlayerAction(PlayerAction.JOIN)}>
                        Join Room
                    </Button>
                </Group>
            </form>
        </div>
    );
};

export default CreateGameForm;
