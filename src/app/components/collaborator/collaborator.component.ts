import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { MatDialog} from '@angular/material';
import { from } from 'rxjs';
import { CollaboratorspopComponent } from '../collaboratorspop/collaboratorspop.component';



@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  @Input() noteDetails;
  @Output() addColaboratorEvent=new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  collaborator(): void {
    const dialogRef = this.dialog.open(CollaboratorspopComponent, {
      width: '600px',
      maxWidth: 'auto',
      panelClass: 'myapp-no-padding-dialog',
      data:this.noteDetails,
      // width:'100vw'
      

    });
    dialogRef.afterClosed().subscribe(result => {
     this.addColaboratorEvent.emit({});
    });
}
  }
  
