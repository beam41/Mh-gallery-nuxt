<template>
  <div class="cart_list">
    <div v-for="(item, index) in items" :key="item.imgn + index" class="cart_i">
      <CartItem :item="item" :index="index" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CartItem from './CartItem.vue'
import { Image } from '@/models/Image'
export default Vue.extend({
  name: 'CartList',
  components: {
    CartItem
  },
  computed: {
    items(): Image[] {
      return this.$store.getters.getItems
    }
  }
})
</script>

<style lang="scss" scoped>
.cart_list {
  height: calc(100vh - 265px);
  overflow-y: scroll;
}
.cart_i {
  margin-bottom: 10px;
}
</style>
