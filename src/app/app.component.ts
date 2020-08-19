import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ModalService } from './core/services/modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  public constructor(private titleService: Title, private modalService:ModalService  ) { }

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
  ngOnInit(){

  }
}
