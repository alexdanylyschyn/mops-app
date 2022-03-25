import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'page-custom',
  templateUrl: 'custom.html'
})
export class Custom {

  public form   : FormGroup;

  options;

  delay = 700;
  clicks = 0;
  timer = null;
  night = null;

  constructor(public navCtrl: NavController, private _FB: FormBuilder) {
    this.form = this._FB.group({
      name: ['', Validators.required],
      options: this._FB.array([
         this.initOptionFields()
      ])
   });
  }

  initOptionFields() : FormGroup
  {
     return this._FB.group({
        name : ['', Validators.required]
     });
  }

  addNewInputField() : void
  {
     const control = <FormArray>this.form.controls.options;
     control.push(this.initOptionFields());
  }

  removeInputField(i : number) : void
  {
     const control = <FormArray>this.form.controls.options;
     control.removeAt(i);
  }

  manage(val : any) : void
  {

    console.log(val);

     this.options = val;

    console.log(this.options);

     this.reset();
  }

  wakeUp(event) {

  	let that = this;

  	let eyeInit = function(switchit:string) {
  		that.toggleEyes(switchit);
  	}

  	this.night = setTimeout(function() {
  		eyeInit('close');
  	},15000);

  	this.clicks++;  //count clicks

        if(this.clicks === 1) {

            this.timer = setTimeout(function() {
            	
            		eyeInit('open'); 
            	

                this.clicks = 0;             //after action performed, reset counter

            }, this.delay);

        } else {

        	let message = <HTMLElement> document.querySelector('.message');

        	clearTimeout(this.timer);    //prevent single-click action

            this.toggleEyes('open'); 
            

            document.querySelector('#mops-frame-1').classList.add('hide');
            document.querySelector('#mops-frame-2').classList.add('speak');
            document.querySelector('#bubble-wrap').classList.remove('hide');

            setTimeout(function() {

            	document.querySelector('#mops-frame-1').classList.remove('hide');
            	document.querySelector('#mops-frame-2').classList.remove('speak');
            	document.querySelector('#bubble-wrap').classList.add('hide');

            }, 1000);

            message.innerHTML = this.decide();

            this.clicks = 0;             //after action performed, reset counter
        }

  }

  toggleEyes(switchit: string) {

  	let mops = <HTMLElement> document.querySelector('#mops-frame-1');
  	if(  switchit == "close" && mops.classList.contains('awake')) {
            		
	  	mops.classList.remove('awake');
	  	(<HTMLElement>document.querySelector('#sleepy')).style.opacity = "1"; 
  	} else {
  		if( !mops.classList.contains('awake')) {
  			mops.classList.add('awake');
	  		(<HTMLElement>document.querySelector('#sleepy')).style.opacity = "0"; 
  		}
  	}

  	return;
  }

  decide() {

  	let choice = Math.floor(Math.random() * Math.floor(this.options.options.length));

    console.log(choice);

    return this.options.options[choice].name;
  }

  reset() {
     document.querySelector('#decide-wrap').classList.toggle('hidden');
     document.querySelector('#mops-form').classList.toggle('hidden');
  }
}
