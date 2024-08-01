"use strict";

import { generateResults, fullYear } from "./script.js";

const foot = document.querySelector(".footer p");

fullYear(foot);

document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("searchForm");
  const resultsContainer = document.querySelector(".home-articles-show");
  const searchWord = document.querySelector("main h2");

  const getQuery = function () {
    const params = {};
    const queryString = window.location.search.slice(1); // Get the query string from the URL (e.g., "id=123")
    const [key, value] = queryString.split("="); // Split each pair into key and value (e.g., ["id", "123"])
    params[key] = decodeURIComponent(value || ""); // Decode the value and add to the params object (e.g., { id: "123" })
    return params;
  };

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Prevent the form from submitting the default way
      const query = document
        .getElementById("search")
        .value.trim()
        .toLowerCase(); // Get the search query

      if (query === "") {
        searchWord.textContent = "No search query entered.";
        resultsContainer.innerHTML = "";
        return;
      }

      searchWord.textContent = `Search Results for "${document.getElementById("search").value.trim()}":`;
      // Clear previous results
      resultsContainer.innerHTML = "";

      const blogs = JSON.parse(localStorage.getItem("blogPosts"));

      if (blogs !== null) {
        blogs.forEach((blog) => {
          if (blog.title.toLowerCase().includes(query)) {
            generateResults(resultsContainer, blog);
          }
        });
      }
    });
  }

  // Automatically search if there's a query in the URL
  const queryObj = getQuery();
  const query = queryObj.query;

  if (query) {
    document.getElementById("search").value = query; // Set the search input to the query value

    const blogs = JSON.parse(localStorage.getItem("blogPosts"));

    if (blogs !== null) {
      blogs.forEach((blog) => {
        if (blog.title.toLowerCase().includes(query.toLowerCase())) {
          generateResults(resultsContainer, blog);
        }
      });
    }
  }
});
