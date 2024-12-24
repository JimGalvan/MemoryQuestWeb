import {useForm} from "@mantine/form";
import {Button, Group, TextInput, Title} from "@mantine/core";
import userPlayerStore from "../stores/player-store.ts";

const JoinRoomForm = () => {
    const playerName = userPlayerStore((state) => state.player?.name);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            playerName: '',
            joinCode: '',
        },
        validate: {
            playerName: (value) => (/^\S+$/.test(value) ? null : 'Invalid name'),
        },
    });

    const handleCreateGame = (values) => {

    }


    return (
        <form onSubmit={form.onSubmit((values) => handleCreateGame(values))}>
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
                    key={form.key('playerName')}
                    {...form.getInputProps('playerName')}
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