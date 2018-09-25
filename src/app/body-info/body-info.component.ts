import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'body-info',
  templateUrl: './body-info.component.html',
  styleUrls: ['./body-info.component.scss']
})
export class BodyInfoComponent implements OnInit {

  lists;
  copyLists;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getList();

    // clear local storage when reload the page
    localStorage.removeItem("userName");  
    localStorage.removeItem("state");  
    localStorage.removeItem("heartBeatAt");  
    localStorage.removeItem("createdAt");  

  }

  getList() {
    this.lists = this.appService.getList();
    this.copyLists = this.appService.getList();
  }

  search(userName, state, heartBeatAt, createdAt) {

    this.lists = this.copyLists;

    let userNameArr = this.getKeyValue(userName);
    let stateArr = this.getKeyValue(state);
    let heartBeatAtArr = this.getKeyValue(heartBeatAt);
    let createdAtArr = this.getKeyValue(createdAt);

    // save the filters to local storage
    localStorage.setItem('userName', userName);
    localStorage.setItem('state', state);
    localStorage.setItem('heartBeatAt', heartBeatAt);
    localStorage.setItem('createdAt', createdAt);

    let tempSearchList1 = [];
    let tempSearchList2 = [];
    let tempSearchList3 = [];
    let tempSearchList4 = [];

    // firstly, search user name from the lists
    if (userNameArr[0] == '=') {
      for (let i=0; i<this.lists.length; i++) {
        if (this.lists[i].username == userNameArr[1]) {
          tempSearchList1.push(this.lists[i]);
        }
      }
    } else if (userNameArr[0] == '!=') {
      for (let i=0; i<this.lists.length; i++) {
        if (this.lists[i].username != userNameArr[1]) {
          tempSearchList1.push(this.lists[i]);
        }
      } 
    } else {
      tempSearchList1 = this.lists;
    }

    // secondly, search state from the result of searching user name
    if (stateArr[0] == '=') {
      for (let i=0; i<tempSearchList1.length; i++) {
        if (tempSearchList1[i].state == stateArr[1]) {
          tempSearchList2.push(tempSearchList1[i]);
        }
      }
    } else if (stateArr[0] == '!=') {
      for (let i=0; i<tempSearchList1.length; i++) {
        if (tempSearchList1[i].state != stateArr[1]) {
          tempSearchList2.push(tempSearchList1[i]);
        }
      } 
    } else {
      tempSearchList2 = tempSearchList1;
    }

    // thirdly, search heartBeatAt from the result of searching state
    if (heartBeatAtArr[0] == '=') {
      for (let i=0; i<tempSearchList2.length; i++) {

        if (tempSearchList2[i].heartbeatAt == heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else if (heartBeatAtArr[0] == '!=') {
      for (let i=0; i<tempSearchList2.length; i++) {
        if (tempSearchList2[i].heartbeatAt != heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else if (heartBeatAtArr[0] == '>') {
      for (let i=0; i<tempSearchList2.length; i++) {
        if (tempSearchList2[i].heartbeatAt > heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else if (heartBeatAtArr[0] == '<') {
      for (let i=0; i<tempSearchList2.length; i++) {
        if (tempSearchList2[i].heartbeatAt < heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else if (heartBeatAtArr[0] == '>=') {
      for (let i=0; i<tempSearchList2.length; i++) {
        if (tempSearchList2[i].heartbeatAt >= heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else if (heartBeatAtArr[0] == '<=') {
      for (let i=0; i<tempSearchList2.length; i++) {
        if (tempSearchList2[i].heartbeatAt <= heartBeatAtArr[1]) {
          tempSearchList3.push(tempSearchList2[i]);
        }
      }
    } else {
      tempSearchList3 = tempSearchList2;
    }

    // finally, search createdAt from the result of searching heartBeatAt
    if (createdAtArr[0] == '=') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt == createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else if (createdAtArr[0] == '!=') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt != createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else if (createdAtArr[0] == '>') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt > createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else if (createdAtArr[0] == '<') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt < createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else if (createdAtArr[0] == '>=') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt >= createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else if (createdAtArr[0] == '<=') {
      for (let i=0; i<tempSearchList3.length; i++) {
        if (tempSearchList3[i].createdAt <= createdAtArr[1]) {
          tempSearchList4.push(tempSearchList3[i]);
        }
      }
    } else {
      tempSearchList4 = tempSearchList3;
    }

    this.lists = tempSearchList4;
  }

  // this function split the input value from the search box to array
  // the array include the operator and the content
  public getKeyValue(value) {
    let key;
    let content;

    if (value.length >=2) {
      if (value.charAt(0) == '=') {
        key = value.substring(0, 1);
        content = value.substring(1);
      } else if (value.charAt(0) == '!' || value.charAt(0) == '>' || value.charAt(0) == '<') {
        if (value.charAt(1) == '=') {
          key = value.substring(0, 2);
          content = value.substring(2);
        } else {
          key = value.substring(0, 1);
          content = value.substring(1);
        }
      }
    } else {
      key = value;
      content = "";
    }
 
    let res = [];
    res.push(key);
    res.push(content);

    return res;
  }
}
