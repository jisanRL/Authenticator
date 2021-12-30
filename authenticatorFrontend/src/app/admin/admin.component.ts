import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  editUser: User = new User();
  deleteUser: User = new User();

  selectedFile = null;

  constructor(private httpService: HttpClientService, private router: Router) { }

  ngOnInit(): void {
    this.accessCheck();
    this.getUser();
  }
  
  // if the user is not an employee then he wont be able to get into this component and page
  accessCheck(){
    let check = this.httpService.getToken();
    if (check != "Employee") {
      alert("Illegal Access");
      this.router.navigate(['']);
    } else {}
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

  // gets the user from the database 
  getUser(): void {
    this.httpService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log(this.users);
      }, 
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // add the employee to the server
  onAddUser(addForm: NgForm):void {
    document.getElementById('add-user-form')?.click();
    
    this.httpService.addUser(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.getUser();
        addForm.reset();
      }, 
      // error response 
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  //updates/edits user
  onUpdateUser(user: User):void{
    this.httpService.updateUser(user).subscribe(
      (response: User) => {
        console.log(user);
        this.getUser();
      }, 
      // error response
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }
  //deletes the user 
  onDeleteUser(usedID: number):void {
    this.httpService.deleteUser(usedID).subscribe(
      (response: void) => {
        console.log(response)
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
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
      this.editUser = user;
      button.setAttribute('data-target', '#updateUserModal')
    }
    if(mode === 'delete') {
      this.deleteUser = user;
      button.setAttribute('data-target', '#deleteUserModal')
    }
    container?.appendChild(button);
    button.click();
  }

  // image upload segment
  onFileSelected(event: any){
    console.log(event);
    this.selectedFile = event.target.files[0];
  }
  onUpload(){
    // this.httpService.addUser()
  }


}
