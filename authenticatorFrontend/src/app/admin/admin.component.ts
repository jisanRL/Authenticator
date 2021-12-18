import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

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

}
