// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addUser POST /api/user/add */
export async function addUserUsingPost(body: API.UserAddRequest, options?: { [key: string]: any }) {
  return request<API.BaseResponselong>('/api/user/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userBindEmail POST /api/user/bind/login */
export async function userBindEmailUsingPost(
  body: API.UserBindEmailRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/bind/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteUser POST /api/user/delete */
export async function deleteUserUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailLogin POST /api/user/email/login */
export async function userEmailLoginUsingPost(
  body: API.UserEmailLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/email/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userEmailRegister POST /api/user/email/register */
export async function userEmailRegisterUsingPost(
  body: API.UserEmailRegister,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/email/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getUserById GET /api/user/get */
export async function getUserByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getUserByInvitationCode POST /api/user/get/invitationCode */
export async function getUserByInvitationCodeUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUserByInvitationCodeUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/get/invitationCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** getLoginUser GET /api/user/get/login */
export async function getLoginUserUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/get/login', {
    method: 'GET',
    ...(options || {}),
  });
}

/** getCaptcha GET /api/user/getCaptcha */
export async function getCaptchaUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCaptchaUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseboolean>('/api/user/getCaptcha', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUser GET /api/user/list */
export async function listUserUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListUserVO>('/api/user/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listUserByPage GET /api/user/list/page */
export async function listUserByPageUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.listUserByPageUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageUserVO>('/api/user/list/page', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** userLogin POST /api/user/login */
export async function userLoginUsingPost(
  body: API.UserLoginRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userLogout POST /api/user/logout */
export async function userLogoutUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseboolean>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** userRegister POST /api/user/register */
export async function userRegisterUsingPost(
  body: API.UserRegisterRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponselong>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** userUnBindEmail POST /api/user/unbindEmail */
export async function userUnBindEmailUsingPost(
  body: API.UserUnBindEmailRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/unbindEmail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateUser POST /api/user/update */
export async function updateUserUsingPost(
  body: API.UserUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseUserVO>('/api/user/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** updateVoucher POST /api/user/update/voucher */
export async function updateVoucherUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseUserVO>('/api/user/update/voucher', {
    method: 'POST',
    ...(options || {}),
  });
}
