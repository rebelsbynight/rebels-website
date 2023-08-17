const fs = require('fs');
const path = require('path');

if (process.argv.length != 3) {
  console.log("usage: %s %s OUTPUT_DIR", process.argv[0], process.argv[1]);
  process.exit(1);
}

const outputDir = process.argv[2];

for (let i = 1; i <= 1000; i++) {
  const outputData = {
    name: "Collectible Number #" + i.toString(),
    image: "ipfs://QmY7n7jDARnALqZeB53MrNQTsEqjKC6kZ7NY7v7sRvjg9d/" + i.toString() + ".png",
    attributes: [
      {
        trait_type: "Is Even",
        value: (i % 2 == 0).toString()
      },
      {
        trait_type: "Is Multiple of 10",
        value: (i % 10 == 0).toString()
      }
    ],
    external_url: "https://example.com/",
    description: "Some cool collectible numbers"
  };
  fs.writeFileSync(path.join(outputDir, i.toString() + ".json"),
                   JSON.stringify(outputData));
}
