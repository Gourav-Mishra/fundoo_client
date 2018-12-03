import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  url = environment.baseUrl
  token = localStorage.getItem('token')
  constructor(public service: HttpService, public http: HttpClient) { }
  getLabels() {
    let url = this.url + "noteLabels/getNoteLabelList";
    return this.service.httpget(url, this.token);
  }
  postNoteLabels(body) {
    let url = this.url + "noteLabels";
    return this.service.httpPosts(url, body, this.token);
  }
  deleteData(id) {
    let url = this.url + "noteLabels/" + id + "/deleteNoteLabel";
    return this.http.delete(url);
  }
  addNotes(body) {
    let url = this.url + "notes/addnotes";
    return this.service.httpAddNote(url, body, this.token);

  }
  getArchiveNotes() {
    let url = this.url + "notes/getArchiveNotesList";
    return this.service.httpget(url, this.token);
  }
  postArchiveNotes(model) {
    let url = this.url + "notes/archiveNotes";
    return this.service.httpPosts(url, model, this.token);
  }
  postChangeColor(model) {
    let url = this.url + "notes/changesColorNotes";
    return this.service.httpPosts(url, model, this.token);
  }
  imageUpload(body) {
    let url = this.url + '/user/uploadProfileImage';
    return this.service.httpImage(url, body, this.token)
  }
  postAddLabelnotes(note, label, { }) {
    let url = this.url + "notes/" + note + "/addLabelToNotes/" + label + "/add";;
    return this.service.httpPosts(url, {}, this.token);
  }
  postAddLabelnotesRemove(note, label, { }) {
    let url = this.url + "notes/" + note + "/addLabelToNotes/" + label + "/remove";;
    return this.service.httpPosts(url, {}, this.token);
  }
  postRemoveReminders(model) {
    let url = this.url + '/notes/removeReminderNotes';
    return this.service.httpPosts(url, model, this.token);
  }
  postUpdateChecklist(id, modifiedid, body) {
    let url = this.url + "notes/" + id + "/checklist/" + modifiedid + "/update";
    return this.service.httpPosts(url, body, this.token);
  }
  getNotesList() {

    let url = this.url + "notes/getNotesList";
    return this.service.httpget(url, this.token);
  }
  postPinUnpin(model) {
    let url = this.url + "notes/pinUnpinNotes";
    return this.service.httpPosts(url, model, this.token);
  }
  updateNotes(input) {
    let url = this.url + "notes/updateNotes";
    return this.service.httppostpassword(url, input, this.token);
  }
  postAddUpdateReminderNotes(body) {
    let url = this.url + '/notes/addUpdateReminderNotes';
    return this.service.httpPosts(url, body, this.token);
  }
  getReminders() {
    let url = this.url + '/notes/getReminderNotesList';
    return this.service.httpget(url, this.token);

  }
  getTrashNoteList() {
    let url = this.url + 'notes/getTrashNotesList';
    return this.service.httpget(url, this.token)
  }
  postDeleteForeverNotes(body) {
    let url = this.url + 'notes/deleteForeverNotes';
    return this.service.httpPosts(url, body, this.token);
  }
  postTrashNotes(body) {
    let url = this.url + "notes/trashNotes";
    return this.service.httpPosts(url, body, this.token);
  }
  removeCollaborator(userId,noteId){
    let url=this.url+ "/notes/"+noteId+"/removeCollaboratorsnotes/"+userId;
    return this.service.delete(url);
  }
   getNoteDetails(noteId){
    let url = this.url + 'notes/getNotesDetail/'+noteId;
    return this.service.get(url);
}
addQuestionAndAnswer(RequestBody){
  let url=this.url+'questionAndAnswerNotes/addQuestionAndAnswer';
  return this.service.httpPosts(url,RequestBody,null)


}
likeQnA(id, RequestBody) {
  this.url = this.url + "/questionAndAnswerNotes/like/" + id;
  return this.service.httpPosts(this.url, RequestBody,null);
  }
  replyQnA(id, RequestBody) {
  this.url = this.url + "questionAndAnswerNotes/reply/" + id;
  return this.service.httpPosts(this.url, RequestBody,null);
  }
  ratingQnA(id, RequestBody){
  this.url = this.url + "/questionAndAnswerNotes/rate/" + id;
  return this.service.httpPosts(this.url, RequestBody,null);
  }
}
