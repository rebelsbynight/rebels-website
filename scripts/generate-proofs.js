const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const fs = require("fs");
const path = require("path");

if (process.argv.length != 4) {
  console.log("usage: %s %s INPUT_FILE OUTPUT_DIR", process.argv[0], process.argv[1]);
  process.exit(1);
}

const inputFile = process.argv[2];
const outputDir = process.argv[3];

const input = JSON.parse(fs.readFileSync(inputFile, "utf8"));
const addresses = input.addresses;

const leaves = addresses.map((v) => keccak256(v));
const tree = new MerkleTree(leaves, keccak256, { sort: true });

const root = tree.getHexRoot();
fs.writeFileSync(path.join(outputDir, "root.json"), JSON.stringify({ root }));

addresses.forEach((address) => {
  const proof = tree.getHexProof(keccak256(address));
  const outputData = { address, proof };
  fs.writeFileSync(path.join(outputDir, address.toLowerCase() + ".json"), JSON.stringify(outputData));
});
