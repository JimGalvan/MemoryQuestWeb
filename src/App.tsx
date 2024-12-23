import './App.css'
import CreateGameForm from "./components/CreateGameForm.tsx";
import '@mantine/core/styles.css';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import RoomBoard from "./components/RoomBoard.tsx";

function App() {
    return (
        <>
            <h1>Memory Quest</h1>
            <div className="card">
                <Router>
                    <Routes>
                        <Route path="/" element={<CreateGameForm/>}/>
                        <Route path={"/room/:roomId"} element={<RoomBoard/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
