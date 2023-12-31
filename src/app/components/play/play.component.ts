import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayMyPokemonComponent } from '../play-my-pokemon/play-my-pokemon.component';
import { PlayRightBoxComponent } from '../play-right-box/play-right-box.component';
import { GymListComponent } from '../gym-list/gym-list.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {

  constructor() { }
  selectedGame: any;
  currentGameName: any;
  showConfirmationPopup: boolean = false;
  gymName: string = "";
  errorMessage: string | null = null;
  showErrorModal: boolean = false;

  @ViewChild(PlayMyPokemonComponent) playMyPokemonComponent!: PlayMyPokemonComponent;
  @ViewChild(PlayRightBoxComponent) playRightBoxComponent!: PlayRightBoxComponent;
  @ViewChild(GymListComponent) gymListComponent!: GymListComponent;

  ngOnInit(): void {
  }

  onGymSelected(gym: any) {
    if (this.playRightBoxComponent.encounter.id == undefined){
      this.gymName = gym.name;
      this.showConfirmationPopup = true;
    }
    else{
      this.errorMessage = "You cannot challenge a gym during an encounter";
      this.showErrorModal = true;
    }
  }

  handleConfirm(){
    this.playRightBoxComponent.generateGymEncounter(this.gymName);
    this.showConfirmationPopup = false;
  }

  handleDeny(){
    this.showConfirmationPopup = false;
  }

  handleCatchConfirmation() {
    this.playMyPokemonComponent.initializeData();
    this.gymListComponent.initialize();
  }

  handleRelease() {
    this.gymListComponent.initialize();
    this.playRightBoxComponent.initialize();
  }

  handleGeneratePokemon() {
    this.playRightBoxComponent.initialize();
  }

  triggerCrit() {
    this.playMyPokemonComponent.critHit();
  }

  closeErrorModal() {
    this.showErrorModal = false;
  }
}
