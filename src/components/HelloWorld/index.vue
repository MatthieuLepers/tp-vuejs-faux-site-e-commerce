<template>
  <div class="HelloWorld">
    <img src="../../../static/img/logo.png">
    <h1>{{ msg }}</h1>
    <section class="HelloWorldSection" v-for="(section, i) in sectionList" :key="i">
      <h2>{{ section.label }}</h2>
      <ul>
        <li v-for="(item, j) in section.items" :key="j">
          <a :href="item.url" target="_blank">
            {{ item.label }}
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      sectionList: [
        {
          label: 'Essential Links',
          items: [
            { label: 'Core Docs', url: 'https://vuejs.org' },
            { label: 'Forum', url: 'https://forum.vuejs.org' },
            { label: 'Community Chat', url: 'https://chat.vuejs.org' },
            { label: 'Twitter', url: 'https://twitter.com/vuejs' },
            { label: 'Docs for This Template', url: 'http://vuejs-templates.github.io/webpack/' },
          ],
        },
        {
          label: 'Ecosystem',
          items: [
            { label: 'vue-router', url: 'http://router.vuejs.org/' },
            { label: 'vuex', url: 'http://vuex.vuejs.org/' },
            { label: 'vue-loader', url: 'http://vue-loader.vuejs.org/' },
            { label: 'awesome-vue', url: 'https://github.com/vuejs/awesome-vue' },
            { label: 'vue-i18n', url: 'https://github.com/kazupon/vue-i18n' },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" src="./index.scss">
</style>
