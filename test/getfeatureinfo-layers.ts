import WMSGetFeatureInfo from 'ol/format/WMSGetFeatureInfo';

fetch('data/wmsgetfeatureinfo/osm-restaurant-hotel.xml').then((response) => {
  return response.text();
}).then((response) => {
  // this is the standard way to read the features
  const allFeatures = new WMSGetFeatureInfo().readFeatures(response);
  (document.getElementById('all') as HTMLElement).innerText = allFeatures.length.toString();

  // when specifying the 'layers' options, only the features of those
  // layers are returned by the format
  const hotelFeatures = new WMSGetFeatureInfo({
    layers: ['hotel']
  }).readFeatures(response);
  (document.getElementById('hotel') as HTMLElement).innerText = hotelFeatures.length.toString();

  const restaurantFeatures = new WMSGetFeatureInfo({
    layers: ['restaurant']
  }).readFeatures(response);
  (document.getElementById('restaurant') as HTMLElement).innerText = restaurantFeatures.length.toString();
});
