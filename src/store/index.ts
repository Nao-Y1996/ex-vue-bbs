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
      const articleId = state.articles.length + 1;
      const article = new Article(articleId, payload.name, payload.content, []);
      state.articles.splice(0, 0, article);
      console.log(state.articles);
    },
  },
  getters: {
    getAllArticles(state) {
      return state.articles;
    },
  },
  modules: {},
});
