import Vue from 'vue'
import Vuex from 'vuex'
import { Image } from '@/models/Image'

Vue.use(Vuex)

export const state = () => ({
  carts: [] as Image[]
})

export const mutations = {
  ADD_TO_CART(state, item: Image) {
    state.carts.push(item)
  },
  DEL_FROM_CART(state, index: number) {
    state.carts.splice(index, 1)
  },
  EDIT_VALID(state, { index, valid }) {
    Vue.set(state.carts, index, { ...state.carts[index], priceValid: valid })
  },
  EDIT_WILLBUY(state, { index, price }) {
    Vue.set(state.carts, index, { ...state.carts[index], willBuy: price })
  }
}

export const actions = {
  addItem({ commit }, item: Image) {
    commit('ADD_TO_CART', item)
  },
  delItem({ commit }, index: number) {
    commit('DEL_FROM_CART', index)
  },
  editPriceValid({ commit }, indexValid) {
    commit('EDIT_VALID', indexValid)
  },
  editWillBuy({ commit }, indexPrice) {
    commit('EDIT_WILLBUY', indexPrice)
  }
}

export const getters = {
  getItems: (state) => {
    return state.carts
  },
  sumTotal: (state) => {
    return state.carts.reduce(
      (acc: number, curr: Image) => acc + curr.willBuy,
      0
    )
  },
  checkValid: (state) => {
    if (state.carts.length > 0) {
      return state.carts.reduce((acc: boolean, curr: Image) => {
        if (acc) return curr.priceValid
        return false
      }, true)
    }
    return false
  }
}
