import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string = "";
  password:string = "";
  showPassword = false;
  passwordToggleEye = "eye";

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async login(){
    const {email, password} = this
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password)
      if(result){
        this.handleBienvenida()
      }
    }catch(error){
      console.dir(error)
      this.handleError()
    }
  }

  cambiarOjo(){
    this.showPassword =!this.showPassword;
    if(this.passwordToggleEye === "eye")
      this.passwordToggleEye = "eye-off";
    else
      this.passwordToggleEye="eye";
  }

  clear(){
    this.email = null
    this.password= null
    this.showPassword = false;
  }


  async handleBienvenida() {
    const alert = await this.alertCtrl.create({
      header: 'Bienvenido nuevamente',
      message: this.email,
      buttons: ['Continuar']
    });

    await alert.present();
  }

  async handleError() {
    const alert = await this.alertCtrl.create({
      header: 'ERROR!',
      message: 'Ingrese correo y contraseñas correctas',
      buttons: ['Continuar']
    });
    
    await alert.present();
  }


}
