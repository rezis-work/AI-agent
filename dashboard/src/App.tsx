import { useState } from "react";
import ExperimentGraph from "./components/ExperimentGraph";
import resultsData from "../../results.json";
import "./App.css";
import type { Experiment } from "../../types";

const App = () => {
  const results = resultsData;
  const [selectedExperiment, setSelectedExperiment] = useState(
    results.experiments[0].name
  );

  const currentExperiment = results.experiments.find(
    (exp) => exp.name === selectedExperiment
  );

  const limitedExperiment = currentExperiment
    ? {
        ...currentExperiment,
        sets: currentExperiment.sets.slice(-10),
      }
    : null;

  return (
    <div className="app">
      <h1>Experiment Results Viewer</h1>

      <div className="controls">
        <label htmlFor="experiment-select">Select Experiment: </label>
        <select
          id="experiment-select"
          value={selectedExperiment}
          onChange={(e) => setSelectedExperiment(e.target.value)}
        >
          {results.experiments.map((exp) => (
            <option key={exp.name} value={exp.name}>
              {exp.name}
            </option>
          ))}
        </select>
      </div>

      {limitedExperiment && (
        <ExperimentGraph
          experiment={limitedExperiment as unknown as Experiment}
        />
      )}
    </div>
  );
};

export default App;
