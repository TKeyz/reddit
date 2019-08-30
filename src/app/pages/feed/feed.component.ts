import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-root',
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

	constructor(public FeedService: FeedService, private router: Router) {}

	private comments$: Comments[] = [];
	private keyword$: string;
	private limit$: number;
	private before$: number;
	private after$: number;

	ngOnInit() {
		this.FeedService._keyword.subscribe(keyword$ => this.keyword$ = keyword$);
		this.FeedService._limit.subscribe(limit$ => this.limit$ = limit$);
		this.FeedService.getComments(this.keyword$, this.limit$).subscribe(comments$ => {
			this.comments$ = comments$['data'];
		});
	}
	selectPost(post: any): void {
		let link = ['/post', post.data.id];
		this.router.navigate(link);
	}
}
