import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';
import {Player} from "../types/Room.ts";

interface PlayerStore {
    player: Player | null;
    setPlayer: (player: Player) => void;
}

const userPlayerStore = create<PlayerStore>()(
    devtools(
        persist(
            (set) => ({
                player: null,
                setPlayer: (player: Player) => set(() => ({
                    player: player
                })),
            })
            ,
            {
                name: 'player-storage', // unique name
            }
        )
    )
);

export default userPlayerStore;