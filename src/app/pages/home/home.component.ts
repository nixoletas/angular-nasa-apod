import { Component, inject, OnInit } from '@angular/core';
import { ApodService } from '../../services/apod.service';
import { CommonModule } from '@angular/common';
import { Apod } from '../../interface/apod.interface';
import { ApodComponent } from '../../components/apod/apod.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ApodComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  apodService = inject(ApodService);
  apods: Apod[] = [];
  isLoading = true;

  nasaLogo = 'https://www.nasa.gov/wp-content/themes/nasa/assets/images/nasa-logo.svg';

  ngOnInit() {
    this.apodService.getApod().subscribe({
      next: (data: Apod[]) => {
        this.apods = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching APODs:', error);
        this.isLoading = false;
      }
    });
  }
}
