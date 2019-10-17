import addBlog from "./components/addBlog.vue";
import showBlog from "./components/showBlogs.vue";

export default [
  { path: "/", component: showBlog },
  { path: "/add", component: addBlog }
];
