import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Comments } from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})

export class FeedService {

	constructor(private http: HttpClient) { }

	protected url = 'https://www.reddit.com';

	private keyword$ = new BehaviorSubject<string>('Paris');
	private limit$ = new BehaviorSubject<number>(10);
	private before$ = new BehaviorSubject<string>(null);
	private after$ = new BehaviorSubject<string>(null);
	private comments$ = new BehaviorSubject<Array<any>>([]);

	private log(log: string){
		console.info(log);
	}
	private handleError<T>(operation = 'operation', result?: T){
		return (error: any): Observable<T> => {
			console.log(error);
			console.log('${operation} failed ${error.message}');

			return of(result as T);
		}
	}

	_limit = this.limit$.asObservable();
	_keyword = this.keyword$.asObservable();
	_comments = this.comments$.asObservable();

	setLimit(limit) {
		this.limit$.next(limit)
	}
	setKeyword(keyword) {
		this.keyword$.next(keyword)
	}
	updateFeed(data){
		return this.comments$.next(data); 
	}
	getComments(ref: string, limit: number): Observable<Comments[]> {
		const r = (ref.indexOf('/r/') !== -1) ? ref : '/r/' + ref;
		const query = (limit !== null) ? `${this.url}` + r +'.json?limit=' + limit: `${this.url}` + r +'.json';
		const httpOtions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		}
		return this.http.get<Comments[]>(query).pipe(
			tap(_ => this.log('Fetched')),
			catchError(this.handleError('Comments Oups', []))
			
		);
	}
	getPost(id: number): Observable<any> {
		let query = `${this.url}` + id +'.json';
		return this.http.get<Comment[]>(query).pipe(
			map(res => res)
		);
	}
}