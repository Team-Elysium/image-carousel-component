import React from 'react';
import MainCarousel from './components/MainCarousel';
import ModalCarousel from './components/ModalCarousel';
import renderer from 'react-test-renderer';

let exampleProps = {
  photos: [
    'https://www.elliman.com/img/19c74783b315fe1a01465c90eea1876d830b02b7+440++1',
    'https://www.elliman.com/img/d9f471eee75f0efff643132176e6ad91c1543759+440++1',
    'https://www.elliman.com/img/6f61458bc9024c65822fb25371406b6aedcc65ec+440++1',
    'https://www.elliman.com/img/027fd7d7bcc449efe7db06303b41cb70868c24a4+440++1',
    'https://www.elliman.com/img/e80a6bd7ae21e46365477d83204c9bf639a9c84b+w+h+0',
    'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/url-https%3A%2F%2Fcdn-assets-s3.streeteasy.com%2Fassets%2Fmap%2Fstatic-map-marker%402x-9a7b6523f406fc1bca992bf7132b76f581228967ba388d2fea8aa517a7af579e.png%28-73.75849915%2C40.73730087%29%2Cpath-3%2B0066CC-0.6%2B000000-0.05%28ifvwFr%7DbaM%7CAvHhItm%40dMje%40xGra%40vHdTrB%60T%60E%7DA~PsFrOyDrFeBpGkDdWkOxWqQ%5C_P%7CAyRo%40mMkAiJuBoHyC%7DIiCiFmCyDkDeGmC_C%7BHwKmHqFiFuIgMyPsBuWuHa%40%60Hl%5DqPhArHfu%40cNjNgHax%40uSvHaCsLoPtFeJjDoAhF%29/-73.75849915,40.73730087,11/574x400@2x?access_token=pk.eyJ1Ijoic3RyZWV0ZWFzeSIsImEiOiJjajN5b2s0a24wMDJrMndueTVnZWQ4bG5tIn0.sTJOTNh0HQpknYMVjYKPDQ'
  ],
  map:
    'https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/url-https%3A%2F%2Fcdn-assets-s3.streeteasy.com%2Fassets%2Fmap%2Fstatic-map-marker%402x-9a7b6523f406fc1bca992bf7132b76f581228967ba388d2fea8aa517a7af579e.png%28-73.75849915%2C40.73730087%29%2Cpath-3%2B0066CC-0.6%2B000000-0.05%28ifvwFr%7DbaM%7CAvHhItm%40dMje%40xGra%40vHdTrB%60T%60E%7DA~PsFrOyDrFeBpGkDdWkOxWqQ%5C_P%7CAyRo%40mMkAiJuBoHyC%7DIiCiFmCyDkDeGmC_C%7BHwKmHqFiFuIgMyPsBuWuHa%40%60Hl%5DqPhArHfu%40cNjNgHax%40uSvHaCsLoPtFeJjDoAhF%29/-73.75849915,40.73730087,11/574x400@2x?access_token=pk.eyJ1Ijoic3RyZWV0ZWFzeSIsImEiOiJjajN5b2s0a24wMDJrMndueTVnZWQ4bG5tIn0.sTJOTNh0HQpknYMVjYKPDQ'
};

test('MainCarousel renders correctly', () => {
  const component = renderer.create(
    <MainCarousel
      photos={exampleProps.photos}
      map={exampleProps.map}
      modalToggleOn={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ModalCarousel renders correctly', () => {
  const component = renderer.create(
    <ModalCarousel
      photos={exampleProps.photos}
      map={exampleProps.map}
      modalToggleOff={() => {}}
      startImageIndex={null}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
