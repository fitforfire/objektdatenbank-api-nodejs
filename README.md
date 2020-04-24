# objektdatenbank-api-nodejs

This package can be used to get API access to an ODB instance.

NPM Package: https://www.npmjs.com/package/odb-api

## Example Usage:

```
    const odb = api({apiKey: '1234', host: 'objektdatenbank.at'});
    const list = await odb.getList(123);
    const object = await odb.getObject(123, list[0].id);
    const updated = await odb.updateObject(123, list[0].id, {text: 'updated'});
    const added = await odb.addObject(123, {title: 'title', lat: '12.3', lng: '47.1'});
    const removed = await odb.removeObject(123, added.id);
```
