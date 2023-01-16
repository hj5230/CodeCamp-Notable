abstract class Async {
  public static fetchStorage: (url: string) => Promise<object> = async (
    url
  ) => {
    const pro: Response = await fetch(url);
    const res: object = await pro.json();
    return res;
  };
  public static saveChanges: (url: string, json: object) => Promise<boolean> =
    async (url, json) => {
      const pro: Response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(json),
      });
      const res: string = await pro.text();
      if (res === "ok") return true;
      else return false;
    };
  public static postTranslate: (
    url: string,
    from: string,
    to: string,
    content: string
  ) => Promise<Object> = async (url, from, to, content) => {
    const pro: Response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        from: from,
        to: to,
        content: content,
      }),
    });
    const res: object = await pro.json();
    return res;
  };
}

export { Async };
