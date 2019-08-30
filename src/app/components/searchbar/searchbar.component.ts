import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedService } from '../../services/feed.service';
import { Comments } from '../../models/comments.model';
import { Post } from '../../models/post.model';

@Component({
	selector: 'app-searchbar',
	templateUrl: './searchbar.component.html',
	styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

	constructor(public FeedService: FeedService) { }

	private comments$: Comments[] = [];
	keyword$: string;
	limit$: number;

	ngOnInit() {
		this.FeedService._keyword.subscribe(keyword$ => this.keyword$ = keyword$);
		this.FeedService._limit.subscribe(limit$ => this.limit$ = limit$);
	}
	onSubmit(form: NgForm){
	console.log(form.value.search);
		this.FeedService.setKeyword(this.keyword$);
		this.FeedService.getComments(this.keyword$, this.limit$).subscribe(comments$ => {
			this.comments$ = comments$['data'];
		});
	}

}