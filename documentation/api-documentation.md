# Image Carousel API

The image carousel API is accessible at the url: `/api/:id` where `:id` is a parameter of value 0 to 99.

GET requests to this URL receive JSON data that provides urls for all the images in one real estate listing's image carousel. A GET request to the API should return a JSON object with `id`, `photos`, `floorPlan` and `map` properties. Each object should have a `floorPlan` and `map` url. The length of  `photos` will vary per listing but there should be at least one photo.

Note that the `id` number of a listing roughly corresponds to its market value. Lower `id` numbers will have less photos of fairly basic properties, higher numbers will have more photos of more glamourous listings.

Other properties may appear in the returned JSON but they are not supported.

An example response for a low `id`:

```bash
$ curl http://localhost:3010/api/0
{
  id: 0,

  photos: [
    'https://www.elliman.com/img/19c74783b315fe1a01465c90eea1876d830b02b7+440++1'
  ],

  floorPlan:
    'https://www.elliman.com/img/c18ff17723d5ad408faddbe1b57ddb537df8161e+440++1',

  map:
    'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-73.95432,40.71193,12.5,0,0/1148x800?access_token='
}
```

An example response for a higher `id`:

```bash
$ curl http://localhost:3010/api/99
{
  id: 99,

  photos: [
    'https://www.elliman.com/img/376f3037129071c0616a96acd7cda037a8f304ce+440++1',
    'https://www.elliman.com/img/9f9988fcd1caed1d58bd05d994b67792287502f5+440++1',
    'https://www.elliman.com/img/9c3c16777305eed46b04e44ca3a424986e114fe2+440++1',
    'https://www.elliman.com/img/76227b8f712596380e0a692d38baa033edb99ad3+440++1',
    'https://www.elliman.com/img/8281205cfc7a7b095770242fa2d610a764520345+440++1',
    'https://www.elliman.com/img/9e9a2bfa118dff9adb48ca8c6be146d200ea48f4+440++1',
    'https://www.elliman.com/img/602bd460e5b19ea76a396e26f647b12d342db919+440++1',
    'https://www.elliman.com/img/ca7283b3a94893afaf6b62d9119e7e4ffb41f985+440++1',
    'https://www.elliman.com/img/a663708e69f4e9aad5ac94183c39ef9046ac88ce+440++1',
    'https://www.elliman.com/img/7beab4bea025ec22978337dfb77ad2ea2f4f882b+440++1',
    'https://www.elliman.com/img/e4fcfc548a8502ccbaf1d7d973add55d4c3ac318+440++1',
    'https://www.elliman.com/img/d706a52cbfbd0faa1d028b00e118e26509c7d214+440++1',
    'https://www.elliman.com/img/35ac94aa5d72cae0e42b715e430f410e2554e8f8+440++1',
    'https://www.elliman.com/img/75a962898c34ff30379bd6cd610d7a11348488a4+440++1',
    'https://www.elliman.com/img/a8050b5d35f342c729c71ea813493cdac078ca09+440++1'
  ],

  map:
    'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/-74.02046,40.62848,12.5,0,0/1148x800?access_token=',

  floorPlan:
    'https://www.elliman.com/img/92364f3b310162f41de8ba1a97f816065efccce7+440++1'
}
```

