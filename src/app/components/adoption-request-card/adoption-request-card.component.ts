import { Component, Input } from '@angular/core';
import { Dog } from '../../models/dog';
import { User } from '../../models/user';
import { ButtonComponent } from '../button/button.component';
import { NgIf } from '@angular/common';
import { AdoptionRequestService } from '../../services/adoption-request.service';

@Component({
  selector: 'app-adoption-request-card',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIf
  ],
  templateUrl: './adoption-request-card.component.html',
  styleUrl: './adoption-request-card.component.scss'
})
export class AdoptionRequestCardComponent {
  @Input() id: number = 0;
  @Input() dog: Dog|undefined;
  @Input() user: User|undefined;
  @Input() status: string = '';
  @Input() message: string = '';
  @Input() currentUser: User|undefined;

  constructor(
    private adoptionRequestService: AdoptionRequestService,
  ) {}

  approve() {
    this.adoptionRequestService.approveAdoptionRequest(this.id).subscribe(() => {
      window.location.reload();
    });
  }

  reject() {
    this.adoptionRequestService.deleteAdoptionRequest(this.id).subscribe(() => {
      window.location.reload();
    });
  }

  removeApproval() {
    this.adoptionRequestService.removeAdoptionRequestApproval(this.id).subscribe(() => {
      window.location.reload();
    });
  }
}
