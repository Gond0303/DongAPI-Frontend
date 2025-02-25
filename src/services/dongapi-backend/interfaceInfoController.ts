// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addInterfaceInfo POST /api/InterfaceInfo/add */
export async function addInterfaceInfoUsingPost(
  body: API.InterfaceInfoAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/InterfaceInfo/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteInterfaceInfo POST /api/InterfaceInfo/delete */
export async function deleteInterfaceInfoUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/InterfaceInfo/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getInterfaceInfoById GET /api/InterfaceInfo/get */
export async function getInterfaceInfoByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInterfaceInfoByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseInterfaceInfo>('/api/InterfaceInfo/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceInfoBySearchTextPage POST /api/InterfaceInfo/get/searchText */
export async function listInterfaceInfoBySearchTextPageUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoBySearchTextPageUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfo>('/api/InterfaceInfo/get/searchText', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** invokeInterfaceInfo POST /api/InterfaceInfo/invoke */
export async function invokeInterfaceInfoUsingPost(
  body: API.InterfaceInfoInvokeRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseobject>('/api/InterfaceInfo/invoke', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listInterfaceInfo GET /api/InterfaceInfo/list */
export async function listInterfaceInfoUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListInterfaceInfo>('/api/InterfaceInfo/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listInterfaceInfoByPage GET /api/InterfaceInfo/list/page */
export async function listInterfaceInfoByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listInterfaceInfoByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageInterfaceInfo>('/api/InterfaceInfo/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** offlineInterfaceInfo POST /api/InterfaceInfo/offline */
export async function offlineInterfaceInfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/InterfaceInfo/offline', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** onlineInterfaceInfo POST /api/InterfaceInfo/online */
export async function onlineInterfaceInfoUsingPost(
  body: API.IdRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/InterfaceInfo/online', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateInterfaceInfo POST /api/InterfaceInfo/update */
export async function updateInterfaceInfoUsingPost(
  body: API.InterfaceInfoUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/InterfaceInfo/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
