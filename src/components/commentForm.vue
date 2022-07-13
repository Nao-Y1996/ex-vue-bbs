<template>
  <div>
    <form action="">
      <span class="error" v-if="nameError != ''">{{ nameError }}<br /></span>
      <label for="commenterName">コメント者名</label>
      <input type="text" id="commenterName" v-model="commenterName" /><br />
      <span class="error" v-if="contentError != ''"
        >{{ contentError }}<br
      /></span>
      <label for="commentContent">コメント内容</label><br />
      <textarea
        id="commentContent"
        cols="30"
        rows="10"
        v-model="commentContent"
      ></textarea
      ><br />
      <button type="button" v-on:click="postComment(articleId)">
        コメントする
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
@Component
export default class CopmCommentForm extends Vue {
  // 記事ID
  @Prop()
  private articleId!: number;
  // コメント者名
  private commenterName = "";
  // コメント内容
  private commentContent = "";
  // 名前の未入力のエラーメッセージ
  private nameError = "";
  // コメント内容の未入力のエラーメッセージ
  private contentError = "";

  /**
   * コメントを投稿する.
   */
  postComment(articleId: number) {
    if (this.inputHasError()) {
      return;
    } else {
      this.$store.commit("createComment", {
        articleId: articleId,
        commenterName: this.commenterName,
        commentContent: this.commentContent,
      });
      this.commenterName = "";
      this.commentContent = "";
    }
  }
  /**
   * コメント投稿の際に名前と投稿内容のバリデーションチェックをする.
   *
   * @return バリデーションをクリアしたかどうかの真偽値
   */
  inputHasError(): boolean {
    // 名前の入力チェック
    if (this.commenterName === "") {
      this.nameError = "名前を入力してください";
    } else if (this.commenterName.length > 50) {
      this.nameError = "名前は50文字以内で入力してください";
    } else {
      this.nameError = "";
    }
    // 投稿内容の入力チェック
    if (this.commentContent === "") {
      this.contentError = "コメント内容を入力してください";
    } else {
      this.contentError = "";
    }
    if (this.nameError !== "" || this.contentError !== "") {
      return true;
    } else {
      return false;
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
