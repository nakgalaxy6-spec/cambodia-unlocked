const fs = require('fs');
const readline = require('readline');

async function search() {
  const fileStream = fs.createReadStream('C:/Users/Sambath/.gemini/antigravity/brain/4d900409-e9d4-4139-9840-d6ac8d8f4104/.system_generated/logs/transcript.jsonl');
  const rl = readline.createInterface({ input: fileStream });
  let idx = 0;
  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.source === 'USER') {
      console.log(`[USER MSG ${idx++}]:\n`, obj.content, '\n------------------');
    }
  }
}
search();
