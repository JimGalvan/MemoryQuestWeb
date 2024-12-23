import {Button, Group, TextInput} from '@mantine/core';
import {useForm} from '@mantine/form';
import {useCreateRoomMutation} from "../queries/roomQueries.ts";
import {CreateRoomDto} from "../dtos/CreateRoomDto.ts";

const CreateGameForm = () => {
    const {mutate: createRoom, isPending} = useCreateRoomMutation();

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

    const handleCreateGame = (values: CreateRoomDto) => {
        const {playerName} = values;
        const createGameDto: CreateRoomDto = {playerName};
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