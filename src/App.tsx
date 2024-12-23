import './App.css'
import CreateGameForm from "./components/CreateGameForm.tsx";
import '@mantine/core/styles.css';

function App() {
    return (
        <>
            <h1>Memory Quest</h1>
            <div className="card">
                <CreateGameForm/>
            </div>
        </>
    )
}

export default App
