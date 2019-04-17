
//Each function uses a switch statement to select what cipher the user wants from a drop down menu
function encryption() {    
switch(document.getElementById("methods").value) {
    case "caesar":
        var str = document.getElementById("plain_text").value;
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
        document.getElementById("text_encoded").value=output;
        break;
    }
}


function decryption(){
switch(document.getElementById("methods").value) {
    case "caesar":
        var str = document.getElementById("text_encoded").value;
        var output = "";
        var shift = parseInt(document.getElementById("key").value);
        
        //loop through each character entered
        for (var i = 0; i < str.length; i ++) {
            var x = str[i];
            //get character code of each letter
            var unicode = str.charCodeAt(i);
            
            //uppercase letters
            if ((unicode >= 65) && (unicode <= 90))
                x = String.fromCharCode((unicode - 65 + 26 - shift) % 26 + 65);
            
            //lowercase letters
            else if ((unicode >= 97) && (unicode <= 122))
                x = String.fromCharCode((unicode - 97 + 26 - shift) % 26 + 97);

            output += x;
        }
        document.getElementById("text_decoded").value=output;
        break;
    }
}

function base_64(){
switch(document.getElementById("methods").value){
    case "base-64":    
        var input = document.getElementById("plain_text");

        output = window.btoa(input.value); //Create base-64 ASCII string
        
        document.getElementById("text_encoded").value = output;
        break;
    }
}

function dec_base_64(){
switch(document.getElementById("methods").value){
    case "base-64":    
        var input = document.getElementById("text_encoded");

        output = window.atob(input.value);// Decode string which has been encoded with base-64
        
        document.getElementById("text_decoded").value = output;
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
        
        var x = document.getElementById("plain_text").value;
        var output = "";
        
        for(count = 0; count < x.length; count++) {
        Char = x.charAt(count);
            for (i = 0; i < letters.length; i++) {
            if (Char == letters.charAt(i)) {
        output += morseletters[i] + " ";    
            }
        }
    }
    document.getElementById("text_encoded").value = output;
    break;
    }
}

function decodemorse(){
switch(document.getElementById("methods").value){
    case "morse":
        var morse_code = document.getElementById("text_encoded").value;
        var decoded_array = [];
        var morseletters = [".-","-...","-.-.","-..",".","..-.",
        "--.","....","..",".---","-.-",".-..",
        "--","-.","---",".--.","--.-",".-.",
        "...","-","..-","...-",".--","-..-",
        "-.--","--..",".-","-..." ,"-.-." ,"-.."
        ,"." ,"..-.","--." ,"....",".." ,".---",
        "-.-", ".-..","--","-.","---",".--.","--.-",
        ".-.","...","-","..-","...-",".--","-..-",
        "-.--", "--.."," ","--..--","..--..","---...",
        "-....-","-.-.--",".----","..---","...--", 
        "....-",".....","-....","--...","---..","----.","-----",
        "..--..",".----.",".-...",".--.-.","-.--.-","-.--.","-...-",".-.-.-",".-.-."];

        var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ",",","?",":","-","!","1","2","3","4","5","6","7","8","9","0","\"","\'","&","@",")","(","=",".","+"];

        x = morse_code.split(" ");
        for (var i = 0; i < x.length; i++){
            decoded_array.push(letters[morseletters.indexOf(x[i])]);
            var output = decoded_array.toString();
            output = output.split(',').join('');//split the line at the comma and replace with empty string
        }
        document.getElementById("text_decoded").value = output;
        break;
        }
    }