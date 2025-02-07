#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('Usage: node filo.js <source file> <output file> (optional)');
  process.exit(1);
}

const sourceFile = path.resolve(args[0]);
const outputDirectory = path.dirname(sourceFile);
const outputFile = args[1] || path.join(outputDirectory, `filo-${path.basename(sourceFile)}`);

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Source file "${sourceFile}" does not exist.`);
  process.exit(1);
}

let sourceContent = fs.readFileSync(sourceFile, 'utf8');
let regex = /\${filo:([^}]+)}(?:\(([^)]+)\))?/;

let parsedContent = sourceContent.split('\n').map(line => {
  let match = line.match(regex);
  return match ? fs.readFileSync(path.join(outputDirectory, match[1]), 'utf8') : line;
}).join('\n');

fs.writeFileSync(outputFile, parsedContent, 'utf8');