import React, { useState } from "react";

const ScavengeCalculator = () => {
  const [troops, setTroops] = useState(0);
  const [results, setResults] = useState({ scenario1: {}, scenario2: {}, scenario3: {} });

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

    // Scenario 1: Only options 1 and 2 available
    const scenario1Result = distributeTroops([lootFactors.option1, lootFactors.option2], totalCapacity);

    // Scenario 2: Options 1, 2, and 3 available
    const scenario2Result = distributeTroops(
      [lootFactors.option1, lootFactors.option2, lootFactors.option3],
      totalCapacity
    );

    // Scenario 3: All 4 options available
    const scenario3Result = distributeTroops(
      [lootFactors.option1, lootFactors.option2, lootFactors.option3, lootFactors.option4],
      totalCapacity
    );

    setResults({
      scenario1: scenario1Result,
      scenario2: scenario2Result,
      scenario3: scenario3Result,
    });
  };

  const distributeTroops = (availableLootFactors, totalCapacity) => {
    let availableCapacity = totalCapacity;
    let assignedTroops = {};

    // Calculate the inverse loot factors sum
    let inverseLootFactorSum = 0;
    let inverseLootFactors = [];
    availableLootFactors.forEach((lootFactor, index) => {
      const inverseLootFactor = 1 / lootFactor;
      inverseLootFactors.push(inverseLootFactor);
      inverseLootFactorSum += inverseLootFactor;
    });

    // Calculate the portion of troops for each option
    availableLootFactors.forEach((lootFactor, index) => {
      const portion = inverseLootFactors[index] / inverseLootFactorSum;
      const assignedCapacity = portion * totalCapacity;
      const assignedTroopCount = Math.floor(assignedCapacity / troopCapacity);
      assignedTroops[`option${index + 1}`] = assignedTroopCount;
      availableCapacity -= assignedTroopCount * troopCapacity;
    });

    return assignedTroops;
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

      {results.scenario1 && (
        <div>
          <h3>Scenario 1: Options 1 and 2 Available</h3>
          <p>Option 1: {results.scenario1.option1 || 0} troops</p>
          <p>Option 2: {results.scenario1.option2 || 0} troops</p>
        </div>
      )}

      {results.scenario2 && (
        <div>
          <h3>Scenario 2: Options 1, 2, and 3 Available</h3>
          <p>Option 1: {results.scenario2.option1 || 0} troops</p>
          <p>Option 2: {results.scenario2.option2 || 0} troops</p>
          <p>Option 3: {results.scenario2.option3 || 0} troops</p>
        </div>
      )}

      {results.scenario3 && (
        <div>
          <h3>Scenario 3: All 4 Options Available</h3>
          <p>Option 1: {results.scenario3.option1 || 0} troops</p>
          <p>Option 2: {results.scenario3.option2 || 0} troops</p>
          <p>Option 3: {results.scenario3.option3 || 0} troops</p>
          <p>Option 4: {results.scenario3.option4 || 0} troops</p>
        </div>
      )}
    </div>
  );
};

export default ScavengeCalculator;
