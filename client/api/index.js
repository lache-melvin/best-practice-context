import axios from "axios";
import { getAuthorizationHeader } from "../auth";

import { makeGetEntries, makeGetEntryById, makeAddEntry } from "./entries";

const baseUrl = "/api/v1";

export const getEntries = makeGetEntries(consume);
export const getEntryById = makeGetEntryById(consume);
export const addEntry = makeAddEntry(consume, getAuthorizationHeader);

function consume(url, config = {}) {
  const request = {
    url: baseUrl + url,
    method: config.method || "get",
    headers: {
      Accept: "application/json",
    },
  };

  if (config.data) {
    request.data = config.data;
  }

  if (config.token) {
    request.headers.Authorization = config.token;
  }

  return axios(request)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
