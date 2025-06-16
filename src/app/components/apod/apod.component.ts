import { Component } from '@angular/core';
import { Today } from '../../interface/today.interface';
import { ApodService } from '../../services/apod.service';

@Component({
  selector: 'app-apod',
  imports: [],
  templateUrl: './apod.component.html',
  styleUrl: './apod.component.scss'
})

export class ApodComponent {
  apod: Today = {
    date: '',
    explanation: '',
    title: '',
    url: ''
  };

  constructor(private apodService: ApodService) {}

  ngOnInit() {
    this.apodService.getToday().subscribe((data) => {
      this.apod = data;
    });
  }
}
