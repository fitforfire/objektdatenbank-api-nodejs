import * as rp from 'request-promise';

export interface ApiConfig {
  host: string;
  apiKey: string;
}

export interface OdbObject {
  id: number;
  name: string;
  text: string;
  markerLabel: string;
  lat: string;
  lng: string;
  catId: number;
}

export interface OdbApiHandle {
  getList: (layerId: number) => Promise<OdbObject[]>;
  getObject: (layerId: number, objectId: number) => Promise<OdbObject>;
  updateObject: (layerId: number, objectId: number, update: Partial<OdbObject>) => Promise<OdbObject>;
  addObject: (layerId: number, data: Partial<OdbObject>) => Promise<OdbObject>;
  removeObject: (layerId: number, objectId: number) => Promise<OdbObject>;
}

export default function (config: ApiConfig): OdbApiHandle {
  async function getList(layerId: number): Promise<OdbObject[]> {
    const data = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects`,
      method: 'GET',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
    });
    return JSON.parse(data);
  }

  async function getObject(layerId: number, objectId: number): Promise<OdbObject> {
    const data = await rp({
      uri: `${config.host}/rest/layers/${layerId}/objects/${objectId}`,
      method: 'GET',
      headers: {
        Authorization: `Token ${config.apiKey}`,
      },
    });
    return JSON.parse(data);
  }

  async function updateObject(layerId: number, objectId: number, update: Partial<OdbObject>): Promise<OdbObject> {
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

  async function addObject(layerId: number, data: Partial<OdbObject>): Promise<OdbObject> {
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

  async function removeObject(layerId: number, objectId: number): Promise<OdbObject> {
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
