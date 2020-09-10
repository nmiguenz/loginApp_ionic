import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  email: string = ""
  password: string= ""
  cpassword: string= ""
  showPassword = false;
  showCPassword = false;
  passwordToggleEye = "eye";
  passwordToggleEyeCpassWord = "eye";

  constructor(public afAuth: AngularFireAuth, private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  async register(){
    const {email, password, cpassword} = this
    if(password === cpassword){
      try{
        const result = await this.afAuth.createUserWithEmailAndPassword(email,password)
        if(result){
          this.handleBienvenida()
        }
      }catch(error){
        console.dir(error)
      }
    }
    else{
      this.handleErrorContrasenasDif()
      return console.error("Las contraseñas no coinciden")
    }

  }

  cambiarOjo(){
    this.showPassword =!this.showPassword;
    if(this.passwordToggleEye === "eye")
      this.passwordToggleEye = "eye-off";
    else
      this.passwordToggleEye="eye";
  }

  cambiarOjoSecreto(){
    this.showCPassword =!this.showCPassword;
    if(this.passwordToggleEyeCpassWord === "eye")
      this.passwordToggleEyeCpassWord = "eye-off";
    else
      this.passwordToggleEyeCpassWord="eye";
  }

  clear(){
    this.email = null
    this.password= null
    this.cpassword=null
    this.showPassword = false;
    this.showCPassword = false;
  }

  async handleBienvenida() {
    const alert = await this.alertCtrl.create({
      header: 'Bienvenido',
      message: "Gracias por darse de alta",
      buttons: ['Continuar']
    });

    await alert.present();
  }

  async handleErrorContrasenasDif() {
    const alert = await this.alertCtrl.create({
      header: 'ERROR!',
      message: 'Las contraseñas son distintas',
      buttons: ['Continuar']
    });
    
    await alert.present();
  }

}
