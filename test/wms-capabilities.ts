import WMSCapabilities from 'ol/format/WMSCapabilities';

const parser = new WMSCapabilities();

fetch('data/ogcsample.xml')
    .then(response => {
        return response.text();
    })
    .then(text => {
        const result = parser.read(text);
        const logEl = document.getElementById('log');
        if (logEl) logEl.innerText = JSON.stringify(result, null, 2);
    });
