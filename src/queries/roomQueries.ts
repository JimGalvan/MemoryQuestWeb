import axiosInstance from "../services/axiosInstance.ts";
import {Room} from "../dtos/Room.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {CreateRoomDto} from "../dtos/CreateRoomDto.ts";


const createRoom = async (request: CreateRoomDto): Promise<Room> => {
    const response = await axiosInstance.post('/room/', request);
    return response.data;
}

export const useCreateRoomMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<Room, Error, CreateRoomDto>({
        mutationFn: createRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['rooms']}).then(r => console.log(r));
        }
    });
};