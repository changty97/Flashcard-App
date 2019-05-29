<template>
  <div>
    <ul>
    <li v-for="name in names">
      {{ name }}
    </li>
    </ul>
  </div>
</template>

<script>
import states from "../assets/data.json";
export default {
  name: "HelloWorld",
  computed: {
    names() {
      return states.accounts.map((item) => {
        return item.name;
      })
    }
  }
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
</style>
