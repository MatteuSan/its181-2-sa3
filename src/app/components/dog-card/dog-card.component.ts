import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormFieldComponent } from '../form-field/form-field.component';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import { Dog } from '../../models/dog';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { DogService } from '../../services/dog.service';
import { AdoptionRequest } from '../../models/adoption-request';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dog-card',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf,
    FormFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './dog-card.component.html',
  styleUrl: './dog-card.component.scss'
})
export class DogCardComponent implements OnInit {
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() breed: string = '';
  @Input() description: string = '';

  isModalShown: boolean = false;
  message: string = '';

  currentUser: User|undefined;

  constructor(
    private authService: AuthService,
    private dogService: DogService,
    private adoptionRequestService: AdoptionRequestService,
  ) {}

  showModal() {
    this.isModalShown = true;
  }

  hideModal() {
    this.isModalShown = false;
  }

  adopt() {
    this.authService.getCurrentUserInformation().subscribe((user: User) => {
      this.dogService.getDog(this.id).subscribe((dog: Dog) => {
        const adoptionRequest: AdoptionRequest = new AdoptionRequest();
        adoptionRequest.user = user;
        adoptionRequest.dog = dog;
        adoptionRequest.message = this.message;
        adoptionRequest.status = 'pending';

        this.adoptionRequestService.createAdoptionRequest(adoptionRequest).subscribe(() => {
          this.hideModal();
          window.location.reload();
        });
      });
    });
  }

  deleteDog() {
    this.dogService.deleteDog(this.id).subscribe(() => {
      this.hideModal();
      window.location.reload();
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUserInformation().subscribe((user: User) => {
      this.currentUser = user;
    });
  }
}
