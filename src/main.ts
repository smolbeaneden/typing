import './style.css';
import $ from "jquery";
import 'vanilla-javascript';

class Controller {
    txt: HTMLElement;           // sentence or paragraph
    status: HTMLElement;        //is there a mistake
    input: string = "";         //user's input
    textArea: HTMLElement;      //element of text input area
    spanArray: Array<string>;   //split the letters in the paragraph(txt)

    constructor() {
        this.txt = <HTMLElement>document.getElementById("text");
        this.status = <HTMLElement>document.getElementById("status");
        this.textArea = <HTMLElement>document.getElementById("inputArea");

        $('#inputArea').val('');      //empty text area
        this.status.innerHTML = "Keep Going!";
        this.status.style.backgroundColor = "green";

        let text = "Hello World";
        this.txt.innerHTML = "";
        this.spanArray = [];
        for (let i = 0; i < text.length; i++) {
            this.spanArray.push(this.span("#8c8c8c", text[i]));
        }
        this.defineText();

        this.textArea.addEventListener('input', () => {
            this.input = String($('#inputArea').val())
            this.processCurrentInput();
            this.defineText();
        });
    }

    defineText() {
        this.txt.innerHTML = "";
        for (let i = 0; i < this.spanArray.length; i++) {
            this.txt.innerHTML += this.spanArray[i];
        }
    }

    processCurrentInput(): void {
        this.status.innerHTML = "Keep Going!";
        this.status.style.backgroundColor = "green";
        console.log(this.txt.innerText.length);
        console.log(this.input.length);

        if (this.input.length == this.txt.innerText.length) {
            if (this.input == this.txt.innerText) {
                this.status.innerHTML = "Well Done!";
                this.status.style.backgroundColor = "#c87ec7";
                this.disablePrompt();
            }
        }

        for (let i = 0; i < this.txt.innerText.length; i++) {
            this.spanArray[i] = this.span("#8c8c8c", this.txt.innerText[i]);

            if (i < this.input.length) {
                if (this.input[i] !== this.txt.innerText[i]) {
                    this.status.innerHTML = "Wrong!";
                    this.status.style.backgroundColor = "red";
                    this.spanArray[i] = this.span("red", this.txt.innerText[i]);
                } else if (this.input[i] == this.txt.innerText[i]) {
                    this.spanArray[i] = this.span("green", this.txt.innerText[i]);
                }
            }
        }
    }

    span(color: string, letter: string): string {
        return `<span style="color: ${color} ;">${letter}</span>`;
    }

    disablePrompt(): void {
        console.log("should be disabled");
        //continue
    }
}

function start(): void {
    new Controller();
}

document.getElementById('newGame')?.addEventListener('click', ()=>{start()})
start();