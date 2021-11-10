const fs = require('fs');

const file = './db/data.json';

const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data));
}

const readDB = () => {
    if (!fs.existsSync(file)) return null;
    const stringData = fs.readFileSync(file, { encoding: 'utf-8' });
    const jsonData = JSON.parse(stringData)
    console.log(jsonData);
    return jsonData;
}

module.exports = {
    saveDB,
    readDB
}