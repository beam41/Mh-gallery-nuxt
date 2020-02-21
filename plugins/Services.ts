import axios from 'axios'
import { Image } from '@/models/Image'
import Vue from 'vue'

const app = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.prototype.$getList = async (): Promise<Image[]> => {
  return app.get('/imgs').then((val) => val.data)
}

Vue.prototype.$getImageInfo = async (name: string): Promise<Image> => {
  const spl = name.split('.')
  return app.get(`/info/${spl[1]}/${spl[0]}`).then((val) => val.data)
}

Vue.prototype.$setDocName = (name: string): void => {
  document.title = name
}
