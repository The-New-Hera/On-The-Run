// Choose a cache name
const cacheName = 'cache-v1'

// List the files to precache
const precacheResources = [
  './',
  './index.html',
  './main.css',
  './assets/logo/128.png',
  './assets/logo/192.png',
  './assets/logo/256.png',
  './assets/logo/384.png',
  './assets/logo/512.png',
  './assets/alienrosa.png',
  './assets/alienverde.png',
  './assets/baixo.png',
  './assets/mapa.json',
  './assets/blocoescuro.png',
  './assets/blocoroxo.png',
  './assets/botao.png',
  './assets/botaodois.png',
  './assets/botaotres.png',
  './assets/capa.png',
  './assets/cima.png',
  './assets/clique.mp3',
  './assets/credito.mp3',
  './assets/direita.png',
  './assets/erro.mp3',
  './assets/esquerda.png',
  './assets/finalfeliz.png',
  './assets/finaltriste.png',
  './assets/fogo.png',
  './assets/metal.mp3',
  './assets/moeda.png',
  './assets/nave.png',
  './assets/primeirolaser.png',
  './assets/segundolaser.png',
  './assets/queda-energia.mp3',
  './assets/somdasvigas.mp3',
  './assets/somdepulo.mp3',
  './assets/somdobotao.mp3',
  './assets/somdolaser.mp3',
  './assets/somfeliz.mp3',
  './assets/somtriste.mp3',
  './assets/vigagrande.png',
  './assets/vigapequena.png',
  './assets/tela-cheia.png',
  './assets/trilha.mp3',
  './js/index.js',
  './js/abertura.js',
  './js/axios.min.js',
  './js/cenafinal.js',
  './js/config.js',
  './js/finalfeliz.js',
  './js/finaltriste.js',
  './js/phaser.min.js',
  './js/principal.js',
  './js/sala.js'
]

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener('install', (event) => {
  console.log('Service worker install event!')
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(precacheResources)))
})

self.addEventListener('activate', (event) => {
  console.log('Service worker activate event!')
})

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})