const HASHNODE_API = "https://gql.hashnode.com";
const HASHNODE_DOMAIN = "it-blog-livid.vercel.app";

const ALL_POSTS_QUERY = `
  query GetAllPosts($host: String!) {
    publication(host: $host) {
      id
      title
      posts(first: 50) {
        totalDocuments
        edges {
          node {
            id
            title
            publishedAt
          }
        }
      }
    }
  }
`;

async function checkPosts() {
  console.log(`Checking posts for host: ${HASHNODE_DOMAIN}...`);
  try {
    const res = await fetch(HASHNODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ALL_POSTS_QUERY,
        variables: { host: HASHNODE_DOMAIN },
      }),
    });

    if (!res.ok) {
      console.error("HTTP Error:", res.status, res.statusText);
      return;
    }

    const json = await res.json();
    const posts = json.data.publication.posts;

    console.log("------------------------------------------------");
    console.log(`Total Documents Reported: ${posts.totalDocuments}`);
    console.log(`Fetched Edges Count: ${posts.edges.length}`);
    console.log("------------------------------------------------");

    posts.edges.forEach((edge, i) => {
      console.log(`${i + 1}. ${edge.node.title} (${edge.node.publishedAt})`);
    });
    console.log("------------------------------------------------");

  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

checkPosts();
