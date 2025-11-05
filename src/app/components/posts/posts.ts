import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, MatCardModule], 
  templateUrl: './posts.html',
  styleUrl: './posts.scss',
})
export class PostsComponent {
  
}