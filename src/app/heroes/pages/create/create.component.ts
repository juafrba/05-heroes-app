import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `
  ]
})
export class CreateComponent implements OnInit {

  publishers: any[] = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id}) => this.heroesService.getHeroeById(id))
      )
      .subscribe(heroe => this.heroe = heroe);
  }

  save(): void {
    if (!this.heroe.superhero.trim()) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.update(this.heroe)
        .subscribe(() => this.showSnackBar('Registro actualizado'));
        return;
    }

    this.heroesService.create(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes', 'edit', heroe.id]);
        this.showSnackBar('Registro creado');
      });
  }

  delete(): void {
    this.heroesService.delete(this.heroe.id!)
      .subscribe(response => this.router.navigate(['/heroes', 'list']));
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2500,
    });
  }

  showDeleteDialog():void {
    const dialogReference = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: this.heroe,
    });

    dialogReference.afterClosed()
      .subscribe(result => {
        if (!result) {
          return;
        }

        this.delete();
      });
  }
}
