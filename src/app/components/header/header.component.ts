import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    // ricezione di form come argomento, di tipo NgForm
    this.router.navigate(['search', form.value.search])
      // dal form verrà estratto il value dall'input di nome "search" nel template

  }

}
