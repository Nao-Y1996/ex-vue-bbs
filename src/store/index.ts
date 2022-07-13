import { Article } from "@/types/article";
import { Comment } from "@/types/comment";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    articles: [
      new Article(3, "佐藤", "佐藤さんの記事", []),
      new Article(2, "山田", "山田さんの記事", [
        new Comment(13, "山崎", "山崎さんのコメント", 2),
      ]),
      new Article(1, "伊藤", "伊藤さんの記事", [
        new Comment(12, "鈴木", "鈴木さんのコメント", 1),
        new Comment(11, "吉田", "吉田さんのコメント", 1),
      ]),
    ],
  }, // end state
  actions: {},
  mutations: {
    createArticle(state, payload) {
      // すでに存在する記事IDの最大値+1を新たな記事IDとする
      const articleIdList = new Array<number>();
      for (const article of state.articles) {
        articleIdList.push(article.id);
      }
      const articleId = Math.max(...articleIdList) + 1;
      const article = new Article(articleId, payload.name, payload.content, []);
      state.articles.splice(0, 0, article);
      console.log(state.articles);
    },
    createComment(state, payload) {
      // すでに存在するコメントIDの最大値+1を新たなコメントIDとする
      const commentIdList = new Array<number>();
      for (const article of state.articles) {
        for (const comment of article.commentList) {
          commentIdList.push(comment.id);
        }
      }
      const commentId = Math.max(...commentIdList) + 1;
      // コメントを作成する
      const comment = new Comment(
        commentId,
        payload.commenterName,
        payload.commentContent,
        payload.articleId
      );
      // コメントをつける記事を取得する
      const article = state.articles.filter(
        (article) => article.id === payload.articleId
      )[0];
      // コメントを先頭に挿入する
      article.commentList.splice(0, 0, comment);
    },
    deleteArticleById(state, payload) {
      // 削除する記事のインデックスを取得する
      let articleIdx = 0;
      for (const [i, article] of state.articles.entries()) {
        if (article.id === payload.articleId) {
          articleIdx = i;
          break;
        }
      }
      // 記事を削除する
      state.articles.splice(articleIdx, 1);
    },
    deleteCommentById(state, payload) {
      // 削除するコメントがある記事のインデックスとその記事内のコメントのインデックスを取得する
      let articleIdx = 0;
      let commentIdx = 0;
      for (const [i, article] of state.articles.entries()) {
        for (const [j, comment] of article.commentList.entries()) {
          if (comment.id === payload.commentId) {
            articleIdx = i;
            commentIdx = j;
            break;
          }
        }
      }
      // コメントを削除する
      state.articles[articleIdx].commentList.splice(commentIdx, 1);
    },
  },
  getters: {
    getAllArticles(state) {
      return state.articles;
    },
  },
  modules: {},
});
