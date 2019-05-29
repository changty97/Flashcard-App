<template>
  <div>
    <ul>
    <!-- <li v-for="word in words">
      {{ word }}
    </li> -->
    <li v-if="current == 0">{{ current = gloss.length-1 }}</li>
    <li v-else="current"></li>
    </ul>
  </div>
</template>

<script>
import gloss from "../assets/glossarydev.json";
export default {
  word: "gloss",
  def: "gloss",
  data: {
    current: 0
  },
  computed: {
    words() {
      return gloss.glossary.map((item) => {
        return item.word;
      })
    },
    defs() {
      return gloss.glossary.map((item) => {
        return item.def;
      })
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}