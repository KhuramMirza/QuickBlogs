"use strict";
import { displayPostDetails, fullYear } from "./script.js";

const foot = document.querySelector(".footer p");
fullYear(foot);

// Function to get query parameters from the URL
export function getQueryParams() {
  const params = {};
  const queryString = window.location.search.slice(1); // Get the query string from the URL (e.g., "id=123")
  const pairs = queryString.split("&"); // Split into key-value pairs (e.g., ["id=123"])

  pairs.forEach((pair) => {
    const [key, value] = pair.split("="); // Split each pair into key and value (e.g., ["id", "123"])
    params[key] = decodeURIComponent(value || ""); // Decode the value and add to the params object (e.g., { id: "123" })
  });
  return params;
}

// Get the post ID from the URL
const queryParams = getQueryParams(); // Get query parameters (e.g., { id: "123" })
const postId = queryParams.id; // Extract the post ID (e.g., "123")

if (postId) {
  const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || []; // Get blog posts from localStorage (e.g., array with the post data)
  const post = blogPosts.find((blog) => blog.id === postId); // Find the post with the matching ID (e.g., the post with id "123")

  if (post) {
    displayPostDetails(post); // Display the post details on the page
  } else {
    console.error("Post not found"); // Log an error if the post is not found
  }
} else {
  // console.error("No post ID specified"); // Log an error if no post ID is specified in the URL
}
