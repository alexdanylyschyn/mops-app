import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  delay = 700;
  clicks = 0;
  timer = null;
  night = null;

  constructor(public navCtrl: NavController) {
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

  	let choice = Math.floor(Math.random() * Math.floor(100));

  	if( choice < 49 ) {
  		return "Ja";
  	} else if( choice > 48 && choice < 99) {
  		return "Nein";
  	} else {
  		return "Vielleicht";
  	}

  }
}
