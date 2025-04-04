import axios from "axios"
import { DataItem } from "../types/DataItem"

const URL = "https://localhost:7088/api/data"

export const saveData = (data: Record<string, string>[]) => {
	return axios.post(URL, data)
}

export const getData = (code?: string) => {
	const params = code ? { code } : {}
	return axios.get<DataItem[]>(URL, { params })
}
