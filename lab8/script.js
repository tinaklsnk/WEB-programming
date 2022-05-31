(function (){
    var names = new Array();
    names[0]="Emma";
    names[1]="Jack";
    names[2]="Alex";
    names[3]="Joanna";
    names[4]="Kate";
    console.log(names);
    for (var name in names) {
        if (names[name].charAt(0) === "J" || names[name].charAt(0) === "j") {
            goodbye(names[name]);
        }
        else {
            hello(names[name]);
        }
    }
    longestWord(names);
})();

function longestWord (arr) {
    var l = arr[0].length;
    for (var name in arr) {
        if(arr[name].length > l) {
            l = arr[name].length;
        }
    }
    for (var name in arr) {
        if(arr[name].length == l) {
            console.log("The longest name(s): " + arr[name] + " ");
        }
    }
}

