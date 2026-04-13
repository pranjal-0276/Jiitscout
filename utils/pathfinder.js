// utils/pathfinder.js

const graph = require('data\campusGraph.js');

/**
 * BFS — returns shortest path as array of location names
 */
function findPath(start, goal) {
  if (!graph[start] || !graph[goal]) return null;
  if (start === goal) return [start];

  const visited = new Set();
  const queue = [[start, [start]]];

  while (queue.length > 0) {
    const [current, path] = queue.shift();
    if (current === goal) return path;
    if (visited.has(current)) continue;
    visited.add(current);

    for (const { node } of graph[current].neighbors) {
      if (!visited.has(node)) {
        queue.push([node, [...path, node]]);
      }
    }
  }
  return null;
}

/**
 * Returns full step-by-step navigation data for EJS
 */
function getNavigationSteps(start, goal) {
  const path = findPath(start, goal);
  if (!path) return null;

  return path.map((locationName, index) => {
    const location = graph[locationName];
    const isLast = index === path.length - 1;
    let direction = null;

    if (!isLast) {
      const nextNode = path[index + 1];
      const edge = location.neighbors.find(n => n.node === nextNode);
      direction = edge ? edge.direction : 'Continue forward';
    }

    return {
      step: index + 1,
      location: locationName,
      photo: location.photo,
      direction,
      isLast
    };
  });
}

module.exports = { findPath, getNavigationSteps };