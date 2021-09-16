const fs = require('fs')
const readline = require("readline")

const rl = readline.createInterface({
    input: fs.createReadStream('sampledata.txt')
});

let data = []

rl.on('line', (line) => {
    const a = line.split("\t")
    data.push({
        "type": a[1],
        "notes": a[3],
        "selectedTag": a[2],
        "amount": Math.abs(parseFloat(a[4])),
        "createdAt": "2021-09-15 下午5:00:00",
        "date": a[0]
    })
});

rl.on("close", () => {
    fs.writeFileSync("./parsedData.json", JSON.stringify(data))
})