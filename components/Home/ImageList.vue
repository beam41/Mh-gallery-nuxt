<template>
  <div :v-if="images" class="container">
    <div v-for="image in images" :key="image.imgn" class="box">
      <img :src="'http://localhost:3000/img/' + image.imgn" :alt="image.imgn" />
      <h2>{{ image.name }}</h2>
      <p class="light">{{ image.prices[0].price | priceTxt }}</p>
      <button class="btn" @click="imgClick(image.imgn)">View</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ImageList',
  filters: {
    priceTxt(price: number) {
      if (price === 0) return 'Name Your Own Price'
      else return '$' + price + '+'
    }
  },
  data: () => ({
    images: null
  }),
  created() {
    this.$getList().then((val) => {
      this.images = val
    })
  },
  methods: {
    imgClick(imgn: string) {
      this.$router.push('image/' + imgn)
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 5em 1em 50px 1em;
  justify-content: center;
}

.box {
  width: 100%;

  box-sizing: border-box;

  margin: 0;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 100%;
    margin: 0 0 0.5em;
  }

  &:after {
    display: table;
    clear: both;
    content: '';
  }

  & h2 {
    font-size: 1.75em;
  }

  & p,
  & h2 {
    margin: 0.5em 0;
  }
}

@media (min-width: 800px) {
  .box {
    width: 50%;
  }
}

@media (min-width: 1250px) {
  .box {
    width: 33.33333%;
  }
}
</style>
