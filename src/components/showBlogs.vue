<template>
  <div class="main-content blogs">
    <h3> blogs</h3>
    <input type="text" v-model="searchStringVal" @keyup="handleInput" placeholder="Search..." class="blog__search">
    <span v-if="isTyping">is searching </span>
    <div v-if="!dataReady">Data not found </div>
    <div v-if="getPage().length < 1 ">No result found </div>

    <div v-if="singleBlog" class="blog-single">
      <div @click="goBack">Back</div>
      <h2 v-html="highLight(singleBlog.title, searchString)"></h2>
      <p v-html="highLight(singleBlog.content, searchString)">{{singleBlog.body}}</p>
    </div>

    <div v-else>
      <div  v-for="(blog, key) in getPage()" v-on:click="showBlogDetail(blog.id)" class="blog blog-listb">
        <h2 v-html="highLight(blog.title, searchString)" class="blog__title">  </h2>
        <em> {{blog.myDate}}</em>
        <p v-html="highLight(blog.content, searchString)" class="blog__content"> </p>
        <span v-for="(category, index) in blog.categories" class="blog__tags" >{{category}}<template v-if="blog.categories.length -1 > index"> - </template></span>
      </div>

      <ul class="pagination">
        <li @click="PreviousePage" v-if="page > 1">Previouse Page</li>
        <li v-for="pageNum in totalPage()" @click="changePage(pageNum)" v-if="Math.abs(pageNum - page) < 3 || pageNum == totalPage() || pageNum == 1" >
        <a :class="{active: pageNum == page}" >{{pageNum}}</a>
        </li>
        <li @click="nextPage" v-if="page < totalPage()">Next page</li>
      </ul>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import debounce from "lodash/debounce";
import searchMixin from "../mixins/searchMixin";

export default {
  name: "showBlogs",
  data: function() {
    return {
      blogs: [],
      page: 1,
      perPage: 5,
      searchString: "",
      searchStringVal: "",
      isTyping: false,
      isSeaching: false,
      dataReady: false,
      blogId: 0
    };
  },
  created() {
    this.$http
      .get("https://blog-vu.firebaseio.com/posts.json")
      .then(function(data) {
        this.dataReady = true;
        return data.json();
      })
      .then(function(data) {
        var blogsArray = [];
        for (let key in data) {
          data[key].id = key;
          blogsArray.push(data[key]);
        }
        this.blogs = blogsArray;
        //console.log(this.blogs);
      });

    this.debouncedFire = debounce(this.searchInput, 400);
  },
  mounted() {
    this.hashChange();

    window.addEventListener("hashchange", this.hashChange);
  },
  computed: {
    filteredBlogs: function() {
      const searchFeilds = ["title", "content"];
      const search = this.searchString.toLowerCase().split(' ');
      let blogArr = this.blogs.filter(blog => {
        for (let i = 0; searchFeilds.length > i; i += 1) {
          for(let searchEl = 0; search.length > searchEl; searchEl += 1) {
            if (blog[searchFeilds[i]].toLowerCase().indexOf(search[searchEl]) !== -1) {
            return true;
            }
          }
        }
        return false;
      });
      console.log(blogArr);
      return blogArr;
    },
    singleBlog: function() {
      if (this.blogId) {
        let blog = this.blogs.find(blog => {
          return blog.id === this.blogId || false;
        });
        return blog;
      }
      return false;
    }
  },
  methods: {
    handleInput: function() {
      this.isTyping = false;
      var val = this.searchStringVal.trim();

      if (!val || val.length < 1) {
        this.isSeaching = false;
        this.searchString = "";
      } else if (/^\s*$/.test(val)) {
        this.searchString = "";
      }
      this.isTyping = true;
      this.debouncedFire(val);
    },
    searchInput: function(val) {
      this.searchString = val;
      this.isTyping = false;
    },
    highLight: function(text, keyword) {
      let newText = text;
      const keywords = keyword.split(' ');
      if (text && keywords && keywords.length > 0) {
        /* eslint-disable */
        keywords.forEach((keyword) => {
          if (keyword) {
            newText = (!newText.startsWith('<') ? '<span>' + newText + '</span>' : newText).replace(/(>[^<]+)/igm,
            function (result) {
                return result.replace(
                new RegExp("(" + keyword + ")", 'igm'),
                  "<em class='high-lighted'>$1</em>",
                );
              },
            );
          }
        });
      }
      return newText;
    },
    hashChange: function() {
      if (location.hash.includes("page-")) {
        this.page = location.hash.slice(6);
      } else if (location.hash.includes("blog")) {
        this.blogId = location.hash.slice(5);
      } else {
        this.blogId = null;
      }
    },
    getPage: function() {
      var start = (this.page - 1) * this.perPage;
      var end = start + this.perPage;
      return this.filteredBlogs.slice(start, end);
    },
    changePage: function(pageNum) {
      location.hash = "page-" + pageNum;
      this.page = pageNum;
    },
    nextPage: function() {
      let num = Number(this.page) + 1;
      location.hash = "page-" + num;
      return (this.page += 1);
    },
    PreviousePage: function() {
      let num = Number(this.page) - 1;
      location.hash = "page-" + num;
      return (this.page -= 1);
    },
    totalPage: function() {
      return Math.ceil(this.filteredBlogs.length / this.perPage);
    },
    showBlogDetail: function(key) {
      if (!key) {
        return false;
      } else {
        location.hash = "blog" + key;
        this.searchStringVal = "";
        this.searchString = "";
      }
    },
    goBack: function() {
      window.history.back();
      this.blogId = 0;
    }
  },

  mixins: [searchMixin]
};
</script>

<style lang="scss">
.blog {
  padding-bottom: 1em;
  border-bottom: 1px solid #303030;

  &__search {
    width: 14rem;
    padding: 0.6em;
    font-size: 1rem;
  }
  &__title {
    font-size: 1.4em;
    color: #505050;
  }
}

.pagination {
  list-style: none;

  li {
    display: inline;
    padding: 12px;
  }
  li:hover {
    cursor: pointer;
  }

  li .active {
    color: green;
  }
}

.high-lighted {
  font-weight: 600;
  color: green;
}
</style>
