import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { NgIf } from '@angular/common';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/dog';

@Component({
  selector: 'app-add-dog-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    FormFieldComponent,
    NgIf
  ],
  templateUrl: './add-dog-modal.component.html',
  styleUrl: './add-dog-modal.component.scss'
})
export class AddDogModalComponent {
  isModalShown: boolean = false;

  dogName: string = '';
  dogBreed: string = '';
  dogDescription: string = '';

  constructor(
    private dogService: DogService,
  ) {}

  showModal() {
    this.isModalShown = true;
  }

  hideModal() {
    this.isModalShown = false;
  }

  createDog() {
    const newDog: Dog = new Dog();
    newDog.name = this.dogName;
    newDog.breed = this.dogBreed;
    newDog.description = this.dogDescription;
    this.dogService.createDog(newDog).subscribe(() => {
      this.hideModal();
      window.location.reload();
    });
  }
}
