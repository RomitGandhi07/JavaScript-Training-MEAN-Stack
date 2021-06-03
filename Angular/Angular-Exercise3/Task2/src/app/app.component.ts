import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NumberInputComponent } from './number-input/number-input.component';
import { TextInputComponent } from './text-input/text-input.component';
import { TextareaInputComponent } from './textarea-input/textarea-input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('inputs',{read: ViewContainerRef}) inputs;

  constructor(private resolver: ComponentFactoryResolver){}

  // This function is responsible for generate random Id
  generateRandomId(){
    const id = Math.random().toString(36).substring(5);
    return id;
  }

  // This function is responsible for adding number input
  addNumberInput(){
    const numberInputFactory=this.resolver.resolveComponentFactory(NumberInputComponent);
    const numerInputRef=this.inputs.createComponent(numberInputFactory);
    numerInputRef.instance.componentId=this.generateRandomId();
  }

  // This function is responsible for adding text input
  addTextInput(){
    const textInputFactory=this.resolver.resolveComponentFactory(TextInputComponent);
    const textInputRef=this.inputs.createComponent(textInputFactory);
    textInputRef.instance.componentId=this.generateRandomId();
  }

  // This function is responsible for adding textarea input
  addTextareaInput(){
    const textareaInputFactory=this.resolver.resolveComponentFactory(TextareaInputComponent);
    const textareaInputRef=this.inputs.createComponent(textareaInputFactory);
    textareaInputRef.instance.componentId=this.generateRandomId();
  }
}
