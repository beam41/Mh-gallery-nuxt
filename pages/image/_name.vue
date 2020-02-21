<template>
  <div class="imgpage f-nav">
    <div class="im">
      <img :src="'http://localhost:3000/img/' + imgName" :alt="imgName" />
    </div>
    <div v-if="imgInfo">
      <h2>{{ imgInfo.name }}</h2>
      <div class="container">
        <div class="info">
          <h3>Info</h3>
          <p>
            <strong>Camera Maker:</strong>
            {{ imgInfo.make }}
          </p>
          <p>
            <strong>Camera Model:</strong>
            {{ imgInfo.model }}
          </p>
          <p>
            <strong>Lens:</strong>
            {{ imgInfo.lens }}
          </p>
          <p>
            <strong>Focal length:</strong>
            {{ imgInfo.focal }} mm
          </p>
          <p>
            <strong>Exposure:</strong>
            {{ imgInfo.exposure }} sec
          </p>
          <p>
            <strong>F-stop:</strong>
            ƒ/{{ imgInfo.fstop }}
          </p>
          <p>
            <strong>ISO:</strong>
            {{ imgInfo.iso }}
          </p>
        </div>
        <div class="price">
          <h3>Price</h3>
          <p v-for="price in imgInfo.prices" :key="price.type">
            <strong>{{ price.type | capital }}</strong>
            – ${{ price.price }}+
          </p>
          <p>
            <i>Free Shipping</i>
          </p>
          <button class="btn" @click="addToCart(imgInfo)">
            <transition name="popin">
              <span v-if="show" class="added">Added!</span>
            </transition>
            Add To cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Image } from '@/models/Image'

export default Vue.extend({
  name: 'ImageView',
  filters: {
    capital(value: string) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data: () => ({
    imgInfo: null,
    show: false,
    currShowTO: null
  }),
  computed: {
    imgName() {
      return this.$route.params.name
    }
  },
  created() {
    this.$setDocName('Meehoi Gallery — ' + this.imgName)
    this.$getImageInfo(this.imgName).then((val) => {
      this.imgInfo = val
      this.$setDocName('Meehoi Gallery — ' + val.name)
    })
  },
  methods: {
    addToCart(img: Image) {
      if (this.currShowTO) clearTimeout(this.currShowTO)
      this.show = true
      this.currShowTO = setTimeout(() => {
        this.show = false
      }, 1000)

      this.$store.dispatch('addItem', img)
    }
  }
})
</script>

<style lang="scss" scoped>
p,
h2,
h3 {
  margin: 0.5em 0;
}

h2 {
  font-size: 3rem;
  text-align: center;
}

h3 {
  font-size: 1.75rem;
}

.im {
  display: flex;
  justify-content: center;
}

img {
  width: 1000px;
  max-height: 100vh;
  object-fit: cover;
}

.container {
  margin: auto;
  width: 1000px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;

  & > div {
    padding: 0 20px;
  }
}

.price {
  text-align: right;
}

@media (max-width: 1000px) {
  img,
  .container {
    width: 100vw;
  }
}

@media (max-width: 750px) {
  .container {
    flex-direction: column;
    justify-content: center;
  }
}

.added {
  transform: translate(12px, -40px);
  position: absolute;
  color: white;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 10px;
  border-radius: 5px;
  opacity: 100%;
}

.popin-enter-active,
.popin-leave-active {
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.popin-enter,
.popin-leave-to {
  opacity: 0%;
  transform: translate(12px, 0);
}
</style>
