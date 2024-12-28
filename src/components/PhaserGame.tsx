import {useRef, useEffect} from 'react';
import {initGame} from '../memory_game.ts';

const PhaserGame = () => {
    const gameContainerRef = useRef(null);
    let gameInstance: Phaser.Game | null = null;

    useEffect(() => {
        const containerId = 'phaser-container';
        gameContainerRef.current.id = containerId;

        // Initialize the Phaser game
        gameInstance = initGame(containerId);

        // Cleanup the Phaser instance on component unmount
        return () => {
            if (gameInstance) {
                gameInstance.destroy(true); // Clean up the game instance
            }
        };
    }, []);

    return <div ref={gameContainerRef} style={{width: '800px', height: '600px'}}/>;
};

export default PhaserGame;
