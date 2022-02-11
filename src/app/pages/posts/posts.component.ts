import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Post } from 'src/app/models/post.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild('basicModal') deleteModal: any;
  @ViewChild('editTitle') editTitle: ElementRef | any;
  @ViewChild('editBody') editBody: any;

  showComments: boolean = false;
  @Input() post: Post | any;
  @Output() onDelete: EventEmitter<number> = new EventEmitter<number>();;
  
  newComment: any;
  showSaveButton: boolean= false;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthenticationService,
    private postsService: PostsService,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deletePost() {
    try {
      this.spinner.show();
      this.postsService.deletePostComment(this.post.id).subscribe(response => {
        this.spinner.hide();
        if (response) {
          this.newComment = "";
          this.deleteModal.hide();
          this.toaster.success("Comment deleted successfully.", 'Success', {
            timeOut: 3000,
          });
          this.onDelete.emit();
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

  onClickEdit() {
    this.editTitle.nativeElement.contentEditable= "true";
    this.editBody.nativeElement.contentEditable = "true";

    let range = document.createRange();
    let selection = window.getSelection();

    range.setStart(this.editTitle.nativeElement.childNodes[0], this.editTitle.nativeElement.innerHTML.length - 1);
    range.collapse(true);

    selection?.removeAllRanges();
    selection?.addRange(range);
    this.showSaveButton= true;
  }

  onClickSave() {
    this.editTitle.nativeElement.contentEditable = "false";
    this.editBody.nativeElement.contentEditable = "false";
    this.showSaveButton = false;

  }
}
