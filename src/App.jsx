import './App.css';
import Form from "./components/Form"
import Submission from "./components/Submission"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Main from './components/Main';
import {useState} from 'react';

/**
 * Top-level routes for the openEHR form builder.
 *
 * Shared state:
 * - archetype: parsed archetype tree passed into Form / Submission
 * - archetypeLoaded: whether Main has finished loading archetype JSON
 *
 * Routes:
 * - /                                      pick / load archetypes (Main)
 * - /archetype/:rmType/:archetypeId        fill the clinical form (Form)
 * - /archetype/:rmType/:archetypeId/submission   review & submit (Submission)
 *
 * React UI ownership: form rendering and SNOMED binding live here.
 * Express + Mongo persistence for submissions lives under backend/ (teammate).
 */
function App() {
  const [archetype, setArchetype] = useState([]);
  const [archetypeLoaded, setArchetypeLoaded] = useState(false);
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Main key = "FileUploadPage"  archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route path="/archetype/:rmType/:archetypeId" element={<Form key = "Archetype" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
        <Route path="/archetype/:rmType/:archetypeId/submission" element={<Submission key = "Submission" archetypeLoaded = {archetypeLoaded} setArchetypeLoaded = {setArchetypeLoaded} archetype={archetype} setArchetype = {setArchetype}/>}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
