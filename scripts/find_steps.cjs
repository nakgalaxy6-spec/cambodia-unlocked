const fs = require('fs');
const readline = require('readline');

async function findOutputs() {
  const fileStream = fs.createReadStream('C:/Users/Sambath/.gemini/antigravity/brain/4d900409-e9d4-4139-9840-d6ac8d8f4104/.system_generated/logs/transcript_full.jsonl');
  const rl = readline.createInterface({ input: fileStream });
  for await (const line of rl) {
    if (line.includes('"step_index":1295') || line.includes('"step_index":1300')) {
      const obj = JSON.parse(line);
      console.log('Step', obj.step_index, ':\n', obj.content);
    }
  }
}
findOutputs();
