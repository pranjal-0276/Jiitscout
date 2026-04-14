// data/campusGraph.js
// Add your campus photos to: public/images/nav/
// Photo naming matches the key below (lowercase, hyphens)

const graph = {
  "OAT": {
    photo: "/images/nav/OAT.jpeg",
    neighbors: [
      { node: "ABB 1",    direction: "Walk straight towards right", distance: 30 },
      { node: "cafeteria",   direction: "walk straight to left",        distance: 30  }
    ]
  },
  "cafeteria": {
    photo: "/images/nav/abb1-court.jpeg",
    neighbors: [
      { node: "OAT",    direction: "take left than walk straight",          distance: 30},
      { node: "ABB 1", direction: " take a left then walk straight past the ground ", distance: 40},
    ]
  },
  "ABB 1": {
    photo: "/images/nav/ABB1.jpeg",
    neighbors: [
      { node: "cafeteria",      direction: "Walk straight past the ground",         distance: 40},
      { node: "OAT",        direction: "walk straight on the road along ABB1 , then take left",        distance: 30}
    ]
  },/*
  "Library": {
    photo: "/images/nav/library.jpg",
    neighbors: [
      { node: "Admin Block",    direction: "Turn around, walk back along the main road",  distance: 180 },
      { node: "Canteen",        direction: "Turn right at the library exit",              distance: 130 },
      { node: "Block B",        direction: "Cross the road, Block B is directly ahead",   distance: 100 }
    ]
  },
  "Block A": {
    photo: "/images/nav/block-a.jpg",
    neighbors: [
      { node: "Admin Block",    direction: "Turn right and head to Admin Block",          distance: 200 },
      { node: "Block B",        direction: "Walk straight, Block B is next",              distance: 90  },
      { node: "Ground",         direction: "Turn left towards the sports ground",         distance: 150 }
    ]
  },
  "Block B": {
    photo: "/images/nav/block-b.jpg",
    neighbors: [
      { node: "Block A",        direction: "Walk back towards Block A",                   distance: 90  },
      { node: "Library",        direction: "Cross the road, Library is on the left",      distance: 100 },
      { node: "Block C",        direction: "Continue straight past Block B",              distance: 85  },
      { node: "Canteen",        direction: "Turn right at the corner after Block B",      distance: 70  }
    ]
  },
  "Block C": {
    photo: "/images/nav/block-c.jpg",
    neighbors: [
      { node: "Block B",        direction: "Walk back towards Block B",                   distance: 85  },
      { node: "Canteen",        direction: "Turn left, Canteen is at the end",            distance: 80  },
      { node: "Workshop",       direction: "Continue straight to the Workshop area",      distance: 110 }
    ]
  },
  "Canteen": {
    photo: "/images/nav/canteen.jpg",
    neighbors: [
      { node: "Library",        direction: "Turn left out of Canteen, Library is ahead",  distance: 130 },
      { node: "Block B",        direction: "Turn right, then take the first left",        distance: 70  },
      { node: "Block C",        direction: "Walk straight out of Canteen",                distance: 80  }
    ]
  },
  "Ground": {
    photo: "/images/nav/ground.jpg",
    neighbors: [
      { node: "Block A",        direction: "Exit the ground, Block A is on the right",   distance: 150 },
      { node: "Gym",            direction: "Walk along the ground boundary to the Gym",  distance: 100 }
    ]
  },
  "Gym": {
    photo: "/images/nav/gym.jpg",
    neighbors: [
      { node: "Ground",         direction: "The sports ground is adjacent to the Gym",   distance: 100 },
      { node: "Block A",        direction: "Exit Gym, turn right to Block A",            distance: 200 }
    ]
  },
  "Workshop": {
    photo: "/images/nav/workshop.jpg",
    neighbors: [
      { node: "Block C",        direction: "Walk back towards Block C",                   distance: 110 },
      { node: "Block A",        direction: "Take the internal road to Block A",           distance: 180 }
    ]
  },
  "ATM": {
    photo: "/images/nav/atm.jpg",
    neighbors: [
      { node: "Admin Block",    direction: "ATM is near Admin Block, walk back",          distance: 50  },
      { node: "Library",        direction: "Walk toward Library from the ATM",            distance: 140 }
    ]
  }*/
};

module.exports = graph;