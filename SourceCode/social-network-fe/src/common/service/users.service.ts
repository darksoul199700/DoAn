import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { createUserDetail, deletePost, followOtherPeople, getAllFollow, getAllPost, getAllUserNotification, getAllUsers, getAllUsersPost, getPostDetail, getUserDetail, getUserDetailById, getUserPhotoUrl, postLikeAPost, putReadUserNotification, sendPost, updatePost, uploadUserImage, uploadUserImageToServer, userChangePassword } from "./backend-api";

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(
    private http: HttpClient,
    private router: Router
  ){}

  currentUser = JSON.parse(localStorage.getItem('currentUser'))
  token = this.currentUser? this.currentUser.token : null

  httpOption = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    })
  }



  usersCreateDetail(surname: string, truename: string, username: string, gender: boolean, email: string, address: string, phonenumber: string){
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let body = {
      surname: surname,
      truename: truename,
      username: username,
      gender: gender,
      email: email,
      address: address,
      phonenumber: phonenumber
    }

    return this.http.post<any>(createUserDetail, body, this.httpOption)
  }

  usersDetail(): Observable<any>
  {
    if(isNullOrUndefined(this.token)){
      this.router.navigate([""])
      return
    } 
    return this.http.get<any>(getUserDetail,this.httpOption).pipe(
      map((value) => {
        return value
        // if(value.code === 200)
        // {
        //   return value.data
        // } else {
        //   return value.userInfo
        // }
      }),
      catchError((value) => throwError(value))
    )
  }

  usersDetailById(UsersId: number): Observable<any>
  {
    if(isNullOrUndefined(this.token)){
      this.router.navigate([""])
      return
    } 
    let param = new HttpParams()
    param = param.append('usersId', UsersId.toString())
    return this.http.get<any>(getUserDetailById, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        params: param
      })
  }

  usersSendPost(caption: string, photo, create_at: Date)
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let body = {
      caption: caption,
      photo: photo,
      create_at: create_at
    }
    return this.http.post<any>(sendPost, body, this.httpOption)
  }

  usersUpdatePost( postId: number ,caption: string, photo, update_at: Date)
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let param = new HttpParams()
    param = param.append('postId', postId.toString())

    let body = {
      caption: caption,
      photo: photo,
      update_at: update_at
    }
    return this.http.put<any>(updatePost, body, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
      params: param
    })
  }

  usersDeletePost(postId) {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let param = new HttpParams()
    param = param.append('postId', postId.toString())

    return this.http.delete<any>(deletePost, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
      params: param
    })
  }

  getAllUsersPost(UsersId: number)
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }

    let param = new HttpParams()
    param = param.append('usersId', UsersId.toString())
    return this.http.get<any>(getAllUsersPost, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        params: param
      })
  }

  uploadUserImage(photo_url: string, create_at: Date, update_at: Date)
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let body = {
      photo_url: photo_url,
      create_at: create_at,
      update_at: update_at
    }
    return this.http.post<any>(uploadUserImage, body, this.httpOption)
  }

  uploadUserImageToServer(file: File)
  {
    const formData = new FormData();
    formData.append('file', file);
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    return this.http.post<any>(uploadUserImageToServer, formData, this.httpOption)
  }

  getUserPhotoUrl()
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    return this.http.get<any>(getUserPhotoUrl, this.httpOption)
  }

  getAllUser()
  {
    if(isNullOrUndefined(this.token)) {
      this.router.navigate([""])
      return
    }
    return this.http.get<any>(getAllUsers, this.httpOption)
  }

  followOtherUser(users_follow_id: number, create_at: Date)
  {
    var body = {
      users_follow_id: users_follow_id,
      create_at : create_at
    }
    return this.http.post<any>(followOtherPeople, body ,this.httpOption)
  }

  getAllPost()
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    return this.http.get<any>(getAllPost, this.httpOption)
  }

  getPostDetail(id): Observable<any>
  {
    if(id) {
      let param = new HttpParams()
      param = param.append('id', id)

      return this.http.get<any>(getPostDetail, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        params: param
      })
    }
  }

  postLikeAPost(createAt, postId)
  {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    var body = {
      createAt: createAt,
      postId: postId
    }
    return this.http.post<any>(postLikeAPost, body, this.httpOption)
  }

  getAllFollow() {
    return this.http.get<any>(getAllFollow, this.httpOption)
  }

  getAllUserNotification() {
    return this.http.get<any>(getAllUserNotification, this.httpOption)
  }

  readNotification(id) {
    let param = new HttpParams();
    if(id) {
      param = param.append('id', id)
      return this.http.put<any>(putReadUserNotification, null ,{
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        }),
        params: param
      })
    }
  }

  userChangePassword(oldPassword: string, newPassword: string, retypePassword: string) {
    if(isNullOrUndefined(this.token) || this.token == null) {
      this.router.navigate([""])
      return
    }
    let body = {
      oldPassword,
      newPassword,
      retypePassword,
    }

    return this.http.put<any>(userChangePassword, body, {
      ...this.httpOption,
    });
  }
}
