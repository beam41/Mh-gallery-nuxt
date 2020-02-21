<template>
  <div class="Home f-nav">
    <div class="jumbotron">
      <h1>Meehoi Gallery</h1>
    </div>
    <ImageList />
  </div>
</template>

<script>
import Vue from 'vue'
import ImageList from '@/components/Home/ImageList.vue'

export default Vue.extend({
  name: 'Home',
  components: { ImageList },
  created() {
    this.$setDocName('Meehoi Gallery')
  }
})
</script>

<style lang="scss" scoped>
.jumbotron {
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)),
    url('http://localhost:3000/img/DSC06153.jpg') no-repeat center/cover;
  display: flex;
  align-items: center;
  justify-content: center;

  & h1 {
    font-size: 5rem;
    color: white;
  }
}
</style>
