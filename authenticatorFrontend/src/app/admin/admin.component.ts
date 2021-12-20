import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  editUser: User = new User();
  deleteUser: User = new User();

  constructor() { }

  ngOnInit(): void {
  }


  // $(document).ready(function () {
  //   $('#dt-vertical-scroll').dataTable({
  //     "paging": false,
  //     "fnInitComplete": function () {
  //       var myCustomScrollbar = document.querySelector('#dt-vertical-scroll_wrapper .dataTables_scrollBody');
  //       var ps = new PerfectScrollbar(myCustomScrollbar);
  //     },
  //     "scrollY": 450,
  //   });
  // });


  searchUser(name: String) {

  }

  // add the employee to the server
  onAddUser(addForm: NgForm):void {
    document.getElementById('add-user-form')?.click();

  }

  //updates/edits user
  onUpdateUser(user: User):void{

  }

  //deletes the user 
  onDeleteUser(usedID: number) {

  }

  // opens the modal
  onOpenModal(user: User, mode:String):void {
    const container = document.getElementById('dt-vertical-scroll');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if(mode === 'add'){
      button.setAttribute('data-target', '#addUserModal')
    }
    if(mode === 'edit'){
      button.setAttribute('data-target', '#updateUserModal')
    }
    if(mode === 'delete') {
      button.setAttribute('data-target', '#deleteUserModal')
    }
    container?.appendChild(button);
    button.click();
  }
}
