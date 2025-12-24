const fetch = require('node-fetch');

const query = `
query GetAllPosts($host: String!) {
  publication(host: $host) {
    id
    posts(first: 1) {
      edges {
        node {
          id
          title
          reactions {
            total
          }
          readTimeInMinutes
        }
      }
    }
  }
}
`;

fetch('https://gql.hashnode.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query,
        variables: { host: 'it-blog-livid.vercel.app' }
    })
})
    .then(res => res.json())
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(err => console.error('Error:', err));
