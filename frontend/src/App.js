import './App.css';
import CreateShortenedUrl from "./components/CreateShortenedUrl.js"

function App() {
  return (
    <div className="container">
      <h1 className="mb-5">Url Shortening Service</h1>
      <CreateShortenedUrl />
    </div>
  );
}

export default App;
