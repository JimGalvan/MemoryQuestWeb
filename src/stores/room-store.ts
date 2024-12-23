import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {Room} from "../types/Room.ts";

interface UserRoomStore {
    rooms: Room[];
    addRoom: (room: Room) => void;
    deleteRoom: (roomId: string) => void;
}

const userRoomStore = create<UserRoomStore>()(
    devtools(
        persist(
            (set) => ({
                rooms: [],
                addRoom: (room: Room) => set((state) => ({
                    rooms: [...state.rooms, room]
                })),
                deleteRoom: (roomId: string) => set((state) => ({
                    rooms: state.rooms.filter((room) => room.id !== roomId)
                }))
            })
            ,
            {
                name: 'room-storage', // unique name
            }
        )
    )
);

export default userRoomStore;