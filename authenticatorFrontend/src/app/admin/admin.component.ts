import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../model/User';
import { HttpClientService } from '../service/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];
  selectedUser: User = new User();
  
  editUser: User = new User();
  deleteUser: User = new User();
  action: String = "";
  selectedFile = null;

  constructor(private httpService: HttpClientService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.accessCheck();
    // this.getUser();
    this.refreshData();
  }
  
  // if the user is not an employee/admin then he wont be able to get into this component and page
  accessCheck(){
    let check = this.httpService.getToken();
    if (check != "Employee" && check != "admin") {
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



  // gets the updated data from springboot 
  refreshData(){
    // calls the httpclient service and gets the getUser method
    this.httpService.getUsers().subscribe(
      response => this.handleSuccessfulResponse(response));
      this.activatedRoute.queryParams.subscribe(
      (params) => {
        this.action = params['action'];

        // gets updated data when the deletion of data happens 
        const selectedUserID = params['id'];
        console.log("selectedID = " + selectedUserID)
        if(selectedUserID) {
          this.selectedUser = this.users.find(user => user.id === +selectedUserID)!;         // ‘!’ operator indicate this value isn’t nullable.
        }
       }
    );
 }
  handleSuccessfulResponse(response: any) {
    this.users = response;
  }
  // search users
  searchUser(key: String): void {
    const resArr: User[] = [];
    // loop thorugh the res
    for (const user of this.users) {
      // if there is a match between any elements push to to resArr
      if (user.name.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1 ||
        user.username.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1 ||
        user.address.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1 ||
        user.email.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1 ||
        user.type.toLocaleLowerCase().indexOf(key.toLocaleLowerCase()) != -1) 
      {
        resArr.push(user);
      }
    }
    this.users = resArr;

    if (resArr.length === 0 || !key) {
      this.refreshData();
    }
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
