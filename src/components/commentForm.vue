<template>
  <div>
    <form action="">
      <label for="commenterName">コメント者名</label>
      <input
        type="text"
        name=""
        id="commenterName"
        v-model="commenterName"
      /><br />
      <label for="commentContent">コメント内容</label><br />
      <textarea
        name=""
        id=""
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
export default class CommentForm extends Vue {
  // 記事ID
  @Prop()
  private articleId!: number;
  // コメント者名
  private commenterName = "";
  // コメント内容
  private commentContent = "";

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
}
</script>

<style scoped></style>
