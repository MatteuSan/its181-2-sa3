import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { DogService } from '../../services/dog.service';
import { Dog } from '../../models/dog';
import { ButtonComponent } from '../../components/button/button.component';
import { DogCardComponent } from '../../components/dog-card/dog-card.component';
import { AdoptionRequest } from '../../models/adoption-request';
import { AdoptionRequestService } from '../../services/adoption-request.service';
import { AdoptionRequestCardComponent } from '../../components/adoption-request-card/adoption-request-card.component';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AddDogModalComponent } from '../../components/add-dog-modal/add-dog-modal.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ButtonComponent,
    DogCardComponent,
    AdoptionRequestCardComponent,
    AddDogModalComponent
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit {
  users: User[] = [];
  dogs: Dog[] = [];
  adoptionRequests: AdoptionRequest[] = [];

  currentUser: User|undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dogService: DogService,
    private adoptionRequestService: AdoptionRequestService,
    private cdr: ChangeDetectorRef
  ) {}

  fetchData() {
    this.authService.getCurrentUserInformation().subscribe((user: User) => {
      this.currentUser = user;

      this.userService.getUsers().subscribe((users: User[]) => {
        this.users = users;
        this.cdr.detectChanges();
      });

      // @ts-ignore
      this.dogService.getDogs().subscribe((dogs: Dog[]) => {
        this.dogs = dogs;
        this.cdr.detectChanges();
      });

      // @ts-ignore
      this.adoptionRequestService.getAdoptionRequests().subscribe((adoptionRequests: AdoptionRequest[]) => {
        // this.adoptionRequests = adoptionRequests.filter((ar: AdoptionRequest) => ar.status === 'approved');
        this.adoptionRequests = this.currentUser?.type == 'admin' ? adoptionRequests : adoptionRequests.filter((ar: AdoptionRequest) => {
          return ar.user?.id === this.currentUser?.id;
        });
        this.cdr.detectChanges();
      });
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
