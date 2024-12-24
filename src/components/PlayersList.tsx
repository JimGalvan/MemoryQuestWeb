import {Table} from "@mantine/core";
import {Player} from "../types/Room.ts";

interface PlayerListProps {
    players: Player[];
}

const displayRole = (isOwner: boolean) => {
    return isOwner ? "Room Owner" : "Player";
}

const PlayerList = (props: PlayerListProps) => {

    const rows = props.players.map((element) => (
        <Table.Tr key={element.id}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{displayRole(element.isOwner)}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table striped highlightOnHover withTableBorder withColumnBorders>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Role</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );
}

export default PlayerList;