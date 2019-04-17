
//Each function uses a switch statement to select what cipher the user wants from a drop down menu
function encryption() {    
switch(document.getElementById("methods").value) {
    case "caesar":
        var str = document.getElementById("message").value;
        var output = "";
        var shift = parseInt(document.getElementById("key").value);
        
         //loop through each character entered
        for (var i = 0; i < str.length; i ++) {
            var x = str[i];
            //get character code of each letter
            var code = str.charCodeAt(i);
            
            //uppercase letters
            if ((code >= 65) && (code <= 90))
                x = String.fromCharCode((code - 65 + shift) % 26 + 65);
               
            //lowercase letters
            else if ((code >= 97) && (code <= 122) )
                x = String.fromCharCode((code - 97 + shift) % 26 + 97);

            output += x;
        }
        document.getElementById("message").value=output;
        break;
    }
}


function base_64(){
switch(document.getElementById("methods").value){
    case "base-64":    
        var input = document.getElementById("message");

        output = window.btoa(input.value); //Create base-64 ASCII string
        
        document.getElementById("message").value = output;
        break;
    }
}


function morse(){
switch(document.getElementById("methods").value){
    case "morse":
        var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ .,?:-!&'@()=:/+\"0123456789$_;";
        
        var morseletters = new Array (
        ".-","-...","-.-.","-..",".","..-.",
        "--.","....","..",".---","-.-",".-..",
        "--","-.","---",".--.","--.-",".-.",
        "...","-","..-","...-",".--","-..-",
        "-.--","--..",".-","-...","-.-.","-..",
        ".","..-.","--.","....","..",".---",
        "-.-",".-..","--","-.","---",".--.",
        "--.-",".-.","...","-","..-","...-",
        ".--","-..-","-.--","--.."," ",".-.-.-",
        "--..--","..--..","---...","-....-","-.-.--",".-...",".----.",".--.-.","-.--.-","-.--.","-...-","---...","-..-.",".-.-.",".-..-.","-----",".----","..---","...--","....-",".....","-....","--...","---..","----.","...-..-","..--.-","-.-.-");
        
        var x = document.getElementById("message").value;
        var output = "";
        
        for(count = 0; count < x.length; count++) {
        Char = x.charAt(count);
            for (i = 0; i < letters.length; i++) {
            if (Char == letters.charAt(i)) {
        output += morseletters[i] + " ";    
            }
        }
    }
    document.getElementById("message").value = output;
    break;
    }
}