//https://tranzystorek-io.github.io/paste/#XQAAAQDpDAAAAAAAAAA9iImGVD/UQZfk+oJTfwg2/VsJ0DpNkr2zGUvTQlsh3wS86ErCiIs+8hruVNP959haYO3PyEx/fKf11+lj2uPBdBP0I7u4UdmpmmgqvG6pdZvvT6YkslZQId+jSK+wPh82OLGw9ci8TL/+wtOdBVbrg0a1cN8tkmqlHoc9La1C18KAZ8L0frKQrms/rPMA0vbC0lrc5dEzSU1RtC3kK5szYYJYHFokXcpMyvh6FjEJOJFZGZ7uKkVlYJZ6YRpMCWhs7fPLrYEeMfZ6cm2PzS5uYZK6FO4vaQYs8KGKkWyUxHEoVBAeYlKJfmZGZ70wc5fC//4qF7sehik+m5m44Aomn5e57M6I6C5kQL3yq9yf8NIMtfaF9GHKAGzAmSw8yZLjyXb6S+0v7F04ILQgO0BegVOc8mT3MInkgeP41WskfvW4j6mjJViySJtLezX4Fj6VG14Z4TApzzDxozBCHdeNIy4fe9VyYowpH9axvXWqyLJR89CWgSvAGJ0nmHbtXzo7CVuXdAxxIzp6ZouDffH2UlxF4p4n5ws5h1f/zCSoEB/Xss2fnbZMcSrQK1r4xfxQaLfHn0woqFibXsqbOMkoJI964js/v6I1mnddH0aDBgcHe+fCBEKJTn37+9LcPZw5FX9PsmaBe7TZc8qVHG+Yo/LQZHBmEzXY7vWVi23IEtOPgJcalZklFccboKOfqbWj1y6pO28McA9/lVe314nKsdfoADrr4dvhIS2DYDUhoQsi4E5YSNaaEWhZ5PoLiR7heQDUqWgKrFmyIImzV7OH4xnsXYmfJGwshHwlsmLqXtfgabdqB6UDDZkX9nPEJ2rPkxywOr7HvZ0mP//pItKd5UxuHMJSf5+P/0LAknCS5WlNoyiJgnvKJO9rT7tzIwvhnS6+SDoHGuNLNFBquTB5OmeaZXlcmHo/RWCRU1/Y0aR0vzE+FPKipT0NMDsXySPE24jTKpYs0QSypJV9lYk39vIz/QyiOxS1FCxzHmzvehkWAAkbkqkSl8vnQfMh9eTEC6JZcgWxuWIU0sM1eXsOSKglbkswC/H3lm8VaNN9b7X3/GFungzPmAjQAQodVPT3s5B5wpW0M/3ANqNuu3TfCzf/HOwJdA3UEvvmx0eT9Gz0L9pNyvjCHbyRJ2+Heptfy3YtfwwcNTbIq41wouZY5cbh2NSfTPKeL5nSzV1akBq1e03Ehhg5cTFP4MQYFu5RFZ4cKhEabhmyrbLD8X41uM18qJ97xorrK7eHW8RkyJ2eg/dd2QAvFKNvnjt2+/KDnEiL5b+JliSKo/gYvN7Ztbo7PsKUzcYp9Vj1AlIJO76cvwa5R57z4AVr9XicuQGFIv+95Ls0VrmYpsVYYj8kA3fxtlJQveRdgDqOiduOV5BsgPrGEEffZ7nIZoVaFVfwvoVGv49znNy8YwceCfgLEPggvoM/yaw3b5p5zoIYp4ZpCBzOHrvQyiDngqYln4AnKFcDJBsmFdQlv1aUZZIUG1jyTBj6P+Kj13UT98H/Wr+cd4mhzyU8GXDAEexk94NO03rc4Ja55rODybEYdR5JbUVuqtyT7wc4zfXXe+9hh71EAYDw6aOUwyid/vH6y7n3mVklTw2zpi6O9f8pk+fNlayHMGELx/4PGIQ=
const fs = require("fs");

async function processInput() {
  let input = fs.readFileSync("input.txt", { encoding: "utf-8" }).split("\n");
  return input.map((line) => line.split(""));
}

class MapOfElevations {
  constructor(startingPosition, endingPosition, width, height) {
    this.startingPosition = startingPosition;
    this.endingPosition = endingPosition;
    this.currentPosition = startingPosition;
    this.dimensions = {
      width: width,
      height: height,
    };
  }

  findAdjacentTiles(x, y, input) {
    return [
      { x: x, y: y - 1 },
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y + 1 },
    ].filter((coord) => {
      if (typeof input[coord.y] !== "undefined") {
        return typeof input[coord.y][coord.x] !== "undefined";
      }
    });
  }

  toId = (x, y) => `${x},${y}`;

  buildFrontier(from_x, from_y, input) {
    const frontier = [];
    frontier.push({ x: from_x, y: from_y });

    const came_from = new Map();
    came_from.set(this.toId(from_x, from_y), null);
    while (frontier.length > 0) {
      const current = frontier.shift();
      const current_val = input[current.y][current.x];

      let neighbors = this.findAdjacentTiles(current.x, current.y, input);
      for (let next of neighbors) {
        const next_cell = input[next.y][next.x];
        const next_id = this.toId(next.x, next.y);

        if (next_cell - current_val > 1 || came_from.has(next_id)) {
          continue;
        }

        // Coord is walkable
        const current_id = this.toId(current.x, current.y);
        frontier.push(next);
        came_from.set(next_id, current_id);
      }
    }
    return came_from;
  }

  findShortestPath(input, startingInput) {
    const start = startingInput ? startingInput : this.startingPosition;
    const from_id = this.toId(start.x, start.y);
    const to_id = this.toId(this.endingPosition.x, this.endingPosition.y);
    const came_from = this.buildFrontier(start.x, start.y, input);
    let current = to_id;

    let path = [];
    while (current !== undefined && current !== from_id) {
      path.push(current);
      current = came_from.get(current);
    }

    // An undefined `current` means it wasn't possible to have a path `from` -> `to`, return an empty path
    if (current === undefined) {
      return [];
    }

    // Finally, put `from` first, and `to` last
    path.reverse();

    // Note our path won't include the `from` position
    return path;
  }
}

async function main() {
  let input = await processInput();
  let indexOfStart = {};
  let indexOfEnd = {};
  let starts = [];
  input.forEach((row, y) => {
    row.forEach((letter, x) => {
      if (letter === "S") {
        indexOfStart = { x: x, y: y };
        //change 'S' to elevation 'a'
        input[y][x] = "a";
      } else if (letter === "E") {
        indexOfEnd = { x: x, y: y };
        //change 'S' to elevation 'z', highest elevation
        input[y][x] = "z";
      }
      if (input[y][x] === "a") {
        starts.push({ x, y });
      }
      input[y][x] = input[y][x].charCodeAt(0);
    });
  });

  let map = new MapOfElevations(
    indexOfStart,
    indexOfEnd,
    input[0].length,
    input.length
  );
  let path = map.findShortestPath(input);
  console.log("Part one:", path.length);
  let min_path_length = Number.MAX_VALUE;
  for (let start of starts) {
    const path = map.findShortestPath(input, start);
    if (path.length) {
      min_path_length = Math.min(min_path_length, path.length);
    }
  }

  console.log("Part two:", min_path_length);
}

main();
