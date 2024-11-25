const display = document.querySelector(".inbox .display");
const btns = document.querySelectorAll(".inbox .btn");

let lastInputWasSign = false;

btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.innerHTML != "C" && btn.innerHTML != "=" && btn.innerHTML != "←") {
            if (["+","-","*","/","^","%","."].includes(btn.innerHTML)) {
                if (display.innerHTML == "" || lastInputWasSign) {
                    return;
                } else {
                    display.innerHTML += btn.innerHTML;
                    lastInputWasSign = true;
                }
            } else {//for numbers
                display.innerHTML += btn.innerHTML;
                lastInputWasSign = false;
            }
        } else if (btn.innerHTML == "C") {
            display.innerHTML = "";
            lastInputWasSign = false;
        } else if (btn.innerHTML == "←") {
            if (["+","-","*","/","^","%","."].includes(display.innerHTML.slice(-1))) {
                lastInputWasSign = false;
            }
            display.innerHTML = display.innerHTML.slice(0, -1);
        } else if(btn.innerHTML =="="){
            try {
                let result = eval(display.innerHTML.replace('^', '**'));
                display.innerHTML = result.toString();
            } catch (e) {
                display.innerHTML = "Error";
            }
        }
    });
});


document.addEventListener("keydown", (e) => {
    let keyValue = e.key;
    if (keyValue >= 0 && keyValue <= 9) {
        display.innerHTML += keyValue;
        lastInputWasSign = false;
    } else if (["+","-","*","/","^","%","."].includes(keyValue)) {
        if (display.innerHTML == "" || lastInputWasSign) {
            return;
        } else {
            display.innerHTML += keyValue;
            lastInputWasSign = true;
        }
    } else if (keyValue == "Enter"||keyValue == "=") {
        try {
            let result = eval(display.innerHTML.replace('^', '**'));
            display.innerHTML = result.toString();
        } catch (e) {
            display.innerHTML = "Error";
        }
    } else if (keyValue == "Backspace") {
        if (["+","-","*","/","^","%","."].includes(display.innerHTML.slice(-1))) {
            lastInputWasSign = false;
        }
        display.innerHTML = display.innerHTML.slice(0, -1);
    } else if (keyValue == "Escape") {
        display.innerHTML = "";
        lastInputWasSign = false;
    }
});