// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity";
import { client } from './sanity-client'

const token = process.env.SANITY_API_READ_TOKEN;
if(!token) {
  throw new Error("SANITY_API_READ_TOKEN is not set");
}

export const { sanityFetch, SanityLive } = defineLive({ 
  client: client, 
  serverToken: token,
  browserToken: token,
  fetchOptions: {
    revalidate: 60, // Cache for 1 minute instead of 0
  },
});
