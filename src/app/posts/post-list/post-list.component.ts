import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   {title: '1st Post', content: 'This is the first post content'},
  //   {title: '2nd Post', content: 'This is the second post content'},
  //   {title: '3rd Post', content: 'This is the third post content'}
  // ];

  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostsService) {
  }

  ngOnInit() {
      this.postsService.getPosts(); // always empty
      this.postsSub = this.postsService.getPostUpdateListener()
        .subscribe((posts: Post[]) => {
            this.posts = posts;
        });

  }

  ngOnDestroy() {
      this.postsSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

}
