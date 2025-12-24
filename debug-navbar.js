
const HASHNODE_API = "https://gql.hashnode.com";
const HASHNODE_DOMAIN = "it-blog-livid.vercel.app";

const PUBLICATION_QUERY = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
      preferences {
        navbarItems {
          type
          label
          url
          series {
            slug
            name
          }
          page {
            slug
            title
          }
        }
      }
    }
  }
`;

async function fetchPublication() {
  try {
    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: PUBLICATION_QUERY,
        variables: { host: HASHNODE_DOMAIN }
      }),
    });

    const json = await res.json();
    const items = json.data?.publication?.preferences?.navbarItems || [];
    items.forEach(item => {
      if (item.label === 'IT and Technology' || item.type === 'series') {
        const foundSlug = item.series ? item.series.slug : 'NULL';
        require('fs').writeFileSync('slug.txt', foundSlug);
      }
      console.log("URL: " + item.url);
    });
  } catch (err) {
    console.error(err);
  }
}

fetchPublication();
