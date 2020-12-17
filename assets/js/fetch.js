function fetcher(url) {
    return fetch(url)
    .then(res => {
        return res.json()
    })
}

export default fetcher;