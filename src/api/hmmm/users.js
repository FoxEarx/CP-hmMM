/*
 * @Author: nimingfeng
 * @Date: 2022-08-13 17:33:57
 * @Last Modified by: nimingfeng
 * @Last Modified time: 2022-08-13 17:34:09
 *
 * 用户
 */

import { createAPI } from "@/utils/request";

// 用户列表
export const getUsersListApi = (data) => createAPI("/users", "get", data);

// 删除用户
export const delUsersInfoApi = (id) => createAPI(`/users/${id}`, "DELETE");
