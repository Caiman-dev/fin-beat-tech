import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import { getData } from "../../api/ApiService";
import { DataItem } from "../../types/DataItem";
import DataTable from "../DataTable";

const GetDataList = () => {
	const [code, setCode] = useState<string>("");
	const [data, setData] = useState<DataItem[]>([]);

	const handleLoadData = async () => {
		try {
			const response = await getData(code);
			setData(response.data);
		} catch (err: any) {
			alert("Ошибка: " + err.message);
		}
	};

	return (
		<Box>
			<Box display="flex" flexDirection={"column"} alignItems="flex-start" gap={1}>
				<TextField
					label="Фильтрация по 'code'"
					value={code}
					onChange={(e) => setCode(e.target.value)}
				/>
				<Button variant="contained" onClick={handleLoadData}>Загрузить</Button>
			</Box>

			{data.length != 0 && <DataTable Data={data} />}
		</Box>
	);
};

export default GetDataList;
