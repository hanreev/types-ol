import WMSCapabilities from 'ol/format/WMSCapabilities';

const parser = new WMSCapabilities();

fetch('data/ogcsample.xml').then((response) => {
  return response.text();
}).then((text) => {
  const result = parser.read(text);
  document.getElementById('log').innerText = JSON.stringify(result, null, 2);
});
