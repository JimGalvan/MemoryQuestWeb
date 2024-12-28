import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {Room} from "../types/Room.ts";

interface UserRoomStore {
    rooms: Room[];
    room: Room | null;
    addRoom: (room: Room) => void;
    deleteRoom: (roomId: string) => void;
    setRoom: (room: Room) => void;
}

const userRoomStore = create<UserRoomStore>()(
    devtools(
        persist(
            (set) => ({
                rooms: [],
                room: null,
                addRoom: (room: Room) => set((state) => ({
                    rooms: [...state.rooms, room]
                })),
                deleteRoom: (roomId: string) => set((state) => ({
                    rooms: state.rooms.filter((room) => room.id !== roomId)
                })),
                setRoom: (room: Room) => set(() => ({
                    room: room
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