import { useState } from "react"
import { Button, TextField, Typography, Box } from "@mui/material"
import { saveData } from "../../api/ApiService"

const PostDataForm = () => {
	const [input, setInput] = useState<string>("")
	const [message, setMessage] = useState<string>("")

	const handleSendData = async () => {
		try {
			const json = JSON.parse(input) as Record<string, string>[]
			await saveData(json)
			setMessage("Данные успешно сохранены!")
		} catch (err: any) {
			setMessage(`Error: ${err.message}`)
		}
	}

	return (
		<Box display="flex" flexDirection={"column"} alignItems="flex-start" gap={1}>
			<TextField
				fullWidth
				multiline
				rows={6}
				label="JSON"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<Button variant="contained" onClick={handleSendData}>Отправить</Button>
			<Typography color="success.main" mt={2}>{message}</Typography>
		</Box>
	)
}

export default PostDataForm