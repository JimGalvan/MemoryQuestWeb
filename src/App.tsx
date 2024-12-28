import './App.css'
import CreateGameForm from "./components/CreateGameForm.tsx";
import '@mantine/core/styles.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import RoomBoard from "./components/RoomBoard.tsx";
import JoinRoomForm from "./components/JoinRoomForm.tsx";
import PhaserGame from "./components/PhaserGame.tsx";

function App() {
    return (
        <>
            <h1>Memory Quest</h1>
            <div className="card">
                <Router>
                    <Routes>
                        <Route path="/" element={<CreateGameForm/>}/>
                        <Route path={"/room/:roomId"} element={<RoomBoard/>}/>
                        <Route path={"/join-room"} element={<JoinRoomForm/>}/>
                        <Route path={"/room/:roomId/game"} element={<PhaserGame/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
