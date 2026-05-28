import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registerForm: FormGroup
  errores: string[] = []
  camposTocados: boolean = false
  formularioEnviado: boolean = false

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      message: [
        ''
      ]
    });
  }

  submitRegisterForm(){
    this.formularioEnviado = true

    console.log("Formulario enviado:", this.registerForm.getRawValue())

    this.registerForm.reset()
    this.registerForm.markAsUntouched()
    this.camposTocados = false
  }

  addError(error: string){
    if(!this.errores.includes(error)){
      this.errores.push(error)
    }
  }

  removeError(error: string){
    this.errores = this.errores.filter(e => e !== error)
  }

  getRegisterFormError(): boolean {
    const formFields = Object.entries(this.registerForm.controls)
    this.errores.length = 0

    for (const [_, formField] of formFields) {
      if(formField.hasError(ERRORS.REQUIRED.NAME)){
        this.addError('Este campo es obligatorio')
      }
      if(formField.hasError(ERRORS.MIN_LENGTH.NAME)){
        const requiredLength = formField.errors?.[ERRORS.MIN_LENGTH.NAME].requiredLength
        this.addError('Debe tener al menos ' + requiredLength + ' caracteres')
      }
      if(formField.hasError(ERRORS.EMAIL.NAME)){
        this.addError('Debe ser un correo electrónico válido')
      }

      if(formField?.touched){
        this.camposTocados = true
      }
    }

    if(!this.camposTocados){
      this.errores.length = 0
      return false
    }

    return true
  }

}

const ERRORS = {
  MIN_LENGTH: {
    NAME: 'minlength',
  },
  REQUIRED: {
    NAME: 'required'
  },
  EMAIL: {
    NAME: 'email'
  }
}
