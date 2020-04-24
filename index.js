const api = require('src/api');

async function exampleUsage() {
    const odb = api({apiKey: '1234', host: 'objektdatenbank.at'});
    await  (async () => {
        const list = await odb.getList(123);
        const object = await odb.getObject(123, list[0].id);
        const updated = await odb.updateObject(123, list[0].id, {text: 'updated'});
        const added = await odb.addObject(123, {title: 'title', lat: '12.3', lng: '47.1'});
        const removed = await odb.removeObject(123, added.id);
    })();
}

module.exports = api;