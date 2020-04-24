const rp = require('request-promise');

module.exports = function(config) {

    async function getList(layerId) {
        const data = await rp({
            uri: `${config.host}/rest/layers/${layerId}/objects`,
            method: 'GET',
            headers: {
                'Authorization': `Token ${config.apiKey}`
            },
        });
        return JSON.parse(data);
    }

    async function getObject(layerId, objectId) {
        const data = await rp({
            uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
            method: 'GET',
            headers: {
                'Authorization': `Token ${config.apiKey}`
            },
        });
        return JSON.parse(data);
    }

    async function updateObject(layerId, objectId, update) {
        try {
            const data = await rp({
                uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
                method: 'POST',
                headers: {
                    'Authorization': `Token ${config.apiKey}`
                },
                form: update,
            });
            return JSON.parse(data);
        } catch (e) {
            console.log("error update", update);
        }
    }

    async function addObject(layerId, data) {
        try {
            const d = await rp({
                uri: `${config.host}/rest/layers/${layerId}/objects`,
                method: 'POST',
                headers: {
                    'Authorization': `Token ${config.apiKey}`
                },
                form: data,
            });
            return JSON.parse(d);
        } catch (e) {
            console.log("error add", data);
        }
    }

    async function removeObject(layerId, objectId) {
        const d = await rp({
            uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${config.apiKey}`
            }
        });
        return JSON.parse(d);
    }

    return {
        getList,
        getObject,
        updateObject,
        addObject,
        removeObject
    };
}