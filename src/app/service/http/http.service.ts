import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class HttpService {



  constructor(private http:HttpClient) { }
  httpGet(nexturl){
   return this.http.get(environment.baseUrl+'/'+nexturl)
  }
  httpPost(nexturl,body){
    return this.http.post(environment.baseUrl+'/'+nexturl,body)
   }
   httpPasswordUpdate(nexturl,token,body){
     var httpOption={
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
         'Authorization':token
         
       })
     };
     return this.http.post(environment.baseUrl+"/"+nexturl,this.getFormUrlEncoded(body),httpOption)
   }
   getFormUrlEncoded(toConvert){
     const formBody=[];
     for(const property in toConvert){
       const encodeKey=encodeURIComponent(property);
       const encodeValue=encodeURIComponent(toConvert[property]);
       formBody.push(encodeKey+'='+encodeValue);
     }
     return formBody.join('&');
   }
   httpAddNote(nexturl,body,token){
     var httpOptions={
       headers:new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization':token
       })
     };
     return this.http.post(environment.baseUrl+"/"+nexturl,this.getFormUrlEncoded(body),httpOptions)
   }
   httpGetNotes(nexturl,token){
    var httpOptions={
    headers:new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':token
     })
   };
   return this.http.get(environment.baseUrl+"/"+nexturl,httpOptions)
   
  }
  httpColorNote(nexturl,body,token){
    var httpOptions={
      headers:new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization':token
      })
    };
    return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
  }
  httpDeleteNote(nextUrl,body,token){
    var httpOptions={
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':token
    })
    
    };
    return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
    }
    httpArchiveNote(nextUrl,body,token){
      var httpOptions={
      headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':token
      })
      
      };
      return this.http.post(environment.baseUrl+'/'+nextUrl, body, httpOptions)
      }
      httpUpdateNote(nexturl,body,token){
        var httpOptions={
          headers:new HttpHeaders({
           'Content-Type': 'application/x-www-form-urlencoded',
           'Authorization':token
          })
        };
        return this.http.post(environment.baseUrl+"/"+nexturl,this.getFormUrlEncoded(body),httpOptions)
      }
      
      httpPostLable(nexturl,body,token){
        var httpOptions={
          headers:new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization':token
          })
        };
        return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
      }
      httpAddImage(nexturl,body,token){
        console.log(token);
        var httpOptions={
          headers:new HttpHeaders({
           
           'Authorization':token
          })
        };
        return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
      }
      httpPostdeleteForever(nexturl,body,token){
        var httpOptions={
          headers:new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization':token
          })
        };
        return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
      }

      httpDeletelabel(nexturl,body,token){
        var httpOptions={
          headers:new HttpHeaders({
           'Content-Type': 'application/json',
           'Authorization':token
          })
        };
        return this.http.post(environment.baseUrl+"/"+nexturl,body,httpOptions)
      }


      public getNoteJson(name,token){
        var httpheaders = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
          })
        };
        return this.http.get(environment.baseUrl+ "/" + name,httpheaders);
      }
      
      public labelDeleteService(name){
        
          return this.http.delete(environment.baseUrl+"/"+name);
        }
     
       public postNotes(name, body, token){  //Service file pr posting delete function and the color hash codes of notes
          var httpheaders = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': token
            })
          };
        
          return this.http.post(environment.baseUrl + "/" + name, body, httpheaders);
        }

      
     
}
