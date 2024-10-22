import React, { useState } from "react";

const ScavengeCalculator = () => {
  const [troops, setTroops] = useState(0);
  const [results, setResults] = useState({});

  // Constants based on your formula
  const troopCapacity = 25; // 1 unit carries 25 resources
  const durationExponent = 0.45;
  const durationInitialSeconds = 1800; // 30 minutes in seconds
  const durationFactor = 0.7237692407143577;

  const lootFactors = {
    option1: 0.1,
    option2: 0.25,
    option3: 0.5,
    option4: 0.75,
  };

  const calcScavengeDuration = (capacity, lootFactor) => {
    const base = (lootFactor * capacity) ** 2 * 100;
    const duration = Math.pow(base, durationExponent) + durationInitialSeconds;
    return Math.round(duration * durationFactor);
  };

  const calculateDistribution = () => {
    const totalCapacity = troops * troopCapacity;
    let availableCapacity = totalCapacity;
    let assignedTroops = {};

    // In "Addict Mode", distribute capacity among all options
    // Calculate the inverse loot factors sum
    let inverseLootFactorSum = 0;
    let inverseLootFactors = {};
    Object.keys(lootFactors).forEach((option) => {
      inverseLootFactors[option] = 1 / lootFactors[option];
      inverseLootFactorSum += inverseLootFactors[option];
    });

    // Calculate the portion of troops for each option
    Object.keys(lootFactors).forEach((option) => {
      const portion = inverseLootFactors[option] / inverseLootFactorSum;
      const assignedCapacity = portion * totalCapacity;
      const assignedTroopCount = Math.floor(assignedCapacity / troopCapacity);
      assignedTroops[option] = assignedTroopCount;
      availableCapacity -= assignedTroopCount * troopCapacity;
    });

    setResults(assignedTroops);
  };

  return (
    <div>
      <h2>Scavenge Troop Distribution</h2>
      <div>
        <label>Number of Troops:</label>
        <input
          type="number"
          value={troops}
          onChange={(e) => setTroops(Number(e.target.value))}
        />
        <button onClick={calculateDistribution}>Calculate</button>
      </div>

      {results && (
        <div>
          <h3>Troop Distribution:</h3>
          <p>Option 1: {results.option1} troops</p>
          <p>Option 2: {results.option2} troops</p>
          <p>Option 3: {results.option3} troops</p>
          <p>Option 4: {results.option4} troops</p>
        </div>
      )}
    </div>
  );
};

export default ScavengeCalculator;