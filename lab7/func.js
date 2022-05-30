console.log("Введіть значення та тип аргументів:\nleg - катет\nhypotenuse - гіпотенуза\nadjacent angle - прилеглий до катета кут\nopposite angle - протилежний до катета кут\nangle - один з двох гострих кутів (коли задана гіпотенуза)");

function triangle(arg1, type1, arg2, type2) {
  if (arg1 <= 0 || arg2 <= 0) {
    console.log("Zero or negative input")
    fail();
  }
  else if (type1 == "leg") {
    if (type2 == "leg") {
      var c = Math.sqrt(Math.pow(arg1, 2) + Math.pow(arg2, 2));
      var alpha = toDegrees(Math.atan(arg1 / arg2));
      var beta = toDegrees(Math.atan(arg2 / arg1));
      show(arg1, arg2, c, alpha, beta);
      success();
    }
    if (type2 == "hypotenuse") {
      if (arg2 > arg1)
      {
        var a = Math.sqrt(Math.pow(arg2, 2) - Math.pow(arg1, 2));
        var alpha = toDegrees(Math.atan(a / arg1));
        var beta = toDegrees(Math.atan(arg1 / a));
        show(a, arg1, arg2, alpha, beta);
        success();
      }
      else {
        console.log("Катет більший за гіпотенузу")
        fail();
      }
    }
    if (type2 == "adjacent angle") {
      if(arg2 >= 90){
        console.log("Кут тупий чи прямий");
        fail();
      } else {
        var a = arg1 * Math.tan(toRadians(arg2));
        var c = arg1 / Math.cos(toRadians(arg2));
        var beta = 90 - arg2;
        show(a, arg1, c, arg2, beta);
        success();
      }
    }
    if (type2 == "opposite angle") {
      if(arg2 >= 90){
        console.log("Кут тупий чи прямий");
        fail();
      } else {
        var c = arg1 / Math.sin(toRadians(arg2));
        var a = Math.sqrt(Math.pow(c, 2) - Math.pow(arg1, 2));
        var alpha = 90 - arg2;
        show(a, arg1, c, alpha, arg2);
        success();
      }
    }
  }
  else if (type1 == "hypotenuse") {
    if (type2 == "leg") {
      if (arg1 > arg2) {
        var a = Math.sqrt(Math.pow(arg1, 2) - Math.pow(arg2, 2));
        var alpha = toDegrees(Math.atan(a / arg2));
        var beta = toDegrees(Math.atan(arg2 / a));
        show(a, arg2, arg1, alpha, beta);
        success();
      }
      else {
        console.log("Катет більший за гіпотенузу")
        fail();
      }
    }
    else if (type2 == "angle") {
      if (arg2 >= 90){
        console.log("Кут тупий чи прямий");
        fail();
      } else {
        var alpha = 90 - arg2;
        var a = arg1 * Math.cos(toRadians(arg2));
        var b = arg1 * Math.sin(toRadians(arg2));
        show(a, b, arg1, alpha, arg2);
        success();
      }
    }
  }
  else if (type1 == "angle" && type2 == "hypotenuse") {
    if (arg1 >= 90){
      console.log("Кут тупий чи прямий");
      fail();
    } else {
      var alpha = 90 - arg1;
      var a = arg2 * Math.cos(toRadians(arg1));
      var b = arg2 * Math.sin(toRadians(arg1));
      show(a, b, arg2, alpha, arg1);
      success();
    }
  }
  else if (type2 == "leg") {
    if (type1 == "adjacent angle") {
      if(arg1 >= 90){
        console.log("Кут тупий чи прямий");
        fail();
      } else {
        var a = arg2 * Math.tan(toRadians(arg1));
        var c = arg2 / Math.cos(toRadians(arg1));
        var beta = 90 - arg1;
        show(a, arg2, c, arg1, beta);
        success();
      }
    }
    if (type1 == "opposite angle") {
      if(arg1 >= 90){
        console.log("Кут тупий чи прямий");
        fail();
      } else {
        var c = arg2 / Math.sin(toRadians(arg1));
        var a = Math.sqrt(Math.pow(c, 2) - Math.pow(arg2, 2));
        var alpha = 90 - arg1;
        show(a, arg2, c, alpha, arg1);
        success();
      }
    }
  }
  else {
    fail();
  }
}

function show (a, b, c, alpha, beta) {
  console.log("a: ", a);
  console.log("b: ", b);
  console.log("c: ", c);
  console.log("alpha: ", alpha);
  console.log("beta: ", beta);
}

function success() {
  console.log("success");
}

function fail() {
  console.log("failed");
}

function toDegrees(value) {
  return value * (180 / Math.PI);
}

function toRadians(value) {
  return value * (Math.PI / 180);
}