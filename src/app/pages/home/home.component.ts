import { Component, inject, OnInit } from '@angular/core';
import { ApodService } from '../../services/apod.service';
import { CommonModule } from '@angular/common';
import { Apod } from '../../interface/apod.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apodService = inject(ApodService);
  apods: Apod[] = [];

  ngOnInit() {
    this.apodService.getApod().subscribe({
      next: (data: Apod[]) => {
        this.apods = data;
      },
      error: (error) => {
        console.error('Error fetching APODs:', error);
      }
    });
  }
}
