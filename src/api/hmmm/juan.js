import { createAPI } from "@/utils/request";

// 公司列表
export const companyList = (data) => createAPI("/companys", "get", data);

// 标签简单列表
export const tagsSimpleList = (data) => createAPI("/tags/simple", "get", data);

// 选项
export const optionsInfo = [
  {
    value: 1,
    label: "A",
    title: "",
    img: "",
    isRight: false,
  },
  {
    value: 2,
    label: "B",
    title: "",
    img: "",
    isRight: false,
  },
  {
    value: 3,
    label: "C",
    title: "",
    img: "",
    isRight: false,
  },
  {
    value: 4,
    label: "D",
    title: "",
    img: "",
    isRight: false,
  },
];

// 添加选项
export const addOptionsInfo = [
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];

// 企业管理设置状态
export const editState = (id, state) =>
  createAPI(`/companys/${id}/${state}`, "post");

// 企业管理修改
export const updateCompany = (id, data) =>
  createAPI(`/companys/${id}`, "put", data);

export const getUpdateCompany = (id, params) =>
  createAPI(`/companys/${id}`, "get", params);

// 企业管理添加
export const addCompany = (data) => createAPI("/companys", "post", data);

// 企业管理删除
export const delCompany = id => createAPI(`/companys/${id}`, 'delete')
