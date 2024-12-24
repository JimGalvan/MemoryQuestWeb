import axiosInstance from "../services/axiosInstance.ts";
import {Room} from "../types/Room.ts";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {EnterRoomDto} from "../dtos/EnterRoomDto.ts";
import userRoomStore from "../stores/room-store.ts";

const createRoom = async (request: EnterRoomDto): Promise<Room> => {
    const response = await axiosInstance.post('/room/', request);
    return response.data;
}

export const useCreateRoomMutation = () => {
    const queryClient = useQueryClient();
    const addRoom = userRoomStore((state) => state.addRoom);

    return useMutation<Room, Error, EnterRoomDto>({
        mutationFn: createRoom,
        onSuccess: (data) => {
            addRoom(data);
            queryClient.invalidateQueries({queryKey: ['rooms']}).then(resp => {
                console.log(resp);
            });
        }
    });
};

const getRoom = async (roomId: string | undefined): Promise<Room> => {
    const response = await axiosInstance.get(`/room/${roomId}`);
    return response.data;
}

export const useGetRoomQuery = (roomId: string | undefined) => {
    return useQuery<Room, Error>({queryKey: ['room', roomId], queryFn: () => getRoom(roomId)});
}

// const joinRoom = async (roomId: string): Promise<Room> => {
//     const response = await axiosInstance.post(`/room/${roomId}/join`);
//     return response.data;
// }