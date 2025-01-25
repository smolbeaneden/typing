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

        this.spanArray = [];

        $('#inputArea').val('');      //empty text area
        this.status.innerHTML = "Keep Going!";
        this.status.style.backgroundColor = "green";

        this.textArea.addEventListener('input', () => {
            this.input = String($('#inputArea').val())
            this.processCurrentInput();
            this.defineText();
        });
    }

    async generateText() {
        const response = await fetch('https://hipsum.co/api/?type=hipster&paras=1');
        const text = await response.json();
        this.txt.innerHTML = "";
        this.spanArray = [];
        for (let i = 0; i < text.length; i++) {
            this.spanArray.push(this.span("#5e5d5d", "none", text[i]));
        }
        this.defineText();
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
                this.disableTextArea();
            }
        }

        for (let i = 0; i < this.txt.innerText.length; i++) {
            this.spanArray[i] = this.span("#5e5d5d", "none", this.txt.innerText[i]);

            if (i < this.input.length) {
                if (this.input[i] !== this.txt.innerText[i]) {
                    this.status.innerHTML = "Wrong!";
                    this.status.style.backgroundColor = "red";
                    this.spanArray[i] = this.span("#d81919", "none", this.txt.innerText[i]);
                } else if (this.input[i] == this.txt.innerText[i]) {
                    this.spanArray[i] = this.span("white", "none", this.txt.innerText[i]);
                }
            }
        }
        if (this.input.length < this.txt.innerText.length) {
            this.spanArray[this.input.length] = this.span("#5e5d5d", "rgba(69,67,67,0.6)", this.txt.innerText[this.input.length]);
        }

    }

    span(color: string, bColor: string, char: string): string {
        return `<span style="color: ${color}; background-color: ${bColor}">${char}</span>`;
    }

    disableTextArea(): void {
        console.log("should be disabled");
        //continue
    }
}

async function start(): Promise<void> {
    const controller = new Controller();
    await controller.generateText();
}

document.getElementById('newGame')?.addEventListener('click', () => {
    start()
})
start();