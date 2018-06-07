'use strict';

var boxes = document.getElementsByClassName('day');

for (var item of boxes) {
    let img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    img.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    img.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', chrome.extension.getURL('images/logo.jpg'));
    img.setAttribute('class', 'day');
    img.setAttribute('height', item.getAttribute('height'));
    img.setAttribute('width', item.getAttribute('width'));
    img.setAttribute('x', item.getAttribute('x'));
    img.setAttribute('y', item.getAttribute('y'));
    img.setAttribute('data-count', item.getAttribute('data-count'));
    img.setAttribute('data-date', item.getAttribute('data-date'));
    img.style.opacity = 0.95 - brightness(hexToRgb(item.getAttribute('fill')));
    item.replaceWith(img);
}

var legend = document.getElementsByClassName('legend');

for (var item of legend) {
    item.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        let el = document.createElement('li')
        el.style.backgroundImage = 'url(' + chrome.extension.getURL('images/logo.jpg') + ')';
        el.style.backgroundSize = '10px 10px';
        el.style.margin = '2px';
        el.style.opacity = ((50 * i) / 230) + 0.1;
        item.appendChild(el);
    }
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function brightness(c){
    return (c.r * c.r * 0.241 + c.g * c.g * 0.691 + c.b * c.b * 0.068) / 65535;
}
