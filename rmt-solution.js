const VISITED = '*';
const DESK = '-';
const WALL = 'x';
const DESTINATION = 'C';


class Node {
  constructor(name, children) {
    this.children = children; // this is an array
    this.name = name;
  }
}


function createmap(map, numRows, numColums) {
  for (let i = 0; i < numRows; i++) {
    map.push([]);
  }

  return map;
}


function assignRoom(map, coffeeLocation, deskLocation, walls) {

  for (let k = 0; k < walls.length; k++) {
    map[walls[k][0]][walls[k][1]] = WALL;
  }
  
  for (let j = 0; j < deskLocation.length; j++) {
    map[deskLocation[j][0]][deskLocation[j][1]] = DESK;
  }
  
    
  for (let i = 0; i < coffeeLocation.length; i++) {
    map[coffeeLocation[i][0]][coffeeLocation[i][1]] = DESTINATION;
  }
  
  console.log('map:');
  console.log();
  console.log(map);
  console.log();
  console.log('----');
  console.log();
  return map;
}


function createGraph(graph, map, deskLocation) {
  const height = map.length;
  const width = map[0].length;

  for (let i = 0; i < deskLocation.length; i++) {
    let x = deskLocation[i][0];
    let y = deskLocation[i][1];
    let children = [];
    
    if (x !== undefined && y > 0) { 
      if (map[x][y - 1] !== WALL && map[x][y - 1] !== `${x},${y}`) {
        let down = y - 1;

        children.push(`(${x}, ${down})`);
      }
    }
  
    if (map[x + 1 ] !== undefined && x < width - 1) {
      if ( map[x + 1][y] !== WALL && map[x + 1][y] !== `${x},${y}`) {
        let right = x + 1;

        children.push(`(${right}, ${y})`);
      }
    }
    
    if (x !== undefined && y < height - 1) {
      if (map[x][y + 1] !== WALL && map[x][y + 1] !== `${x},${y}`) {
        let up = y + 1; 

        children.push(`(${x}, ${up})`);
      }
    }
      
    if (x > 0) {
      if (map[x - 1][y] !== WALL && map[x - 1][y] !== `${x},${y}`) {
        let left = x - 1;

        children.push(`(${left}, ${y})`);
      }
    }

    const node = new Node(deskLocation[i], children);
    graph[`(${deskLocation[i]})`] = node;
  }
  
  console.log('graph:');
  console.log();
  return graph;
}


function bfs(DESTINATION, graph, start) {
  console.log(graph);
  let q = [];
  let curNode = [];
  let startNode = `(${start[0]},${start[1]})`;
  let node; 
  let path;
  curNode.push(graph[startNode].children);
  curNode.push(startNode);
  q.push(curNode);
 
 
}


// Main Fn
function distanceToCoffee(numRows, numColums, deskLocation, coffeeLocation, walls, start) {
  let map = [];
  let graph = {};

  createmap(map, numRows, numColums);
  assignRoom(map, coffeeLocation, deskLocation, walls);
  graph = createGraph(graph, map, deskLocation);
  bfs(coffeeLocation[0], graph, start);
}

const numRows = 3; 
const numColums = 4; 
const deskLocation =  [ [0, 0], [0, 1], [1, 1], [1, 3], [0, 2], [0, 3], [2, 2], [0, 0]];
const coffeeLocation = [ [2, 3]];
const start = [0, 0];
const walls =  [
  [0, 0],  [0, 1], [0, 2], [0, 3],
  [1, 0],  [1, 1], [1, 2], [1, 3],
  [2, 0],  [2, 1], [2, 2], [2, 3]
];


distanceToCoffee(numRows, numColums, deskLocation, coffeeLocation, walls, start);