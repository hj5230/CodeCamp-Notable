abstract class Async {
    public static fetchStorage: (url: string) => Promise<object> = async(url) => {
        const pro: Response = await fetch(url)
		const res: object = await pro.json()
		return res
    }
	public static saveChanges: (url: string, json: object) => Promise<boolean> = async(url, json) => {
		console.log(json)
		const pro: Response = await fetch(url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(json)
		})
		const res: string = await pro.text()
		console.log(res)
		if(res === 'ok') return true
		else return false
	}
}

export { Async };
