async function* streamingFetch(input: RequestInfo | URL, init?: RequestInit) {
	const response = await fetch(input, init);
	if (!response.body) return;
	const reader = response.body.getReader();
	const decoder = new TextDecoder("utf-8");

	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		yield decoder.decode(value);
	}
}
export async function fetchStreamData(url: string) {
	let rec_data: string[] = [];
	for await (const value of streamingFetch(url)) {
		try {
			rec_data = [...rec_data, value];
		} catch (e) {
			console.warn(e);
		}
	}
	return JSON.parse(rec_data.join());
}
