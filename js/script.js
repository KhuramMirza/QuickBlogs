const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputRead = document.getElementById("read");
const inputContent = document.getElementById("content");
const uploadImageBox = document.querySelector(".upload-img img");
const form = document.querySelector(".edit-from-container");
const foot = document.querySelector(".footer p");

export const generateList = (list) => {
  const blogList = JSON.parse(localStorage.getItem("blogPosts"));
  if (blogList !== null) {
    blogList.forEach((blog) => {
      const markup = `
           <div class="home-article margin-sides" data-id="${blog.id}">
            <div class="left">
                <div class="img-container">
                    <img src="${blog.image}" alt="Article Image">
                </div>
                <div class="article-content">
<!--                    <h2><a href="/blog-post.html">${blog.title}</a></h2>-->
                    <h2><a href="/blog-post.html?id=${blog.id}">${blog.title}</a></h2>
                    <span>By ${blog.author}</span>
                    <span>${blog.dates} | ${blog.read} min read</span>
                </div>
            </div>
            <button class="btn-options">
                <img src="./img/dots-three-vertical.svg" alt="Blog options">
            </button>

            <div class="options-container hidden">
                <button class="btn-edit">Edit</button>
                <button class="btn-delete">Delete</button>
            </div>
           </div>
    `;
      list.insertAdjacentHTML("afterbegin", markup);
    });
  }
};

export const generateListHome = (list) => {
  const blogList = JSON.parse(localStorage.getItem("blogPosts"));
  if (blogList !== null) {
    blogList.forEach((blog) => {
      const markup = `
           <div class="home-article margin-sides" data-id="${blog.id}">
            <div class="left">
                <div class="img-container">
                    <img src="${blog.image}" alt="Article Image">
                </div>
                <div class="article-content">
<!--                    <h2><a href="/blog-post.html">${blog.title}</a></h2>-->
                    <h2><a href="/blog-post.html?id=${blog.id}">${blog.title}</a></h2>
                    <span>By ${blog.author}</span>
                    <span>${blog.dates} | ${blog.read} min read</span>
                </div>
            </div>
            
    `;
      list.insertAdjacentHTML("afterbegin", markup);
    });
  }
};

export const generateResults = function (container, blogItem) {
  const markup = `
           <div class="home-article margin-sides" data-id="${blogItem.id}">
            <div class="left">
                <div class="img-container">
                    <img src="${blogItem.image}" alt="Article Image">
                </div>
                <div class="article-content">
<!--                    <h2><a href="/blog-post.html">${blogItem.title}</a></h2>-->
                    <h2><a href="/blog-post.html?id=${blogItem.id}">${blogItem.title}</a></h2>
                    <span>By ${blogItem.author}</span>
                    <span>${blogItem.dates} | ${blogItem.read} min read</span>
                </div>
            </div>
            
    `;
  container.insertAdjacentHTML("afterbegin", markup);
};
export const clearList = function (list) {
  list.innerHTML = "";
};

// Function to display the post details
export function displayPostDetails(post) {
  const titleElement = document.querySelector(".blog-details h2"); // Select the title element
  const dateElement = document.querySelector(".blog-details span"); // Select the date element
  const authorElement = document.querySelector(".blog-content > span"); // Select the author element
  const contentElement = document.querySelector(".blog-content p"); // Select the content element
  const imageElement = document.querySelector(".img-container img"); // Select the image element

  // Set the text content and attributes for each element based on the post data
  titleElement.textContent = post.title; // Set the title
  dateElement.textContent = `${post.dates} | ${post.read} min read`; // Set the date and read time
  authorElement.textContent = `By ${post.author.toUpperCase()}`; // Set the author

  // Preserve the formatting of the content
  contentElement.innerHTML = post.content.replace(/\n/g, "<br>"); // Set the content with formatting

  imageElement.src = post.image; // Set the image source
}

export const showEditForm = function (id) {
  form.classList.remove("hidden");
  const blogList = JSON.parse(localStorage.getItem("blogPosts"));
  if (blogList !== null) {
    blogList.forEach((blog) => {
      if (blog.id === id) {
        inputTitle.value = blog.title;
        console.log(blog.title);
        inputAuthor.value = blog.author;
        inputRead.value = blog.read;
        inputContent.value = blog.content;
        uploadImageBox.src = blog.image;
      }
    });
  }
};

export function reloadPage() {
  location.reload();
}

const currentYear = new Date().getFullYear();

export const fullYear = function (foot) {
  foot.textContent = `Copyright © ${currentYear} QuickBlogs. All rights reserved.`;
};
