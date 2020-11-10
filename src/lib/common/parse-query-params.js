export default function parseQueryParams(query) {
	const q = query.substring(1)
	const terms = q.split('&')

	const result = {}
	for (const i of terms) {
		const [key, value] = i.split('=')

		if (key && value) result[key] = value.replace('+', ' ')
	}

	return result
}
