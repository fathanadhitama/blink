export async function rewrites() {
    return [
        {
            source: '/:shortUrl',
            destination: '/api/:shortUrl', // The :path parameter is used here so will not be automatically passed in the query
        },
    ]
}