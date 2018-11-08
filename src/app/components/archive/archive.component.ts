import { Component, OnInit,Input } from '@angular/core';
import { HttpService} from '../../service/http/http.service'
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  records = {};
  notes = [];

constructor(private httpService: HttpService) { }
@Input() notesArray;
ngOnInit() {
this.getDelNotes();
}
getDelNotes() {
var token = localStorage.getItem('token');
this.records = this.httpService.httpGetNotes('notes/getTrashNotesList', token).subscribe(result => {
console.log(result);
for (var i = result['data']['data'].length-1; i >0; i--) {

this.notes.push(result['data']['data'][i])

}
console.log(this.notes);

}, error => {
console.log(error);
});
}
}