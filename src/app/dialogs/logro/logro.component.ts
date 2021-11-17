import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-logro',
  templateUrl: './logro.component.html',
  styleUrls: ['./logro.component.css'],
})
export class LogroComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialModalRef: MatDialogRef<any>
  ) { }

  ngOnInit() {
    this.data.forEach((logro: any) => {
      logro.icon = environment.api.base + logro.icon;
    })
    this.changePosition();
  }

  changePosition() {
    this.dialModalRef.updatePosition({ top: '50px', left: '50%' });
  }

}
