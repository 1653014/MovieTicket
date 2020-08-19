import { Injectable, Output,EventEmitter } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  public isOpenModal = new BehaviorSubject({}); //Lưu vào
  public getOpenModal = this.isOpenModal.asObservable(); //Lấy ra
  public setIsOpenModal(thamso) //Gọi để gán giá trị 
  {
    this.isOpenModal.next(thamso);
  }

  @Output() data = new EventEmitter();
  constructor() { }
}
