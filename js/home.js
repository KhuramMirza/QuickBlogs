"use strict";
import { generateListHome, fullYear } from "./script.js";

const foot = document.querySelector(".footer p");
const homeList = document.querySelector(".home-articles");

fullYear(foot);
generateListHome(homeList);
