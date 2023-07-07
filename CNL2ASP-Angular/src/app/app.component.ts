// app.component.ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  inputFormControl = new FormControl('');
  outputControl = new FormControl({ value: '', disabled: true }); // FormControl for the output textarea


  // a function to fetch from the api at localhost:3020 with /convert endpoint and the input as the body
  convert() {
    fetch('http://localhost:3020/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input: this.inputFormControl.value }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.outputControl.setValue(data.output);
      });
  }
}
