import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import * as moment from 'moment';
import { baseApi } from 'src/common/service/backend-api';
import { CommentService } from 'src/common/service/comment.service';
import { PostService } from 'src/common/service/post.service';
import { UsersService } from 'src/common/service/users.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.css'],
})
export class PostContentComponent implements OnInit {


  @Input('post') post: any
  @Input('user') user: any
  @Input('index') index: number
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private postService: PostService,
    private cd: ChangeDetectorRef,
    private commentService: CommentService,
    private router: Router,
  ) { 
  }

  imageObject: Array<object>
  is_Like: boolean = false
  press = false
  listComment: any[]
  oldestComment: any[]
  newestComment: any[]
  isShowMore = false
  countLike: number
  postContentClass: string
  baseApiUrl: string;
  //init subcribe

  ngOnInit(): void {
    //init array
    this.imageObject = new Array()
    this.listComment = new Array()
    this.oldestComment = new Array()
    this.newestComment = new Array()
    this.postContentClass = `list-content-index-${this.index}`

    this.is_Like = this.post.is_currentUser_like
    this.countLike == this.post.countLike
    this.baseApiUrl = baseApi;


    if(this.post.photo) {
      this.post.photo.map((image) => {
        let imageObject = {
          image : baseApi + "/" + image,
          thumbImage: baseApi + "/" + image,
          alt: 'image of post',
          title: ''
        }
  
        this.imageObject.push(imageObject)
      })
    }
    this.postService.getPostAllComment(this.post.id).subscribe(value => {
      value.map((x,i) => {
        if(i < 3) {
          this.oldestComment.push(x)
        } else {
          this.newestComment.push(x)
        }
        this.listComment.push(x)
      })
    })
    this.commentService.receiveComment().subscribe(data => {
      if(this.post.id == data.post) {
        // if (this.oldestComment.length >= 3) {

        // }
        $('.list-comment').append(
          `<div class="comment-item">
            <p><span style="font-weight: bold;">${data.sender}</span><span>: ${data.messages}</span></p>
          </div>
          `
        )
      }
    })
  }

  async toggle(postId){
    this.is_Like = !this.is_Like
    let createAt = new Date()
    const result = await this.userService.postLikeAPost(createAt, postId).subscribe(value => {
      if(this.is_Like == true && value.code == 200) {
        
        this.post.countLike = this.post.countLike + 1
      } else if(this.is_Like == false && value.code == 200) {
        this.post.countLike = this.post.countLike - 1
      }
    })
  }


  howlong(time) {
    let date = new Date(time)
    date.setHours(date.getHours() + 7)
    return moment(date).fromNow()
  }

  changevalue(event) {
    const element = $(event.target)
    element.on('keydown', (e) => {
      if(this.press == false) {
        if(e.keyCode == 13) {
          this.press = true
          this.commentService.sendComment(element.text(), this.user.username, this.post.id)
          this.submitComment(element.text())
          element.empty()
          window.getSelection().removeAllRanges() // reset cursor
        }
      }
    })
    this.press = false
    element.focus()
  }

  async submitComment(value) {
    let createAt = new Date()
    if(!isNullOrUndefined(value) && value !== '') {
      await this.postService.commentAPost(this.post.id, value, createAt).subscribe(values => {
        if (values.code === 200) {
          const comment = {};
          comment['content_comment'] = value;
          comment['users'] = {};
          comment['users']['usersDetail'] = {};
          comment['users']['usersDetail']['username'] = this.user.username;
          if (this.oldestComment.length < 3) {
            this.oldestComment.push(comment);
          } else {
            this.newestComment.push(comment);
          }
          if (!this.isShowMore) {
            $(`.${this.postContentClass}`).click();
          }
        }
        
      })
    }
  }

  showMoreComment(event) {
    if(!this.isShowMore) {
      let oldComment = $(event.target).parent().find('.new-comment')
      oldComment.removeClass('hide')
      this.isShowMore = true
    } else {
      let oldComment = $(event.target).parent().find('.new-comment')
      oldComment.addClass('hide')
      this.isShowMore = false
    }
    
    // console.log('test')
  }

  postDetail(id) {
    this.router.navigate(['post-detail'], { queryParams: { id:  id} });
  }
}
