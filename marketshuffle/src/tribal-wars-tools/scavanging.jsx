import React, { useState } from "react";

const ScavengeCalculator = () => {
  const [troops, setTroops] = useState(0);
  const [percentages, setPercentages] = useState({
    option1: 0,
    option2: 0,
    option3: 0,
    option4: 0,
  });
  const [results, setResults] = useState({
    scenario1: { assignedTroops: {}, totalResources: 0 },
    scenario2: { assignedTroops: {}, totalResources: 0 },
    scenario3: { assignedTroops: {}, totalResources: 0 },
  });

  // Constants
  const troopCapacity = 25; // Each troop carries 25 resources
  const durationExponent = 0.45;
  const durationInitialSeconds = 1800; // 30 minutes in seconds
  const durationFactor = 0.7237692407143577;
  const SECONDS_IN_DAY = 86400; // 24 hours in seconds

  const lootFactors = {
    option1: 0.1,
    option2: 0.25,
    option3: 0.5,
    option4: 0.75,
  };

  // Formula to calculate scavenging duration
  const calcScavengeDuration = (capacity, lootFactor) => {
    const base = (lootFactor * capacity) ** 2 * 100;
    const duration = Math.pow(base, durationExponent) + durationInitialSeconds;
    return Math.round(duration * durationFactor);
  };

  // Formula to calculate resource yield per run
  const calcResourceYieldPerRun = (troopCount, lootFactor) => {
    const totalCapacity = troopCount * troopCapacity;
    return totalCapacity * lootFactor; // Multiply carrying capacity by the loot factor
  };

  // Calculate total resources for a given troop distribution
  const calcTotalResources = (troopDistribution) => {
    return Object.keys(troopDistribution).reduce((total, option) => {
      const assignedCount = troopDistribution[option];
      const resourcesPerRun = calcResourceYieldPerRun(assignedCount, lootFactors[option]);
      const scavengingDuration = calcScavengeDuration(assignedCount * troopCapacity, lootFactors[option]);
      const runsPerDay = Math.floor(SECONDS_IN_DAY / scavengingDuration);
      return total + (resourcesPerRun * runsPerDay);
    }, 0);
  };

  // Distribute troops based on user-defined percentages
  const calculateDistribution = () => {
    const totalTroops = parseInt(troops, 10);
    const assignedTroops = {
      option1: Math.floor(totalTroops * (percentages.option1 / 100)),
      option2: Math.floor(totalTroops * (percentages.option2 / 100)),
      option3: Math.floor(totalTroops * (percentages.option3 / 100)),
      option4: Math.floor(totalTroops * (percentages.option4 / 100)),
    };

    // Calculate total resources for each scenario
    const scenario1Total = calcTotalResources({
      option1: assignedTroops.option1,
      option2: assignedTroops.option2,
    });

    const scenario2Total = calcTotalResources({
      option1: assignedTroops.option1,
      option2: assignedTroops.option2,
      option3: assignedTroops.option3,
    });

    const scenario3Total = calcTotalResources({
      option1: assignedTroops.option1,
      option2: assignedTroops.option2,
      option3: assignedTroops.option3,
      option4: assignedTroops.option4,
    });

    setResults({
      scenario1: { assignedTroops: { option1: assignedTroops.option1, option2: assignedTroops.option2 }, totalResources: scenario1Total },
      scenario2: { assignedTroops: { option1: assignedTroops.option1, option2: assignedTroops.option2, option3: assignedTroops.option3 }, totalResources: scenario2Total },
      scenario3: { assignedTroops: { option1: assignedTroops.option1, option2: assignedTroops.option2, option3: assignedTroops.option3, option4: assignedTroops.option4 }, totalResources: scenario3Total },
    });
  };

  return (
    <div>
      <h2>Scavenge Troop Distribution & Resource Yields</h2>
      <div>
        <label>Number of Troops:</label>
        <input
          type="number"
          value={troops}
          onChange={(e) => setTroops(Number(e.target.value))}
        />
      </div>

      <div>
        <h3>Enter Percentages for Each Option:</h3>
        <label>Option 1 (%):</label>
        <input
          type="number"
          value={percentages.option1}
          onChange={(e) => setPercentages({ ...percentages, option1: Number(e.target.value) })}
        />
        <br />
        <label>Option 2 (%):</label>
        <input
          type="number"
          value={percentages.option2}
          onChange={(e) => setPercentages({ ...percentages, option2: Number(e.target.value) })}
        />
        <br />
        <label>Option 3 (%):</label>
        <input
          type="number"
          value={percentages.option3}
          onChange={(e) => setPercentages({ ...percentages, option3: Number(e.target.value) })}
        />
        <br />
        <label>Option 4 (%):</label>
        <input
          type="number"
          value={percentages.option4}
          onChange={(e) => setPercentages({ ...percentages, option4: Number(e.target.value) })}
        />
        <br />
      </div>

      <button onClick={calculateDistribution}>Calculate</button>

      {/* Display results for Scenario 1 */}
      {results.scenario1 && (
        <div>
          <h3>Scenario 1: Options 1 and 2 Available</h3>
          {Object.keys(results.scenario1.assignedTroops).map((option) => (
            <div key={option}>
              <p>{option}: {results.scenario1.assignedTroops[option]} troops</p>
            </div>
          ))}
          <p>Total Resources per Day: {results.scenario1.totalResources} resources</p>
        </div>
      )}

      {/* Display results for Scenario 2 */}
      {results.scenario2 && (
        <div>
          <h3>Scenario 2: Options 1, 2, and 3 Available</h3>
          {Object.keys(results.scenario2.assignedTroops).map((option) => (
            <div key={option}>
              <p>{option}: {results.scenario2.assignedTroops[option]} troops</p>
            </div>
          ))}
          <p>Total Resources per Day: {results.scenario2.totalResources} resources</p>
        </div>
      )}

      {/* Display results for Scenario 3 */}
      {results.scenario3 && (
        <div>
          <h3>Scenario 3: All 4 Options Available</h3>
          {Object.keys(results.scenario3.assignedTroops).map((option) => (
            <div key={option}>
              <p>{option}: {results.scenario3.assignedTroops[option]} troops</p>
            </div>
          ))}
          <p>Total Resources per Day: {results.scenario3.totalResources} resources</p>
        </div>
      )}
    </div>
  );
};

export default ScavengeCalculator;
