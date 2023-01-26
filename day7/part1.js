//referencing https://tranzystorek-io.github.io/paste/#XQAAAQBmCwAAAAAAAAA9iImGVD/UQZfk+oJTfwg2/VsJ0DpNkr2zGUvTQlsh3wS86ErCiIs+8hruVNIFt25kOOZrzOGZxbRwHmJ5wrAVdOuA2kk0mNS0CwkIEqOmO95EhbRoIUTonrtGzVALDhyFMRO24/2oA0Lt4k+Q2E/wp4YaHUgbXZtC5amaE5MmewTUwYV3d2c08XNXkJSlcNdZoC0u7tg9I5cHTYnRCNkw16pdQG7bz+b3ol2mcVXHmvm807SGCZSEA0KKsNcTQy9EzbG5w7H20JhMNO0ZcIzB4ULHU7BRUkDtnHmAlH9rYhgJjZX64Fs1Nm/E9AYidmZiH0juoUt+H6XQJGRVa3SOF80/3Zyymu3+2I9stkVNep+Qn5CwaPyJvWDKBIULhddg/FMdJVrd8TomGR6LbwGlXrXKC7p3LWyJJdX/Z+BexinkKf5d/eN8K6A6l8L1hgnNZPgTwNVEWbJfcj+UdO3o0TOZuhDf+nP83kD/XrQvStifkvUin/vgAWHFdk1IqzVo8/55yF1aeEDllzhqHVySF0dlWFvZZupQKIeJnKslnm+Qb8YqIdGjBfUeT64v6b5jNpdR0csQZy6vmp3GTlywfkBFJyJa27jqyo4PugskQbL4Vx54YVQVq6pW1NwDz0EbAdCdAfq9y3MpWfEiZnJA/ec73W0VmV3k2HIevcFAyAs5oQnu4bDfRR7pSpuWIryv3+i1ymPe3kevP1G5sAewdc+MZo/92PtcuvbTuZYkOwk7bmWICTusYZAS/nJMIkzYwJEMhmiVd6IYlq52n2IUQtv/Hf1IqLjnrijJNd8AVeVvAjf5BzL/0SOjRKd6EUIbYSf2x+JkD1Cdi/RtqQXarmEjNRg9sSb6KwuAX6csnozNE+gRJGMLsxWfGBdHyE2jxov92Tg5bO2ujB7QNW/KrUaAnzcTLqYSwhwlVJ8xfrJLfOgbpauXJ05CagBTteXTSGaO3qZHPQfa7s4k+tboPSvNJrmVK5OdGWP3AmDQ+t5Sk2ehbIScUl4qhSiv5zmXky21/vMLOvZet3/X7fcT3axEW2kL9hXC4SJoLfnus66pr05ecY2eCOTfaOZMJT39786+wXHqhZoiR+ReF/1iHLPssr91fDIjB8DZDx9cJXiAvurtnxK4liQRZ2HUwwSU1FPppbk45QWTBYC9oUbJRJ8THzhEhO0YmWJPI0f8qprNMZHCQLjDOmEFfEoyn23Yr58F1FTvbRPwa1IkntyKd6czPkkUYnmRwitwyFFwXDZj/ZkMZm5AbTFErvyYVE+XICTuZZArrQAyP4M62AAk8tOWvJdTMSkKgvH+1/15Y43BYqRtCZIiPcn5OvQgRMynEtzTdiM6xfpK/OQgojPMzUW54C5gxfSUGdBNnZraz0/C5pXctID4GhC1BGnsbPY77OKA/68QoKU=
const path = require('path');
const fs = require('fs');

const input = fs
	.readFileSync(path.join(__dirname, 'input.txt'), 'utf8')
	.toString()
	.trim()
	.split('\n');

class File {
	constructor(name, size) {
		this.name = name;
		this._size = size;
	}

	size() {
		return this._size;
	}
}

class Dir {
	constructor(name, parentDir) {
		this.isDir = true;
		this.parentDir = parentDir;
		this.name = name;
		this.contents = [];
	}

	// This should be cached, but our input is small enough that its OK to always recompute
	size(ignore) {
		if (ignore === this) {
			return 0;
		}

		return this.contents.map((v) => v.size(ignore)).reduce((a, b) => a + b, 0);
	}
}

class Filesystem {
	constructor(instructions) {
		this.rootDir = new Dir('/', null);
		this.build(instructions);
	}

	size(ignore) {
		return this.rootDir.size(ignore);
	}

	build(instructions) {
		let currentDir = this.rootDir;
		for (let line of instructions) {
			if (line.startsWith('$ cd')) {
				const [, dir] = /\$ cd (.+)$/.exec(line);
				if (dir === '/') {
					currentDir = this.rootDir;
				} else if (dir === '..') {
					currentDir = currentDir.parentDir;
				} else {
					currentDir = currentDir.contents.find((v) => v.isDir && v.name === dir);
				}
			} else if (line.startsWith('$ ls')) {
				continue;
			} else {
				// In a `ls` output
				if (line.startsWith('dir ')) {
					const [, dirName] = /dir (.+)$/.exec(line);
					const newDir = new Dir(dirName, currentDir);
					currentDir.contents.push(newDir);
				} else {
					// file
					let [, size, fileName] = /(\d+) (.+)$/.exec(line);
					size = parseInt(size, 10);

					const newFile = new File(fileName, size);
					currentDir.contents.push(newFile);
				}
			}
		}
	}

	static *walk(dir) {
		for (let c of dir.contents) {
			yield c;
			if (c.isDir) {
				yield* Filesystem.walk(c);
			}
		}
	}

	*[Symbol.iterator]() {
		yield* Filesystem.walk(this.rootDir);
	}
}

const drive = new Filesystem(input);
const dirs = [...drive].filter((v) => v.isDir);

// Part one
let smallDirsSum = 0;
for (let item of dirs) {
	let size = item.size();
	if (size <= 100000) {
		smallDirsSum += size;
	}
}

// Part two
let couldWork = new File('dummy', Number.MAX_VALUE);
const DRIVE_SIZE = 70000000;
for (let someDir of dirs) {
	const sizeWithoutSomeDir = drive.size(someDir);
	const unusedSpace = DRIVE_SIZE - sizeWithoutSomeDir;
	if (unusedSpace >= 30000000) {
		if (someDir.size() < couldWork.size()) {
			couldWork = someDir;
		}
	}
}

console.log('Part One:', smallDirsSum);
console.log('Part Two:', couldWork.size());