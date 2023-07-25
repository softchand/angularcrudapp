import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  readdata: any;
  sucessmess: any;

  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.getAllData();
  }
  deleteIDdata(id: any) {
    debugger;
    this.service.deletData(id).subscribe((res) => {
      console.log(res, "Deleted User Data");
      this.sucessmess = res.message;
      this.getAllData();

    });

  }
  getAllData() {
    this.service.getAllData().subscribe((res) => {
      this.readdata = res.data;
    })
  }

}
