import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './pages/feed/feed.component';
import { PostComponent } from './pages/post/post.component';
import { Error404Component } from './pages/error404/error404.component';


const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: FeedComponent,
		data: { title: 'Feed List' }
	},
	{
		path: 'post/:id',
		component: PostComponent
	},
	{
		path: '**',
		component: Error404Component
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
