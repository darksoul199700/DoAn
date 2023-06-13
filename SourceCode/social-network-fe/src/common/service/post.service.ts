import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { getPostAllComment, postCommentAPost, uploadPostImageToServer } from './backend-api';

@Injectable({
    providedIn: 'root'
})

export class PostService {
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

    httpHeaders = new HttpHeaders()
                         .set('Accept', 'application/json');

    commentAPost(postId: number, comment: string, createAt: Date) {
        var body = {
            create_at: createAt,
            postId: postId,
            comment: comment
        }
        return this.http.post<any>(postCommentAPost, body, this.httpOption)
    }

    getPostAllComment(postId) {
        const url = getPostAllComment.replace(':id', postId)
        return this.http.get<any>(url, {headers: this.httpHeaders})
    }

    uploadPostImagesToServer(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(uploadPostImageToServer, formData, this.httpOption);
    }
}