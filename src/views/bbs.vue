<template>
  <div>
    <h1>vue掲示板</h1>
    <span class="error" v-if="nameError != ''">{{ nameError }}<br /></span>
    <label for="name">投稿者名</label>
    <input type="text" name="name" id="name" v-model="name" /><br />
    <span class="error" v-if="contentError != ''"
      >{{ contentError }}<br
    /></span>
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
      <CopmCommentForm :articleId="article.id"></CopmCommentForm>

      <hr />
    </div>
  </div>
</template>

<script lang="ts">
import { Article } from "@/types/article";
import { Component, Vue } from "vue-property-decorator";
import CopmCommentForm from "@/components/commentForm.vue";

@Component({ components: { CopmCommentForm } })
export default class Bbs extends Vue {
  // 記事一覧
  private articles = new Array<Article>();
  // 記事の投稿者名
  private name = "";
  // 投稿する記事の内容
  private content = "";
  // 名前の未入力のエラーメッセージ
  private nameError = "";
  // 記事内容の未入力のエラーメッセージ
  private contentError = "";

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
    if (this.inputHasError()) {
      return;
    } else {
      this.$store.commit("createArticle", {
        name: this.name,
        content: this.content,
      });
      this.name = "";
      this.content = "";
    }
  }
  /**
   * 記事投稿の際に名前と投稿内容のバリデーションチェックをする.
   *
   * @return バリデーションをクリアしたかどうかの真偽値
   */
  inputHasError(): boolean {
    // 名前の入力チェック
    if (this.name === "") {
      this.nameError = "名前を入力してください";
    } else if (this.name.length > 50) {
      this.nameError = "名前は50文字以内で入力してください";
    } else {
      this.nameError = "";
    }
    // 投稿内容の入力チェック
    if (this.content === "") {
      this.contentError = "投稿内容を入力してください";
    } else {
      this.contentError = "";
    }
    if (this.nameError !== "" || this.contentError !== "") {
      return true;
    } else {
      return false;
    }
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

<style scoped>
.error {
  color: red;
}
</style>
