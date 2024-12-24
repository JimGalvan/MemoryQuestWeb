import {useForm} from "@mantine/form";
import {Button, Group, TextInput, Title} from "@mantine/core";
import userPlayerStore from "../stores/player-store.ts";
import {JoinRoomRequestDto} from "../dtos/JoinRoomRequestDto.ts";
import {useJoinRoomMutation} from "../queries/roomQueries.ts";
import {ErrorMessage} from "./common/ErrorMessage.tsx";
import {LoadingIcon} from "./common/LoadingIcon.tsx";
import {useNavigate} from "react-router-dom";

const JoinRoomForm = () => {
    const navigate = useNavigate();
    const playerName = userPlayerStore((state) => state.player?.name);
    const {mutate: joinRoom, isPending, isError, isSuccess, data} = useJoinRoomMutation();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            playerName: playerName,
            joinCode: '',
        },
        validate: {
            playerName: (value) => (/^\S+$/.test(value ?? "") ? null : 'Invalid name'),
        },
    });

    if (isPending) {
        return <LoadingIcon/>;
    }

    if (isError) {
        return <ErrorMessage message={"Error joining room"}/>;
    }

    if (isSuccess) {
        const roomId = data.id;
        navigate(`/room/${roomId}`);
    }

    const handleJoinRoom = (joinRoomRequestDto: JoinRoomRequestDto) => {
        joinRoom(joinRoomRequestDto);
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleJoinRoom(values))}>
            <Group justify="center" mt="md">
                <Title order={3}>Hello {playerName}!</Title>
            </Group>
            <Group justify="center" mt="md">
                <TextInput
                    required
                    size="lg"
                    withAsterisk
                    label="Room Join Code"
                    placeholder="Enter the join code"
                    key={form.key('joinCode')}
                    {...form.getInputProps('joinCode')}
                    style={{width: '60%'}}
                />
            </Group>
            <Group justify="center" mt="md">
                <Button type="submit">Join Now</Button>
            </Group>
        </form>
    );
}

export default JoinRoomForm;