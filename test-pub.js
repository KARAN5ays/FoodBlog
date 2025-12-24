const HASHNODE_API = "https://gql.hashnode.com";
const HASHNODE_DOMAIN = "it-blog-livid.vercel.app";

const PUBLICATION_QUERY = `
  query GetPublication($host: String!) {
    publication(host: $host) {
      id
      title
      displayTitle
      descriptionSEO
      author {
        name
        username
      }
    }
  }
`;

async function testPub() {
    console.log(`Testing publication for host: ${HASHNODE_DOMAIN}...`);
    try {
        const res = await fetch(HASHNODE_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                query: PUBLICATION_QUERY,
                variables: { host: HASHNODE_DOMAIN },
            }),
        });

        const json = await res.json();
        console.log(JSON.stringify(json, null, 2));
    } catch (error) {
        console.error("Error:", error);
    }
}

testPub();
