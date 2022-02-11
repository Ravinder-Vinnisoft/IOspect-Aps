import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from 'src/app/models/post.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  @ViewChild('basicModal') addPostModal: any;

  public posts: Post[] = [];
  public users: User[] = [];
  reducedUsers: any = [];

  loggedInUser = this.authService.getLoggedInUser();
  currentPage: any= 1;
  itemsPerPage: any= 10;
  newPost: any= {
    userId: this.authService.getLoggedInUser().id,
    title: "",
    body: ""
  };

  constructor(
    private postsService: PostsService,
    private authService: AuthenticationService,
    private userService: UsersService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    try {
      this.spinner.show();
      this.userService.getUsers().pipe(map((response) => {
        if (response && response.length) {

          return response.map((user: User) => {
            if (user.id === this.loggedInUser.id) {
              user = new User(user.id, user.name, user.username, user.email, user.address, user.phone, user.website, user.company, true)
            } else {
              user = new User(user.id, user.name, user.username, user.email, user.address, user.phone, user.website, user.company, false)
            }
            return user;
          });
        } else {
          return response = null;
        }
      })).subscribe(users => {
        this.users = users;

        this.reducedUsers = this.users.reduce((acc: any, obj) => {

          let key = obj['id'];

          if (!acc[key]) {
            acc[key] = obj
          }

          return acc
        }, {})

        this.getPosts();
      })
    } catch (ex) {
      console.log(ex);
    }
  }

  getPosts() {
    try {
      this.postsService.getPosts().pipe(map((response) => {
        return response.map((post: Post) => new Post(post.userId, post.id, post.title, post.body, this.reducedUsers[post.userId]));
      })).subscribe(posts => {
        this.spinner.hide();
        this.posts = posts;
      })
    } catch (ex) {
      console.log(ex);
    }
  }

  deletePost(index: number) {
    this.posts.splice(index, 1);
  }

  onSubmit() {
    try {
      this.spinner.show();
      this.postsService.createPost(this.newPost).subscribe(response => {
        this.spinner.hide();
        if (response) {
          this.addPostModal.hide();
          this.newPost.title= "";
          this.newPost.body = "";

          this.toaster.success("Post created successfully.", 'Success', {
            timeOut: 3000,
          });
          response.user= this.reducedUsers[response.userId];
          this.posts.splice(0, 0, response);

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
}
