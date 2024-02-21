import { fetchGuarded } from "./bsky-fetch-guarded";

async function fetchJsonWithAuth(session, url, params) {
  if (session === null) {
    return null;
  }
  let response = await fetchGuarded(url + "?" + new URLSearchParams(params), {
    headers: {
      Authorization: `Bearer ${session.accessJwt}`,
    },
  });
  return response?.json();
}

export function appBskyFeedGetAuthorFeed(session, did, cursor = null) {
  let params = {
    actor: did,
    limit: 30,
  };
  if (cursor != null) {
    params.cursor = cursor;
  }
  return fetchJsonWithAuth(session, "https://bsky.social/xrpc/app.bsky.feed.getAuthorFeed", params);
}

export function appBskyFeedSearchPosts(session, searchTerm, cursor = null) {
  let urlParams = {
    q: searchTerm,
    limit: 30,
  };
  if (cursor != null) {
    urlParams.cursor = cursor;
  }
  return fetchJsonWithAuth(session, "https://bsky.social/xrpc/app.bsky.feed.searchPosts", urlParams);
}
