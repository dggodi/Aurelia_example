<template>
fdg
<div class="input-group user-space">

        <span class="input-group-addon" >
            Dow Authors
        </span>
        <input type="text" class="form-control" value.bind="name" />
        <span class="input-group-btn">
            <button type="button" class="btn btn-primary btn-block" click.trigger="openModal()">add</button>
        </span>

    </div>

    <div id="user-space">
        <div repeat.for="author of authors">
            <button type="button" class="btn btn-default btn-xs" >
                <span class="glyphicon glyphicon-remove"></span>
            </button>${author.LastName}, ${author.FirstName} - ${author.DowId}
        </div>
    </div>
    
    <button click.delegate="cancel()">cancel</button>
    
    ${message}
</template>


import {inject} from "aurelia-framework"
import {RequestTableController} from "./requestTableController"
import {Timer} from "./timer"

@inject(RequestTableController) 
export class App {

    timeoutObj = new Timer(1);

    message = "";
    
    constructor(data) {
        this.data = data;
    }

    openModal(){
        $("#btnAdd").prop('disabled', 'disabled'); 
        this.message="";
        
        this.timeoutObj.start(); 
		
        this.data.getList() 
          .then(authors => {
              if(!this.timeoutObj.isTimeout())
                  this.authors = authors;
              else    
                  this.message="Refine your search";
                
              $("#btnAdd").removeAttr('disabled');
          }) 
          .catch(error => {
              $("#btnAdd").removeAttr('disabled');
              console.log("----- error getting user info -------------");
          });
    }
    
    cancel(){
        this.timeoutObj.cancel();
        console.log("cancel timer");
        $("#btnAdd").removeAttr('disabled');
    }
}

import { transient } from 'aurelia-framework';

@transient()
export class Timer {
   
   timerHandle;
   interval;
   duration;
   timeOut;
   timer;
   
   constructor(duration = 5){
      this.duration = duration;
      this.interval = duration;
   }
   
   start(){
        clearTimeout(this.timerHandle); 
        
        let timer = this.timer;
        let timerInterval = this.timerInterval();
        let duration = this.duration;
        this.timerHandle = new Promise(function(resolve, reject) {
        
            timer = setTimeout(() => {
                resolve(timerInterval);
            }, 1000 * duration); 
        
        });
   }
   
   cancel(){
      clearTimeout(this.timer);
      this.timeOut = true
   }
   
   isTimeout(){
     return this.timeOut;
   }
   
   timerInterval(){
        let counter = setInterval(()=>{
            this.interval--;
            if(this.interval <= 0){
                clearInterval(counter);
                this.timeOut = true;
            }
        }, 1000); 
    }
}


import {ElementData} from "./elementData"

export class RequestTableController{
    
    data;
    
    getList(){
            var promise = new Promise((resolve, reject) => {
      			if (!this.events) {
      				setTimeout(() => {
      					this.data = ElementData; 
      					
      					resolve(this.data);					
      				},5000); 
      			}
      			else {
      				resolve(this.data);
      			}
		    });
		
		    return promise;
    }
}

export var ElementData = [
  {Id:"nd208100", FirstName:"Kim", LastName:"Hott", Email:"hott@yahoo.com"}
];

// private functions ////////////////////////////////////////////////////////////

import {inject} from "aurelia-framework"
import {RequestTableController} from "./requestTableController"
import {Timer} from "./timer"

@inject(RequestTableController) 
export class App {

    timeoutObj = new Timer(1); 

    message = "";
    
    constructor(data) {
        this.data = data;
    }

    openModal(){
        $("#btnAdd").prop('disabled', 'disabled'); 
        this.message="";
        
        this.timeoutObj.start(); 
		
        this.data.getList() 
          .then(authors => {
              if(!this.timeoutObj.isTimeout())
                  this.authors = authors;
              else    
                  this.message="Refine your search";
                
              $("#btnAdd").removeAttr('disabled');
          }) 
          .catch(error => { 
              $("#btnAdd").removeAttr('disabled');
              console.log("----- error getting user info -------------");
          });
    }
    
    cancel(){
        this.timeoutObj.cancel();
        console.log("cancel timer");
        $("#btnAdd").removeAttr('disabled');
    }
}


import { transient } from 'aurelia-framework';

let timeOut = false;

function mytimer(ms) {
    let timer, promise;
    promise = new Promise(function(resolve, reject) {
        
            timer = setTimeout(() => {
                resolve(timerInterval(ms));
            }, 1000 * ms); 
        
        });
    
    return {promise:promise, cancel:function(){clearTimeout(timer);}}
}

function timerInterval(interval){
        let counter = setInterval(()=>{
            interval--;
            if(interval <= 0){
                clearInterval(counter);
                timeOut = true;
            } 
        }, 1000); 
    }

@transient()
export class Timer {
   
   timerHandle;
   duration;
   
   constructor(duration = 5){
      this.duration = duration;
   }
   
   start(){
        clearTimeout(this.timerHandle);
        this.timerHandle = mytimer(this.duration);
   }
   
   cancel(){
      clearTimeout(this.timerHandle);
      timeOut = true
   }
   
   isTimeout(){
     return timeOut;
   }
}