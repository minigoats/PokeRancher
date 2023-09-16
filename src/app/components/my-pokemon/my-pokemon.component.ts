import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Creature } from 'src/app/models/creature.model';
import { CreatureService } from 'src/app/services/creature.service';
import { EncounterService } from 'src/app/services/encounter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrls: ['./my-pokemon.component.css']
})
export class MyPokemonComponent implements OnInit {
  creatureImagePath: string = '';
  userId: string = "";
  creature: Creature = new Creature();
  showConfirmationPopup: boolean = false;

  constructor(private creatureService: CreatureService, private cookieService: CookieService, private userService: UserService,
    private encounterService: EncounterService) { 
  }

  ngOnInit(): void {    
    this.userService.userId$.subscribe(id => {
      this.userId = id;
    });
    this.initializeData();
  }

  initializeData() {
    this.userId = this.cookieService.get('userId');
    if (this.userId == ""){
      this.creature = new Creature();
      this.creatureImagePath = "";
    }
    else
    this.creatureService.getCreature(this.userId).subscribe(
      (data: any) => {
        if (data.length == 0){
          this.creature = new Creature();
          this.creatureImagePath = "";
        }
        else{
          this.creature = data[0];
          this.creatureImagePath = `assets/${this.creature.name.toLowerCase()}.png`;
        }
      },
      (error: any) => {
          console.error('Error fetching creature:', error);
      }
    ); 
}

evolve(){
  this.creatureService.evolve(this.userId).subscribe(
    (data: any) => {
        this.creature = data[0];
        this.creatureImagePath = `assets/${this.creature.name.toLowerCase()}.png`;       
    },
    (error: any) => {
        console.error('Error evolving creature:', error);
    }
  ); 
  this.initializeData();
}

  evolveEevee(eeveeValue: string){
    this.creatureService.evolveEevee(this.userId, eeveeValue).subscribe(
      (data: any) => {
          this.creature = data[0];
          this.creatureImagePath = `assets/${this.creature.name.toLowerCase()}.png`;       
      },
      (error: any) => {
          console.error('Error evolving creature:', error);
      }
    ); 
    this.initializeData();
  }

  canEvolve(){
    if (this.creature.evolvesAt != undefined){
      return this.creature.level >= this.creature.evolvesAt
    }
    return false;
  }

  getPokemon(){
    this.creatureService.getPokemon(this.userId).subscribe(
      (data: any) => {
          this.initializeData();
      },
      (error: any) => {
          console.error('Error fetching pokemon:', error);
      }
    ); 
  }

  releasePokemon(){
    this.showConfirmationPopup = true;
  }

  handleConfirm() {
    this.creatureService.releasePokemon(this.userId).subscribe(
      (data: any) => {
        this.encounterService.run(this.userId).subscribe(
          (data: any) => {
          this.initializeData();  
        },
        (error: any) => {
            console.error('Error generating encounter:', error);
        }); 
          this.initializeData();
          this.showConfirmationPopup = false;
      },
      (error: any) => {
          console.error('Error fetching pokemon:', error);
          this.showConfirmationPopup = false;
      }
    ); 
  }
  
  handleDeny() {
    this.showConfirmationPopup = false;
  }

}