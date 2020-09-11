import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  async login(){
    const {email, password} = this
    try{
      const result = await this.afAuth.signInWithEmailAndPassword(email, password)
      if(result){
        this.handleBienvenida()
        this.router.navigate(['/bienvenido'])
      }
    }catch(error){
      console.dir(error)
      this.handleError(error.message)
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

  async handleError(cadena:string) {
    if(cadena === 'The email address is badly formatted.'){
      const alert = await this.alertCtrl.create({
        header: 'ERROR!',
        message: 'El correo electrónico no tiene el formato correcto',
        buttons: ['Continuar']
      });
      await alert.present();
    }
    else if(cadena === "The password is invalid or the user does not have a password."){
      const alert = await this.alertCtrl.create({
        header: 'ERROR!',
        message: 'La clave es erronea o no incluyó una',
        buttons: ['Continuar']
      });
      await alert.present();
    }
    else{
      const alert = await this.alertCtrl.create({
        header: 'ERROR!',
        message: 'No se encontró el usuario ingresado.',
        buttons: ['Continuar']
      });
      await alert.present();
    }
  }


}
