import {Button, Group, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useCreateRoomMutation} from "../queries/roomQueries.ts";
import {CreateRoomRequestDto} from "../dtos/CreateRoomRequestDto.ts";
import {useNavigate} from "react-router-dom";

const CreateGameForm = () => {
    const {mutate: createRoom, isPending, isError, isSuccess, data} = useCreateRoomMutation();
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            playerName: '',
        },
        validate: {
            playerName: (value) => (/^\S+$/.test(value) ? null : 'Invalid name'),
        },
    });

    if (isPending) {
        return <div>Creating room...</div>;
    }

    if (isError) {
        return <div>Failed to create room</div>;
    }

    if (isSuccess) {
        const roomId = data.id;
        navigate(`/room/${roomId}`);
    }

    const handleCreateGame = (values: CreateRoomRequestDto) => {
        const {playerName} = values;
        const createGameDto: CreateRoomRequestDto = {playerName};
        createRoom(createGameDto);
    }

    return (
        <form onSubmit={form.onSubmit((values) => handleCreateGame(values))}>
            <Group justify="center" mt="md">
                <TextInput
                    required
                    size="lg"
                    withAsterisk
                    label="playerName"
                    placeholder="Your name"
                    key={form.key('playerName')}
                    {...form.getInputProps('playerName')}
                    style={{width: '60%'}}
                />
            </Group>
            <Group justify="center" mt="md">
                <Button type="submit" onSubmit={() => handleCreateGame}>Create Room</Button>
                <Button type="submit">Join Room</Button>
            </Group>
        </form>
    );
}

export default CreateGameForm;