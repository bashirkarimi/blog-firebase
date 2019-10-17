<template>
  <div class="main-content">
    <h3>Add blog</h3>

    <form v-if="!submitted" class="frm-blog">
      <p>
        <label for="title" class="frm-blog__label">Tile:</label>
        <input type="text" v-model.lazy="blog.title" required class="frm-blog__title">
      </p>

      <p>
        <label class="frm-blog__label">Blog Content:</label>
        <textarea v-model.lazy.trim="blog.content" class="frm-blog__content"></textarea>
      </p>
      <div id="checkboxes" class="frm-blog__categories">
        <p class="frm-blog__lable">Blog Categories:</p>
        <label class="frm-blog__container">
          Random
          <input
            type="checkbox"
            value="Random"
            v-model="blog.categories"
            class="frm-blog__cat-check"
          >
          <span class="checkmark"></span>
        </label>
        <label class="frm-blog__container">
          Wizards
          <input
            type="checkbox"
            value="wizards"
            v-model="blog.categories"
            class="frm-blog__cat-check"
          >
          <span class="checkmark"></span>
        </label>
      </div>

      <input
        type="date"
        :value="myDate && myDate.toISOString().split('T')[0]"
        @input="myDate = $event.target.valueAsDate"
      >
      <button v-on:click.prevent="post" class="frm-blog__submit">Add blog</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        myDate: ""
      },
      submitted: false
    };
  },
  methods: {
    post: function() {
      this.$http
        .post("https://blog-vu.firebaseio.com/posts.json", this.blog)
        .then(function(data) {
          console.log(data);
          this.submitted = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.frm-blog {
  padding: 0.5em;

  &__label {
    font-size: 1em;
    color: #505050;
  }

  &__title,
  &__content {
    display: block;
    width: 100%;
    padding: 0.6em;
    font-size: 0.9em;
    border: 1px solid #e3e3e3;
  }

  &__content {
    height: 100px;
  }

  .frm-blog__container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  .frm-blog__container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  .frm-blog__container:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  .frm-blog__container input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  .frm-blog__container input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .frm-blog__container .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  &__categories {
  }

  &__cat-check {
    margin-right: 1.5em;
    border: 1px solid red;
  }

  &__submit {
    padding: 0.6em 1.2em;
    margin: 0.5em 0;
  }
}
</style>
