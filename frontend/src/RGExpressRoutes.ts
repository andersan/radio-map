export async function fetchData() {
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.text()
    });
}

export async function fetchJSONData() {
    console.log("fetching data --- frontend express test");
    return fetch('http://localhost:3000/api/express/json').then((res) => {
        console.log("res.json() --- frontend express test");
        // console.log(res.text());
        // console.log(res.body);
        // console.log(res.status);
        // console.log(res.headers);
        // console.log(res.json());
        return res.json()
    });
}