<template>
  <div class="cart_item">
    <img :src="'http://localhost:3000/img/' + item.imgn" />
    <span class="info">
      <h3>{{ item.name }}</h3>
      <div class="selectbox">
        <select v-model="selecting">
          <option
            v-for="(price, i) in item.prices"
            :key="item.imgn + i"
            :value="i"
            >{{ price.type | capital }} – ${{ price.price }}+</option
          >
        </select>
        <label>$</label>
        <input
          v-model="price"
          type="text"
          :class="item.priceValid ? '' : 'warn'"
        />
      </div>
      <div class="qty">
        <label>Qty</label>
        <input v-model="qty" type="text" />
      </div>
      <p class="sum">= ${{ sumPrice }}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        @click="delItem()"
      >
        <path
          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'CartItem',
  filters: {
    capital(value: string) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    selecting: 0,
    minPrice: 0,
    qty: 1,
    price: 0
  }),
  computed: {
    sumPrice(): number {
      const price = this.qty * this.price
      if (this.$store.getters.getItems[this.index].willBuy !== price) {
        this.$store.dispatch('editWillBuy', { index: this.index, price })
      }
      return price
    }
  },
  watch: {
    minPrice(val) {
      if (+this.price < +val) this.price = +val
    },
    price(val) {
      this.$store.dispatch('editPriceValid', {
        index: this.index,
        valid: !(+val < +this.minPrice)
      })
    },
    selecting(val) {
      this.minPrice = this.item.prices[val].price
    }
  },
  created() {
    this.$store.dispatch('editPriceValid', { index: this.index, valid: true })
    this.minPrice = this.item.prices[0].price
  },
  methods: {
    delItem() {
      this.$store.dispatch('delItem', this.index)
    }
  }
})
</script>

<style lang="scss" scoped>
.cart_item {
  display: flex;
  background: rgb(241, 241, 241);
  width: 100%;
}

img {
  width: 300px;
}

@media (max-width: 750px) {
  .cart_item {
    flex-direction: column;
  }

  img {
    width: 100%;
  }
}

.warn {
  background: #ffcdd2;
}

.info {
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & input {
    width: 2em;
  }

  & label {
    margin-right: 5px;
  }

  & > * {
    margin: 0;
  }

  & > h3 {
    font-size: 2em;
  }

  & > svg {
    fill: #cb3333;
    transition-duration: 250ms;

    &:hover {
      fill: #ef5350;
    }
  }
}

.selectbox {
  & > select {
    margin-right: 10px;
  }
}

.sum {
  font-size: 1.5em;
}
</style>
