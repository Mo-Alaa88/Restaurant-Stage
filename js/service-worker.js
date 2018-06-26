// declare V staticCachName 
var staticCachName = "restraunt-cahce-1";
// my URl cache  //caching all my folders
let urlToCache = [
	"/",
	"./restaurant.html",
	"./css/styles.css",
	"./img/1.jpg",
	"./img/2.jpg",
	"./img/3.jpg",
	"./img/4.jpg",
	"./img/5.jpg",
	"./img/6.jpg",
	"./img/7.jpg",
	"./img/8.jpg",
	"./img/9.jpg",
	"./img/10.jpg",
	"./data/restaurant.json",
	"./js/main.js",
	"./js/dbhelper.js",
	"./js/restaurant_info.js",
];
// if install will be waiting and open the staticCachName then return urlToCache
// add urls to the cache directory
self.addEventListener("install",function(e){
	e.waitUntil(
		caches.open(staticCachName).then(function(cache) {
			console.log(cache);
			return cache.addAll(urlToCache);
		}).catch(err=>{
			console.log(err);
		})
	);
});
// if active will be caches keys then promise all for cache names and delete the old cache and creat a new cache
// change the cache name by defulte
self.addEventListener("activate",function(e){
	e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames.filter(function (cacheName) {
					return cacheName.startsWith("restaurant-") && cacheName != staticCachName;
				}).map(function (cacheName) {
					return caches.delete(cacheName);
				})
			)
		})
	)
});
// if request to my page use caches then retrn my fetch request my page
self.addEventListener("fetch",function(e){
	e.respondWith( caches.match(e.request).then (function (respose) {
		return response || fetch(e.request);
	})
);
	// console.log("[ServiceWorker] Fetching",e.request.url);
});