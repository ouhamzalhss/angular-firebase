import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AppareilService {

  appareilsSubject = new Subject<any[]>();

      private appareils = [];

      constructor(private http: HttpClient){}

      emitAppareilSubject() {
        this.appareilsSubject.next(this.appareils.slice());
      }

      
      switchOnAll() {
        for(let appareil of this.appareils) {
            console.log('tous allumé')
          appareil.status = 'allumé';
        }
        this.emitAppareilSubject();
    }
    
    switchOffAll() {
        for(let appareil of this.appareils) {
          appareil.status = 'éteint';
        }
        this.emitAppareilSubject();
    }

    switchOnOne(i: number) {
        this.appareils[i].status = 'allumé';
        this.emitAppareilSubject();
    }
    
    switchOffOne(i: number) {
        this.appareils[i].status = 'éteint';
        this.emitAppareilSubject();
    }

    getAppareilById(id: number){
       const appareil = this.appareils.find((s)=>{
         return s.id === id;
       });
       return appareil;
    }

    addAppareil(name: string, status: string){
      const appareilObject = {
        id: 0,
        name: '',
        status: ''
      }
      appareilObject.name = name;
      appareilObject.status = status;
      appareilObject.id = this.appareils[(this.appareils.length - 1)].id +1;

      this.appareils.push(appareilObject);
      this.emitAppareilSubject();
    }

    saveAppareils(){
      this.http.put('https://http-client-demo-56e2a.firebaseio.com/appareils.json',this.appareils).subscribe(
        ()=>{
             console.log('Enregistrement terminé!');
      },
      (error)=>{
            console.log('Enregistrement echoué!');
      })
    }

    getAppareils(){
      this.http.get<any[]>('https://http-client-demo-56e2a.firebaseio.com/appareils.json').subscribe(
        (data)=>{
             this.appareils = data;
             this.emitAppareilSubject();
      },
      (error)=>{
            console.log('Enregistrement echoué!');
      });

     
    }
}