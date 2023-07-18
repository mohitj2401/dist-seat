import { Component } from '@angular/core';
// import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Coach } from 'src/app/models/coach';
import { HomeService } from 'src/app/services/home.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  coaches!: Coach[];
  bookSeatField!: FormGroup;
  errorMessage: string = 'Something Went Wrong';
  isErrorOccur: boolean = false;
  bookedSeats!: number[];
  buttonText: string = 'Book Seat';

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}
  get number_of_seats() {
    return this.bookSeatField.get('number_of_seats');
  }
  getAllCoach() {
    this.homeService.getCoachList().subscribe({
      error: (res) => console.log(res),
      next: (res) => {
        this.coaches = res;

        // console.log(this.coaches[0]);
      },
      // complete: (res) => {},
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.getAllCoach();
    });
    this.bookSeatField = this.formBuilder.group({
      number_of_seats: [
        '',
        [Validators.required, Validators.min(1), Validators.max(7)],
      ],
    });
  }
  onSubmit(): void {
    if (this.bookSeatField.invalid) {
      this.bookSeatField.markAllAsTouched();
    }
    const { number_of_seats } = this.bookSeatField.value;
    this.buttonText = 'Processing..';

    this.homeService.bookseat(number_of_seats).subscribe({
      error: (err) => {
        if (err['status'] == 400) {
          this.errorMessage = err['error']['message'];
          this.isErrorOccur = true;
        } else {
          this.isErrorOccur = true;
        }
        this.buttonText = 'Book Seat';
      },
      next: (res) => {
        // console.log(res);
        this.bookedSeats = res['seat_num'];
        this.bookSeatField.reset();
        this.buttonText = 'Book Seat';
        this.getAllCoach();
      },
      // complete: this.b,
    });
  }
}
