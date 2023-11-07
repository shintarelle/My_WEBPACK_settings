import "../sass/index.scss"
const hello = require('./hello.js')

import eye from '../assets/eye.png'   //картинку импортируем через js файл

const mainImage = document.getElementById("mainImage") //находим элемент по ид
mainImage.src = eye                       //полю src присваиваем картинку
