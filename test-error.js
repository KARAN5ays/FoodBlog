
const HASHNODE_API = "https://gql.hashnode.com";
const HASHNODE_DOMAIN = "it-blog-livid.vercel.app";

const SERIES_QUERY = `
      query GetSeries($host: String!, $slug: String!) {
        publication(host: $host) {
          id
          series(slug: $slug) {
            id
            name
            slug
            description {
              markdown
              html
            }
            coverImage
            posts(first: 20) {
              edges {
                node {
                  id
                  title
                  slug
                  brief
                  publishedAt
                  coverImage {
                    url
                  }
                  author {
                    id
                    name
                    profilePicture
                  }
                  tags {
                    id
                    name
                  }
                  readTimeInMinutes
                }
              }
            }
          }
        }
      }
    `;

async function testSeriesError() {
  const slug = "it-blogs"; // Extracted slug
  console.log(`Testing getSeries with slug: "${slug}"`);

  try {
    const res = await fetch(HASHNODE_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: SERIES_QUERY,
        variables: { host: HASHNODE_DOMAIN, slug: slug }
      }),
    });

    const json = await res.json();
    require('fs').writeFileSync('series-response.json', JSON.stringify(json, null, 2));

    if (json.errors) {
      console.error("GRAPHQL ERRORS DETECTED!");
      json.errors.forEach(e => console.error(e.message));
    } else if (!json.data.publication.series) {
      console.error("Series is NULL (Not Found)");
    } else {
      console.log("Series found successfully!");
    }

  } catch (err) {
    console.error("Fetch Error:", err);
  }
}

testSeriesError();
