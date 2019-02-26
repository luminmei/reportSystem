function randomColor() {
  var red = Math.random() * 255;
  var green = Math.random() * 255;
  var blue =  Math.random() * 255;
  return "rgb("+red+","+green+","+ blue +")"
}
function randomSize() {
  var size = (Math.random() * 20 + 16) + "px";
  return size
}