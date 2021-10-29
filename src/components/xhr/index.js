import axios from "axios";

export function get(url, body?, headers?) {
  return axios.get(url, body, headers);
}
