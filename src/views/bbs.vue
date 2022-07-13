<template>
  <div>
    <h1>vue掲示板</h1>
    <label for="name">投稿者名</label>
    <input type="text" name="name" id="name" v-model="name" /><br />
    <label for="content">投稿内容</label><br />
    <textarea
      name="content"
      id="content"
      cols="30"
      rows="10"
      v-model="content"
    ></textarea
    ><br />
    <button type="button" v-on:click="postArticle">記事投稿</button>
    <hr />
    <hr />
    <div v-for="(article, articleIdx) of articles" v-bind:key="article.id">
      <!-- 記事の表示 -->
      <div><span>投稿者名:</span>{{ article.name }}</div>
      <div><span>投稿内容:</span><br />{{ article.content }}</div>
      <button type="button" v-on:click="deleteArticle(articleIdx)">
        記事を削除
      </button>
      <!-- コメントの表示 -->
      <dir
        v-for="(comment, commentIdx) of article.commentList"
        v-bind:key="comment.id"
      >
        <div><span>コメント者名:</span>{{ comment.name }}</div>
        <div><span>コメント:</span><br />{{ comment.content }}</div>
        <button
          type="button"
          v-on:click="deleteComment(articleIdx, commentIdx)"
        >
          コメントを削除
        </button>
      </dir>
      <!-- コメント投稿フォームの表示 -->
      <form action="">
        <label for="commenterName">コメント者名</label>
        <input
          type="text"
          name=""
          id="commenterName"
          v-model="commenterName"
          :key="'commentNameFor' + article.id"
        /><br />
        <label for="commentContent">コメント内容</label><br />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="commentContent"
          :key="'commentContentFor' + article.id"
        ></textarea
        ><br />
        <button type="button" v-on:click="postComment(article.id)">
          コメントする
        </button>
      </form>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Bbs extends Vue {
  // 記事一覧
  private articles = new Array<Article>();
  // 記事の投稿者名
  private name = "";
  // 投稿する記事の内容
  private content = "";
  // コメント者名
  private commenterName = "";
  // コメント内容
  private commentContent = "";

  /**
   * 全ての記事を取得する.
   */
  created() {
    this.articles = this.$store.getters.getAllArticles;
    console.log(this.articles);
  }
  /**
   * 記事を投稿する.
   */
  postArticle(): void {
    this.$store.commit("createArticle", {
      name: this.name,
      content: this.content,
    });
    this.name = "";
    this.content = "";
  }
  /**
   * コメントを投稿する.
   */
  postComment(articleId: number) {
    this.$store.commit("createComment", {
      articleId: articleId,
      commenterName: this.commenterName,
      commentContent: this.commentContent,
    });
    this.commenterName = "";
    this.commentContent = "";
  }
  /**
   * 記事を削除する.
   */
  deleteArticle(articleIdx: number) {
    this.$store.commit("deleteArticle", { articleIdx: articleIdx });
  }
  /**
   * コメントを削除する.
   */
  deleteComment(articleIdx: number, commentIdx: number) {
    this.$store.commit("deleteComment", {
      articleIdx: articleIdx,
      commentIdx: commentIdx,
    });
  }
}
</script>

<style scoped></style>
