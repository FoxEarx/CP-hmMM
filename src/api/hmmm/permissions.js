/*
 * @Author: nimingfeng
 * @Date: 2022-08-17 03:58:32
 * @Last Modified by: nimingfeng
 * @Last Modified time: 2022-08-17 03:58:27
 *
 * 权限
 */

import { createAPI } from "@/utils/request";

// 权限组列表

export const getPermissionsApi = (data) =>
  createAPI("/permissions", "get", data);
