<template>
  <div>
    <h1>vue掲示板</h1>
    <label for="name">投稿者名</label>
    <input type="text" name="" id="name" /><br />
    <label for="content">投稿内容</label><br />
    <textarea name="" id="content" cols="30" rows="10"></textarea><br />
    <button type="button">記事投稿</button>
    <hr />
    <hr />
    <div v-for="article of articles" v-bind:key="article.id">
      <div><span>投稿者名:</span>{{ article.name }}</div>
      <div><span>投稿内容:</span><br />{{ article.content }}</div>
      <dir v-for="comment of article.commentList" v-bind:key="comment.id">
        <div><span>コメント者名:</span>{{ comment.name }}</div>
        <div><span>コメント:</span><br />{{ comment.content }}</div>
      </dir>
      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Bbs extends Vue {
  private articles = new Array<Article>();

  created() {
    this.articles = this.$store.getters.getAllArticles;
    console.log(this.articles);
  }
}
</script>

<style scoped></style>
