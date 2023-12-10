const fs = require('fs');
let lines;

// ---PART 1---

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;

  lines = data.toString().split('\n');
  let count = 0;
  lines.forEach((line) => {
    let nums = line.match(/[0-9]/g);

    if (nums != null) {
      if (nums.length >= 2) {
        const last = nums.length - 1;
        nums = [nums[0] + nums[last]];
      } else {
        nums = [nums[0] + nums[0]];
      }

      count += Number(nums);
    }
  });

  return count;
});

// ---PART 2---
const wordToNum = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

fs.readFile('./input.txt', (err, data) => {
  if (err) throw err;

  lines = data.toString().split('\n');
  let nums;
  let res = [];

  lines.forEach((line, index) => {
    nums = [
      ...line.matchAll(
        /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g
      ),
    ];

    if (nums != null) {
      if (nums.length >= 2) {
        let first = nums[0][1];
        let last = nums[nums.length - 1][1];

        if (Object.keys(wordToNum).includes(first)) {
          first = wordToNum[first];
        }

        if (Object.keys(wordToNum).includes(last)) {
          last = wordToNum[last];
        }

        const firstlast = first + last;
        res.push(Number(firstlast));
      } else {
        if (Object.keys(wordToNum).includes(nums[0][1])) {
          res.push(Number(wordToNum[nums[0][1]] + wordToNum[nums[0][1]]));
        } else {
          res.push(Number(nums[0][1] + nums[0][1]));
        }
      }
    }
  });

  const solution = res.reduce((acc, curr) => acc + curr);

  return solution;
});
