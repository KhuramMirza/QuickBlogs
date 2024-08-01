"use strict";
import {
  generateList,
  clearList,
  showEditForm,
  reloadPage,
  fullYear,
} from "./script.js";
import { v4 as uuidv4 } from "https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js";

const articlesContainer = document.querySelector(".home-articles");

const btnCreatePost = document.querySelector(".btn-create--blog");
const form = document.querySelector(".edit-from-container");
const btnCloseForm = document.querySelector(".closePopupBtn");

const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputRead = document.getElementById("read");
const inputContent = document.getElementById("content");

const btnUpload = document.querySelector(".btn-upload");
const btnSave = document.querySelector(".btn-save");
const fileInput = document.getElementById("fileInput");
const uploadImageBox = document.querySelector(".upload-img img");
const errorMessage = document.querySelector(".error-message");
const errorCloseBtn = document.querySelector(".error-closePopupBtn");
const foot = document.querySelector(".footer p");
const errorBlur = document.querySelector(".blurBackground-error");

const saved = false;
let isEditing = false; // Flag to indicate if we are editing an existing post
let currentEditId = null; // To store the ID of the post being edited

fullYear(foot);
const closeForm = function () {
  btnCloseForm.addEventListener("click", function () {
    form.classList.add("hidden");
  });
};

document.addEventListener("DOMContentLoaded", function () {
  generateList(articlesContainer);

  btnCreatePost.addEventListener("click", () => {
    form.classList.toggle("hidden");
    uploadImageBox.src = "./img/upload.svg";
    clearInputs();
  });

  uploadImage();
  closeForm();

  btnSave.addEventListener("click", function () {
    // saveDataToLocalStorage();
    const saved = saveDataToLocalStorage();
    if (saved === true) {
      clearInputs();
      clearList(articlesContainer);
      generateList(articlesContainer);
      form.classList.add("hidden");
      reloadPage();
    } else {
      saveDataToLocalStorage();
    }
  });

  showOptions();
});

const clearInputs = function () {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputRead.value = "";
  inputContent.value = "";
};

const generatePostId = () => uuidv4();

const date = new Date();
const month = date.toLocaleString("default", { month: "short" });

const saveDataToLocalStorage = function () {
  const postId = isEditing ? currentEditId : generatePostId();
  // Trim input values and check if any are empty
  const titleValue = inputTitle.value.trim();
  const authorValue = inputAuthor.value.trim();
  const readValue = inputRead.value.trim();
  const contentValue = inputContent.value.trim();
  const imageValue = uploadImageBox.src.trim();

  if (
    !titleValue ||
    !authorValue ||
    !readValue ||
    !contentValue ||
    imageValue === "http://127.0.0.1:8080/img/upload.svg" ||
    isNaN(+readValue)
  ) {
    // Show the error message by removing the 'hidden' class
    errorMessage.classList.remove("hidden");
    errorBlur.classList.remove("hidden");
    // Add an event listener to the close button to hide the message when clicked
    errorCloseBtn.addEventListener("click", () => {
      errorMessage.classList.add("hidden");
      errorBlur.classList.add("hidden");
    });
    // return false;
    // saveDataToLocalStorage();
    // return; // Exit the function if any field is empty
  } else {
    const blogPostData = {
      id: postId,
      title: titleValue,
      author: authorValue,
      read: readValue,
      content: contentValue,
      image: imageValue,
      dates: `${month} ${date.getDate()},${date.getFullYear()}`,
    };

    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    const existingPostIndex = blogPosts.findIndex((post) => post.id === postId);

    if (existingPostIndex !== -1) {
      blogPosts[existingPostIndex] = blogPostData;
    } else {
      blogPosts.push(blogPostData);
    }

    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));

    isEditing = false;
    currentEditId = null;
    return true;
  }
};

const uploadImage = function () {
  btnUpload.addEventListener("click", function () {
    fileInput.click();
  });

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadImageBox.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      uploadImageBox.src = "./img/upload.svg";
    }
  });
};

const showOptions = function () {
  document.querySelectorAll(".btn-options").forEach((button) => {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      const optionsContainer = this.nextElementSibling;
      const isVisible = !optionsContainer.classList.contains("hidden");

      document.querySelectorAll(".options-container").forEach((container) => {
        container.classList.add("hidden");
      });

      if (!isVisible) {
        optionsContainer.classList.remove("hidden");
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (
      !event.target.matches(".btn-options") &&
      !event.target.closest(".options-container")
    ) {
      document.querySelectorAll(".options-container").forEach((container) => {
        container.classList.add("hidden");
      });
    }
  });
};

// Add event listeners for edit and delete buttons
document.addEventListener("click", function (event) {
  if (event.target.matches(".btn-edit")) {
    const article = event.target.closest(".home-article");
    const id = article.dataset.id;
    showEditForm(id);
    isEditing = true;
    currentEditId = id;
    form.classList.remove("hidden");
  } else if (event.target.matches(".btn-delete")) {
    const article = event.target.closest(".home-article");
    const id = article.dataset.id;
    let blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    blogPosts = blogPosts.filter((post) => post.id !== id);
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
    clearList(articlesContainer);
    generateList(articlesContainer);
    showOptions();
  }
});
