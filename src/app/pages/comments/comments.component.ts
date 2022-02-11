import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Comment } from 'src/app/models/comment.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() postId: number | any;
  @Input() comment: Comment | any;

  showEdit: boolean = true;
  comments: Comment[] = [];
  newComment: any;
  contentEditable: string = "false";

  constructor(
    private commentsService: CommentsService,
    public authService: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    try {
      if (this.postId) {
        this.spinner.show();
        let postId = new HttpParams().set("postId", this.postId)
        this.commentsService.getCommentsByPostId(postId).pipe(map((response) => {
          return response.map((comment: Comment) => new Comment(comment.postId, comment.id, comment.name, comment.email, comment.body))
        })).subscribe(comments => {
          this.spinner.hide();
          this.comments = comments;
        })
      }
    } catch (ex) {
      console.log(ex);
    }
  }

  onClickEdit(index: number) {
    let target = <HTMLElement>document.getElementsByClassName("editComment")[index];
    target.contentEditable = "true";

    let range = document.createRange();
    let selection = window.getSelection();

    range.setStart(target.childNodes[0], target.innerHTML.length - 1);
    range.collapse(true);

    selection?.removeAllRanges();
    selection?.addRange(range);

  }

  postComment() {
    let comment = {
      postId: this.postId,
      name: "comment",
      email: this.authService.getLoggedInUser().email,
      body: this.newComment
    }

    try {
      this.spinner.show();
      this.commentsService.createComment(comment).subscribe(response => {
        this.spinner.hide();
        if (response) {
          this.newComment = "";
          this.toaster.success("Comment added successfully.", 'Success', {
            timeOut: 3000,
          });
          this.comments.push(response);
        } else {
          this.toaster.error("Error", 'Error', {
            timeOut: 3000,
          });
        }
      })
    } catch (ex) {
      console.log(ex);
    }
  }

  onClickSave(index: number) {
    try {
      let target = <HTMLElement>document.getElementsByClassName("editComment")[index];
      target.contentEditable = "false";
    } catch (ex) {
      console.log(ex);
    }
  }

  onClickCancel() {
    this.newComment = "";
  }
}
