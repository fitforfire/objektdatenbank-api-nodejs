import * as rp from 'request-promise';

export interface ApiConfig {
  host: string;
  apiKey: string;
}

export interface OdbObject {
  id: string;
  name: string;
  text: string;
  markerLabel: string;
  lat: string;
  lng: string;
  catId: string;
}

export interface OdbApiHandle {
  getList: (layerId: string) => Promise<OdbObject[]>;
  getObject: (layerId: string, objectId: string) => Promise<OdbObject>;
  updateObject: (layerId: string, objectId: string, update: Partial<OdbObject>) => Promise<OdbObject>;
  addObject: (layerId: string, data: any) => Promise<OdbObject>;
  removeObject: (layerId: string, objectId: string) => Promise<OdbObject>;
}

export default function (config: ApiConfig): OdbApiHandle {
  async function getList(layerId: string): Promise<OdbObject[]> {
    const data = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects`,
      method: 'GET',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
    });
    return JSON.parse(data);
  }

  async function getObject(layerId: string, objectId: string): Promise<OdbObject> {
    const data = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
      method: 'GET',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
    });
    return JSON.parse(data);
  }

  async function updateObject(layerId: string, objectId: string, update: Partial<OdbObject>): Promise<OdbObject> {
    const data = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
      method: 'POST',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
      form: update,
    });
    return JSON.parse(data);
  }

  async function addObject(layerId: string, data: Partial<OdbObject>): Promise<OdbObject> {
    const d = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects`,
      method: 'POST',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
      form: data,
    });
    return JSON.parse(d);
  }

  async function removeObject(layerId: string, objectId: string): Promise<OdbObject> {
    const d = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
    });
    return JSON.parse(d);
  }

  return {
    getList,
    getObject,
    updateObject,
    addObject,
    removeObject,
  };
}
